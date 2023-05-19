from flask import Blueprint, request, Response, session, abort
from flask_login import login_required, logout_user, login_user

from ..config.extensions import db, bcrypt, login_manager
from ..models.user import User
from ..utils.validator import validate_registration_request_body
from ..utils.emails import send_registration_confirmation
import threading

auth = Blueprint('auth', __name__, url_prefix='/auth')
response_class = Blueprint('response_class', __name__)


@auth.route('/login', methods=['POST'])
def login():
    user_credentials = request.authorization

    user = User.query.filter_by(
        user_email_address=user_credentials.username).first()
    if user:
        if user.account_status == "deleted":
            abort(403, description="User has been deleted")
        if bcrypt.check_password_hash(user.password, user_credentials.password):
            login_user(user)
            return user.serialize()
        else:
            abort(403, description="Wrong email or password")
    else:
        abort(404, description="User does not exist")


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return Response(status=200)


@auth.route('/register', methods=['POST'])
def register():
    new_user_body = request.json
    validate_registration_request_body(new_user_body)

    new_user_body["password"] = bcrypt.generate_password_hash(
        new_user_body["password"]).decode("utf-8")
    new_user_body["permissions"] = "client"
    new_user_body["account_status"] = "active"
    new_user = User(new_user_body)
    db.session.add(new_user)
    db.session.commit()
    thread = threading.Thread(target=send_registration_confirmation, args=(
        new_user.user_email_address, new_user.name))
    thread.start()

    return new_user.serialize()


@auth.route('/me', methods=['GET'])
def me():
    if session:
        user = User.query.get(int(session['_user_id']))
        if not user:
            abort(404, description="User does not exist")
        return user.serialize()
    return {}


@login_manager.user_loader
def load_user(user_id):
    user = User.query.get(int(user_id))
    if not user:
        abort(404, description="User does not exist")
    return user
