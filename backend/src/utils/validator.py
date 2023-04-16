import datetime
import re

from flask import abort

from ..models.user import User


def is_valid_email(email):
    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    return re.fullmatch(regex, email)


def validate_registration_request_body(user_body):
    if email_taken(user_body["user_email_address"]):
        abort(409, description="Email already taken")
    if not is_valid_email(user_body["user_email_address"]):
        abort(400, description="Invalid email")
    if not is_valid_password(user_body["password"]):
        abort(400, description="Invalid password")
    if not is_valid_phone_number(user_body["phone_number"]):
        abort(400, description="Invalid phone number")
    if not is_valid_date(user_body["date_of_birth"]):
        abort(400, description="Invalid date")


def user_exists(user_id):
    user = User.query.filter_by(user_id=user_id).first()
    return not user is None


def email_taken(email):
    user = User.query.filter_by(user_email_address=email).first()
    return not user is None


def is_valid_date(date):
    current_date = datetime.datetime.now().date()
    date_string = current_date.strftime('%Y-%m-%d')
    current_date_formatted = datetime.datetime.strptime(date_string, '%Y-%m-%d').date()

    regex = re.compile(r'^\d{4}-\d{2}-\d{2}$')
    if regex.match(date):
        date_formatted = datetime.datetime.strptime(date, '%Y-%m-%d').date()
        if date_formatted < current_date_formatted:
            return True
    return False


def is_valid_phone_number(phone_number):
    regex = "^\\d+$"
    return len(phone_number) == 9 and re.match(regex, phone_number)


def is_valid_password(password):
    return not len(password) < 3
