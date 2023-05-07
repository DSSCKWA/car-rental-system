from flask import Blueprint, abort
from flask_login import login_required, current_user

from ..models.rental import Rental
from ..models.user import User
from ..models.vehicle import Vehicle
from ..models.insurance import Insurance

rentals = Blueprint('rentals', __name__, url_prefix='/rentals')
response_class = Blueprint('response_class', __name__)


@rentals.route('/', methods=['GET'])
@login_required
def get_all():
    user_permissions = current_user.permissions
    if user_permissions in ["manager", "worker"]:
        rentals = Rental.query.join(User, Rental.client_id == User.user_id).join(Vehicle, Rental.vehicle_id == Vehicle.vehicle_id).join(Insurance, Rental.policy_number == Insurance.policy_number).all()
        return [rental.serialize() for rental in rentals]
    else:
        rentals = Rental.query.join(User, Rental.client_id == User.user_id).join(Vehicle,Rental.vehicle_id == Vehicle.vehicle_id).join(Insurance, Rental.policy_number == Insurance.policy_number).filter(Rental.client_id == current_user.user_id).all()
        return [rental.serialize() for rental in rentals]


# @rental.route('/<int:id>', methods=['GET'])
# @login_required
# def get_by_user_id(id):
#     user_id = current_user.user_id
#     if user_id == id:
#         rentals = Rental.query.join(User, Rental.client_id == User.user_id).join(Vehicle, Rental.vehicle_id == Vehicle.vehicle_id).join(Insurance, Rental.policy_number == Insurance.policy_number).filter(Rental.client_id == id).all()
#         return [rental.serialize() for rental in rentals]
#     else:
#         abort(401, description="Unauthorized")