from flask import Blueprint, request, abort
from flask_login import login_required, current_user

from ..config.extensions import db, bcrypt
from ..models.user import User
from ..utils.validator import validate_registration_request_body, user_exists

worker = Blueprint('worker', __name__, url_prefix='/worker')
response_class = Blueprint('response_class', __name__)


@worker.route('/', methods=['POST'])
@login_required
def add_worker():
    user_permissions = current_user.permissions
    if user_permissions == "manager":
        new_user_body = request.json
        validate_registration_request_body(new_user_body)
        new_user_body["password"] = bcrypt.generate_password_hash(new_user_body["password"]).decode("utf-8")
        new_user_body["permissions"] = "worker"
        new_user_body["account_status"] = "active"
        new_user = User(new_user_body)
        db.session.add(new_user)
        db.session.commit()
        return new_user.serialize()
    else:
        abort(403, description="Invalid permissions")


@worker.route('/<int:id>', methods=['PUT'])
@login_required
def change_worker_status(id):
    user_permissions = current_user.permissions
    if user_permissions == "manager":
        if not user_exists(id):
            abort(404, description="User not found")
        else:
            worker = get_data_from_id(id)
            worker.account_status = request.json["account_status"]
            db.session.commit()
            return worker.serialize()
    else:
        abort(403, description="Invalid permissions")


def get_data_from_id(id):
    user = User.query.filter_by(user_id=id).first()
    return user

@login_required
@worker.route('/', methods=['GET'])
def get_all():
    user_permissions = current_user.permissions
    if user_permissions == "manager":
        users = User.query.filter_by(permissions="worker")
        return [user.serialize() for user in users]
    else:
        abort(403, description="Invalid permissions")