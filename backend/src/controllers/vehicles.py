import base64
from datetime import datetime

from flask import Blueprint, abort, jsonify, request, Response
from flask_login import login_required, current_user
from sqlalchemy import and_

from ..config.extensions import db
from ..models.vehicle import Vehicle
from ..models.rental import Rental
from ..utils.validator import validate_addition_request_body
from ..models.price_list import Price_list
from ..utils.validator import validate_edition_request_body

vehicles = Blueprint('vehicles', __name__, url_prefix='/vehicles')
response_class = Blueprint('response_class', __name__)


def get_available_vehicle_ids(start_time, end_time):
    if start_time != None and end_time != None:
        rentals_in_range = (
            Rental.query.with_entities(Rental.vehicle_id)
            .filter(
                and_(
                    Rental.start_time < end_time,
                    Rental.end_time > start_time
                )
            )
            .subquery()
        )
        return (
            Vehicle.query.join(Price_list, Vehicle.vehicle_class == Price_list.vehicle_class).filter(
                ~Vehicle.vehicle_id.in_(rentals_in_range))
            .with_entities(Vehicle, Price_list.price).all())
    else:
        return (
            Vehicle.query.join(Price_list, Vehicle.vehicle_class == Price_list.vehicle_class)
            .with_entities(Vehicle, Price_list.price).all())


@vehicles.route('/', methods=['GET'])
def get_all():
    start_time = request.args.get('start_time', type=str)
    end_time = request.args.get('end_time', type=str)

    if start_time and end_time:
        try:
            start_time = datetime.strptime(start_time, '%Y-%m-%dT%H:%M:%S')
            end_time = datetime.strptime(end_time, '%Y-%m-%dT%H:%M:%S')
        except ValueError:
            return jsonify({'error': 'Invalid datetime format. Use format: YYYY-MM-DDTHH:MM:SS'}), 400

    available_vehicles = get_available_vehicle_ids(start_time, end_time)
    return [
        {**vehicle.serialize(), 'price': price}
        for vehicle, price in available_vehicles
    ], 200


@vehicles.route('/<int:id>', methods=['GET'])
def get_by_id(id):
    vehicle = Vehicle.query.get(id)
    if vehicle is None:
        abort(404, description="Vehicle not found")
    return vehicle.serialize()


@vehicles.route('/', methods=['POST'])
@login_required
def add():
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        new_vehicle_body = request.json
        validate_addition_request_body(new_vehicle_body)

        new_vehicle_body["status"] = "available"
        new_vehicle_body["image"] = base64.b64decode(new_vehicle_body["image"])
        new_vehicle = Vehicle(new_vehicle_body)
        db.session.add(new_vehicle)
        db.session.commit()
        return new_vehicle.serialize()
    else:
        abort(403, description="Invalid permissions")


@vehicles.route('/<int:id>', methods=['PUT'])
@login_required
def edit(id):
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        vehicle = Vehicle.query.get(id)
        if vehicle is None:
            abort(404, description="Vehicle not found")
        vehicle_body = request.json
        vehicle.status = vehicle_body["status"]
        vehicle.technical_review_date = vehicle_body["technical_review_date"]
        vehicle.image = base64.b64decode(vehicle_body["image"])
        vehicle.description = vehicle_body["description"]
        vehicle.additional_equipment = vehicle_body["additional_equipment"]
        old_reg = vehicle.registration_number
        vehicle.registration_number = vehicle_body["registration_number"]
        vehicle.color = vehicle_body["color"]

        validate_edition_request_body(vehicle_body, old_reg)
        db.session.commit()
        return vehicle.serialize()
    else:
        abort(403, description="Invalid permissions")


@vehicles.route('/<int:id>', methods=['PATCH'])
@login_required
def delete(id):
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        vehicle = Vehicle.query.get(id)
        if vehicle is None:
            abort(404, description="Vehicle not found")
        vehicle_body = request.json
        vehicle.status = vehicle_body["status"]
        db.session.commit()
        return vehicle.serialize()
    else:
        abort(403, description="Invalid permissions")
