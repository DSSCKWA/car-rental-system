from flask import Blueprint, Response, abort, flash, jsonify, request, session
from sqlalchemy import and_, not_, or_
from datetime import datetime
from ..config.extensions import bcrypt, db, login_manager
from ..models.vehicle import Vehicle
from ..models.rental import Rental
from ..utils.validator import validate_addition_request_body
from ..utils.validator import validate_edition_request_body
import base64

vehicles = Blueprint('vehicles', __name__, url_prefix='/vehicles')
response_class = Blueprint('response_class', __name__)


@vehicles.route('/', methods=['GET'])
def get_all():
    start_date = request.args.get('startDate', default=None, type=str)
    start_time = request.args.get('startTime', default=None, type=str)
    end_date = request.args.get('endDate', default=None, type=str)
    end_time = request.args.get('endTime', default=None, type=str)

    vehicles = []
    start_datetime = None
    end_datetime = None
    if start_date and start_time and end_date and end_time:
        start_datetime = datetime.strptime(f"{start_date} {start_time}",
                                           "%Y-%m-%d %H:%M:%S")
        end_datetime = datetime.strptime(f"{end_date} {end_time}",
                                         "%Y-%m-%d %H:%M:%S")

    if start_datetime and end_datetime:
        vehicles_unavailable = Rental.query.join(
            Rental,
            Rental.vehicle_id == Rental.vehicle_id,
        ).where(
            not_(
                or_(
                    and_(Rental.start_time >= start_datetime,
                         Rental.start_time >= end_datetime),
                    and_(Rental.end_time <= start_datetime,
                         Rental.end_time <= end_datetime),
                ))).all()

        vehicles = [
            vehicle for vehicle in Rental.query.all()
            if vehicle not in vehicles_unavailable
        ]
    else:
        vehicles = Rental.query.all()

    return [vehicle.serialize() for vehicle in vehicles]


@vehicles.route('/<int:id>', methods=['GET'])
def get_by_id(id):
    vehicle = Rental.query.get(id)
    if vehicle is None:
        abort(404, description="Vehicle not found")
    return vehicle.serialize()


@vehicles.route('/', methods=['POST'])
def add():
    new_vehicle_body = request.json
    validate_addition_request_body(new_vehicle_body)

    new_vehicle_body["status"] = "available"
    new_vehicle_body["image"] = base64.b64decode(new_vehicle_body["image"])
    new_vehicle = Rental(new_vehicle_body)
    db.session.add(new_vehicle)
    db.session.commit()
    return new_vehicle.serialize()


@vehicles.route('/<int:id>', methods=['PUT'])
def edit(id):
    vehicle = Rental.query.get(id)
    if vehicle is None:
        abort(404, description="Vehicle not found")
    vehicle_body = request.json
    vehicle.status = vehicle_body["status"]
    vehicle.technical_review_date = vehicle_body["technical_review_date"]
    vehicle.image = base64.b64decode(vehicle_body["image"])
    vehicle.description = vehicle_body["description"]
    vehicle.additional_equipment = vehicle_body["additional_equipment"]
    old_reg=vehicle.registration_number
    vehicle.registration_number = vehicle_body["registration_number"]
    vehicle.color = vehicle_body["color"]

    validate_edition_request_body(vehicle_body,old_reg)
    db.session.commit()
    return vehicle.serialize()


@vehicles.route('/<int:id>', methods=['PATCH'])
def delete(id):
    vehicle = Rental.query.get(id)
    if vehicle is None:
        abort(404, description="Vehicle not found")
    vehicle_body = request.json
    vehicle.status = vehicle_body["status"]
    db.session.commit()
    return vehicle.serialize()