from flask import Blueprint, flash, request, jsonify, Response, session, abort

from .models import User

from .extensions import db, bcrypt, login_manager

users = Blueprint('users', __name__, url_prefix='/users')
response_class = Blueprint('response_class', __name__)


@users.route('/', methods=['GET'])
def get_all():
    all_users = User.query.all()
    return [user.serialize() for user in all_users]
