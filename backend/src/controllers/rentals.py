from flask import Blueprint
from flask_login import login_required

from ..models.rental import Rental

rental = Blueprint('rental', __name__, url_prefix='/rental')
response_class = Blueprint('response_class', __name__)


@rental.route('/', methods=['GET'])
@login_required
def get_all():
    rentals = Rental.query.all()
    return [rental.serialize() for rental in rentals]
