from flask import Blueprint, flash, request, jsonify, Response, session, abort
from flask_login import login_required, logout_user, login_user
import re, datetime

from .extensions import db, bcrypt, login_manager
from .models import User
from .users import get_all

auth = Blueprint('auth', __name__)
response_class = Blueprint('response_class', __name__)


@auth.route('/login', methods=['POST'])
def login():
    user_credentials = request.authorization
    # print("uc: ", user_credentials)

    user = User.query.filter_by(user_email_adress=request.authorization.username).first()
    if user:
        if bcrypt.check_password_hash(user.password, request.authorization.password):
            login_user(user)
            return user.serialize()
        else:
            abort(403, description="Wrong password")
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
    print("new_user_body: ", new_user_body)
    validate_request_body(new_user_body)

    new_user_body["password"] = bcrypt.generate_password_hash(new_user_body["password"]).decode("utf-8")
    new_user = User(new_user_body)
    db.session.add(new_user)
    db.session.commit()
    # print("id: ", new_user.user_id)
    return new_user.serialize()


def validate_request_body(user_body):
    if (already_in_database(user_body["user_email_adress"])):
        abort(409, description="Email taken")
    if (not is_valid_email(user_body["user_email_adress"])):
        abort(400, description="Invalid email")
    if (not is_valid_password(user_body["password"])):
        abort(400, description="Invalid password")
    if (not is_valid_phone_number(user_body["phone_number"])):
        abort(400, description="Invalid phone number")
    if (not is_valid_date(user_body["birth_date"])):
        abort(400, description="Invalid date")


def already_in_database(email):
    users = get_all()
    for user in users:
        if email == user["user_email_adress"]:
            return True
    return False


def is_valid_date(date):
    current_date = datetime.datetime.now().date()
    date_string = current_date.strftime('%Y-%m-%d')
    current_date_formated = datetime.datetime.strptime(date_string, '%Y-%m-%d').date()

    regex = re.compile(r'^\d{4}-\d{2}-\d{2}$')
    if regex.match(date):
        date_formated = datetime.datetime.strptime(date, '%Y-%m-%d').date()
        if date_formated < current_date_formated:
            return True
    return False


def is_valid_phone_number(phone_number):
    regex = "^\\d+$"
    if len(phone_number) == 9 and re.match(regex, phone_number):
        return True
    return False


def is_valid_password(password):
    if len(password) < 8:
        return False
    return True


def is_valid_email(email):
    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    if re.fullmatch(regex, email):
        return True
    return False


@login_manager.user_loader
def load_user(user_id): # korzystamy z tego?
    # 404 jak nie znajdzie?
    return User.query.get(int(user_id))
