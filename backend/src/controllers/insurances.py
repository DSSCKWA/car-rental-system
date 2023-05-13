from flask import Blueprint, request, abort

from ..config.extensions import db, bcrypt
from ..models.insurance import Insurance

insurances = Blueprint('insurances', __name__, url_prefix='/insurances')
response_class = Blueprint('response_class', __name__)


@insurances.route('/', methods=['GET'])
def get_all():
    insurances = Insurance.query.all()
    return [insurance.serialize() for insurance in insurances]
    


@insurances.route('/<int:id>', methods=['GET'])
def get_by_id(id):
    insurance = Insurance.query.get(id)
    if insurance is None:
        abort(404, description='Insurance does not exist')
    return insurance.serialize()

@insurances.route('/<string:type>', methods=['GET'])
def get_by_type(type):
    insurances = Insurance.query.filter_by(policy_type=type).all()
    if insurances is None:
        abort(404, description='No insurance of this type')
    return [insurance.serialize() for insurance in insurances]