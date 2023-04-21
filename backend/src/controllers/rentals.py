from flask import Blueprint, abort
from flask_login import login_required, current_user

from ..models.rental import Rental

rental = Blueprint('rental', __name__, url_prefix='/rental')
response_class = Blueprint('response_class', __name__)


@login_required
@rental.route('/', methods=['GET'])
def get_all():
    user_permissions = current_user.permissions
    if user_permissions == "manager" or user_permissions == "worker":
        rentals = Rental.query.all()
        return [rental.serialize() for rental in rentals]
    else:
        abort(403, description="Invalid permissions")
