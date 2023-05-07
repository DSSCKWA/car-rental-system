from flask import Blueprint, request, abort

from ..config.extensions import db, bcrypt
from ..models.cost_distribution import Cost_distribution

costs = Blueprint('costs', __name__, url_prefix='/costs')
response_class = Blueprint('response_class', __name__)


@costs.route('/', methods=['GET'])
def get_all():
    costs = Cost_distribution.query.all()
    return [cost.serialize() for cost in costs]
    
@costs.route('/<int:id>', methods=['GET'])
def get_by_rental_id(id):
    cost = Cost_distribution.query.get(rental_id=id)
    if cost is None:
        abort(404, description='Cost does not exist')
    return cost.serialize()

@costs.route('/', methods=['POST'])
def add():
    new_costs_body = request.json
    new_cost= Cost_distribution(new_costs_body)
    db.session.add(new_cost)
    db.session.commit()
    return new_cost.serialize()