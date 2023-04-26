from flask import Blueprint, Response, abort, flash, jsonify, request, session

from ..config.extensions import bcrypt, db, login_manager
from ..models.vehicle import Rental
import base64

Rental = Blueprint('rentals', __name__, url_prefix='/rentals')
response_class = Blueprint('response_class', __name__)

@rentals.route('/', methods=['GET'])
def get_all():
    rentals = Rental.query.all()
    return [rental.serialize() for rental in rentals]