from flask import Blueprint, request, abort
from flask_login import login_required, current_user

from ..config.extensions import db, bcrypt
from ..models.user import User
from ..utils.validator import validate_registration_request_body, user_exists

worker = Blueprint('worker', __name__, url_prefix='/worker')


@worker.route('/', methods=['POST'])
@login_required
def add_employee():
    user_permissions = current_user.permissions
    print({"user_permissions": user_permissions})
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
def remove_employee(id):
    user_permissions = current_user.permissions
    if user_permissions == "manager":
        if not user_exists(id):
            abort(404, description="User not found")
        else:
            worker_to_delete = get_data_from_id(id)
            worker_to_delete.account_status = "deleted"
            db.session.commit()
            return worker_to_delete.serialize()
    else:
        abort(403, description="Invalid permissions")


def get_data_from_id(id):
    user = User.query.filter_by(user_id=id).first()
    return user
