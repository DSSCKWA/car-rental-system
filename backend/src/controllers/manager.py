from flask import Blueprint, request, abort
from flask_login import login_required, current_user

from ..config.extensions import db, bcrypt
from ..models.user import User
from ..utils.validator import validate_registration_request_body, user_exists

manager = Blueprint('manager', __name__, url_prefix='/manager')


@manager.route('/add_worker', methods=['POST'])
@login_required
def add_employee():
    user_permissions = current_user.permissions  # sprawdzac account_status?
    print({"user_permissions": user_permissions})
    if user_permissions == "manager":  # admin tez?
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
        abort(401, description="Invalid permissions")


@manager.route('/remove_worker', methods=['DELETE'])
@login_required
def remove_employee():
    user_permissions = current_user.permissions  # sprawdzac account_status?
    print({"user_permissions": user_permissions})
    if user_permissions == "manager":  # admin tez?
        worker_email = request.json["user_email_address"]
        print("worker_email: ", worker_email)
        # walidacja poprawnego requesta tu i w innych miejscach?
        if not user_exists(worker_email):
            abort(404, description="User not found")
        else:
            worker_to_delete = get_data_from_email(worker_email)
            db.session.delete(worker_to_delete)
            db.session.commit()
        return {"jest w": "pyte"}
    else:
        abort(401, description="Invalid permissions")


def get_data_from_email(email):
    user = User.query.filter_by(user_email_address=email).first()
    return user
