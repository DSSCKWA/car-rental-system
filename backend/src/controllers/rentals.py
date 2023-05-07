from flask import Blueprint, Response, abort, flash, jsonify, request, session
from flask_login import login_required, current_user

from ..config.extensions import bcrypt, db, login_manager
from ..models.rental import Rental
from ..models.user import User
from ..models.vehicle import Vehicle
from ..models.insurance import Insurance
import base64

rentals = Blueprint('rentals', __name__, url_prefix='/rentals')
rentals = Blueprint('rentals', __name__, url_prefix='/rentals')
response_class = Blueprint('response_class', __name__)

@rentals.route('/', methods=['GET'])
@login_required
def get_all():
    user_permissions = current_user.permissions
    if user_permissions in ["manager", "worker"]:
        rentals = Rental.query.join(User, Rental.client_id == User.user_id).join(Vehicle, Rental.vehicle_id == Vehicle.vehicle_id).outerjoin(Insurance, Rental.policy_number == Insurance.policy_number).all()
        return [rental.serialize() for rental in rentals]
    else:
        abort(403, description="Invalid permissions")

@rentals.route('/', methods=['POST'])
@login_required
def add():
    new_rental_body = request.json

    new_rental = Rental(new_rental_body)
    db.session.add(new_rental)
    db.session.commit()
    return new_rental.serialize()