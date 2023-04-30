from flask import Blueprint, flash, request, jsonify, Response, session, abort
from flask_login import login_required, current_user

from ..config.extensions import db, bcrypt, login_manager
from ..utils.validator import validate_password_change
from ..models.user import User

users = Blueprint('users', __name__, url_prefix='/users')
response_class = Blueprint('response_class', __name__)


@users.route('/', methods=['GET'])
@login_required
def get_all():
    user_permissions = current_user.permissions
    if user_permissions == "manager":
        users = User.query.all()
        return [user.serialize() for user in users]
    else:
        abort(403, description="Invalid permissions")


@users.route('/<int:id>', methods=['GET'])
@login_required
def get_by_id(id):
    user = User.query.get(id)
    if user is None:
        abort(404, description='User does not exist')
    return user.serialize()


@users.route('/change-password', methods=['PUT'])
@login_required
def change_password():
    user = User.query.get(int(session['_user_id']))
    if user is None:
        abort(404, description='User does not exist')

    body = request.json
    current_password, new_password, confirm_new_password = body[
        'currentPassword'], body['newPassword'], body['confirmNewPassword']
    validate_password_change(user, current_password, new_password,
                             confirm_new_password)

    user.password = bcrypt.generate_password_hash(new_password).decode("utf-8")
    db.session.commit()

    return user.serialize()
