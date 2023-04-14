from flask import Blueprint, flash, request, jsonify, Response, session, abort

from ..config.extensions import db, bcrypt, login_manager
from ..models.vehicle import Vehicle

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