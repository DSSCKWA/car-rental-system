from flask import Blueprint, flash, request, jsonify, Response, session, abort

from ..config.extensions import db, bcrypt, login_manager
from ..models.user import User

users = Blueprint('users', __name__, url_prefix='/users')
response_class = Blueprint('response_class', __name__)


@users.route('/', methods=['GET'])
def get_all():
    users = User.query.all()
    return [user.serialize() for user in users]
