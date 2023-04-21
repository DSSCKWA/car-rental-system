from flask import Blueprint, Response, abort, flash, jsonify, request, session

from ..config.extensions import bcrypt, db, login_manager
from ..models.vehicle import Vehicle
from ..utils.validator import validate_addition_request_body
import base64

vehicles = Blueprint('vehicles', __name__, url_prefix='/vehicles')
response_class = Blueprint('response_class', __name__)


@vehicles.route('/', methods=['GET'])
def get_all():
    vehicles = Vehicle.query.all()
    return [vehicle.serialize() for vehicle in vehicles]


@vehicles.route('/<int:id>', methods=['GET'])
def get_by_id(id):
    vehicle = Vehicle.query.get(id)
    if vehicle is None:
        abort(404, description="Vehicle not found")
    return vehicle.serialize()


@vehicles.route('/', methods=['POST'])
def add():
    new_vehicle_body = request.json
    validate_addition_request_body(new_vehicle_body)

    new_vehicle_body["status"] = "available"
    new_vehicle_body["image"] = base64.b64decode(new_vehicle_body["image"])
    new_vehicle = Vehicle(new_vehicle_body)
    db.session.add(new_vehicle)
    db.session.commit()
    return new_vehicle.serialize()


@vehicles.route('/<int:id>', methods=['PUT'])
def edit(id):
    vehicle = Vehicle.query.get(id)
    if vehicle is None:
        abort(404, description="Vehicle not found")
    vehicle_body = request.json
    vehicle.status = vehicle_body["status"]
    vehicle.technical_review_date = vehicle_body["technical_review_date"]  # szukać (Łukasz)
    vehicle.image = base64.b64decode(vehicle_body["image"])
    vehicle.description = vehicle_body["description"]
    vehicle.additional_equipment = vehicle_body["additional_equipment"]
    vehicle.registration_number = vehicle_body["registration_number"]
    validate_addition_request_body(vehicle_body)

    db.session.commit()
    return vehicle.serialize()


@vehicles.route('/<int:id>', methods=['PATCH'])
def delete(id):
    vehicle = Vehicle.query.get(id)
    if vehicle is None:
        abort(404, description="Vehicle not found")
    vehicle_body = request.json
    vehicle.status = vehicle_body["status"]
    db.session.commit()
    return vehicle.serialize()
