from flask import Blueprint, request, abort

from ..config.extensions import db, bcrypt
from ..models.price_list import Price_list

price_lists = Blueprint('price-lists', __name__, url_prefix='/price-lists')
response_class = Blueprint('response_class', __name__)


@price_lists.route('/', methods=['GET'])
def get_all():
    vehicleClass = request.args.get('vehicleClass', default=None, type=str)
    price_lists = []
    if vehicleClass:
        price_lists = Price_list.query.where(
            Price_list.vehicle_class == vehicleClass)
    else:
        price_lists = Price_list.query.all()
    return [price_list.serialize() for price_list in price_lists]
