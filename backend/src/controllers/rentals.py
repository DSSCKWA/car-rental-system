from flask import Blueprint, Response, abort, flash, jsonify, request, session

from ..config.extensions import bcrypt, db, login_manager
from ..models.rental import Rental
import base64

rentals = Blueprint('rentals', __name__, url_prefix='/rentals')
response_class = Blueprint('response_class', __name__)

@rentals.route('/', methods=['GET'])
def get_all():
    rentals = Rental.query.all()
    return [rental.serialize() for rental in rentals]

@rentals.route('/', methods=['POST'])
def add():
    new_rental_body = request.json

    new_rental = Rental(new_rental_body)
    db.session.add(new_rental)
    db.session.commit()
    return new_rental.serialize()