from flask import Blueprint, abort
from flask_login import login_required, current_user

from ..models.rental import Rental
from ..models.user import User
from ..models.vehicle import Vehicle
from ..models.insurance import Insurance

rental = Blueprint('rental', __name__, url_prefix='/rental')
response_class = Blueprint('response_class', __name__)


@rental.route('/', methods=['GET'])
@login_required
def get_all():
    user_permissions = current_user.permissions
    if user_permissions in ["manager", "worker"]:
        rentals = Rental.query.join(User, Rental.client_id == User.user_id).join(Vehicle, Rental.vehicle_id == Vehicle.vehicle_id).join(Insurance, Rental.policy_number == Insurance.policy_number).all()
        return [rental.serialize() for rental in rentals]
    else:
        abort(403, description="Invalid permissions")