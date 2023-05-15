from flask import Blueprint, flash, request, jsonify, Response, session, abort
from flask_login import login_required, current_user

from ..config.extensions import db, bcrypt, login_manager
from ..utils.validator import validate_password_change
from ..utils.validator import validate_permissions_change
from ..utils.validator import validate_edit_user
from ..utils.validator import validate_admin_permissions
from ..models.user import User

users = Blueprint('users', __name__, url_prefix='/users')
response_class = Blueprint('response_class', __name__)


@users.route('/', methods=['GET'])
@login_required
def get_all():
    user_permissions = current_user.permissions
    if user_permissions in ['admin', 'manager']:
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


@users.route('/change-permissions/<int:id>', methods=['PUT'])
@login_required
def change_permissions(id):
    user = User.query.get(int(session['_user_id']))
    validate_admin_permissions(user)

    if id == int(session['_user_id']):
        abort(403, description='Permission denied')

    user = User.query.get(id)
    if user is None:
        abort(404, description='User does not exist')

    body = request.json

    if 'permissions' not in body:
        abort(400, description='Permissions not provided')

    validate_permissions_change(body['permissions'])

    user.permissions = body['permissions']
    db.session.commit()

    return user.serialize()


# endpoint for modifying user
@users.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    user = User.query.get(int(session['_user_id']))
    validate_admin_permissions(user)

    user = User.query.get(id)
    if user is None:
        abort(404, description='User does not exist')

    body = request.json

    validate_edit_user(body, user)

    user.user_email_address = body['user_email_address']
    user.name = body['name']
    user.surname = body['surname']
    user.phone_number = body['phone_number']
    user.date_of_birth = body['date_of_birth']
    db.session.commit()

    return user.serialize()