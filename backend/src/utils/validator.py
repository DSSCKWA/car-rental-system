import datetime
import re

from flask import abort

from ..models.user import User
from ..models.vehicle import Vehicle
from ..config.extensions import  bcrypt
import re, datetime

def is_valid_email(email):
    regex = re.compile(
        r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    return re.fullmatch(regex, email)


def validate_registration_request_body(user_body):
    if email_taken(user_body["user_email_address"]):
        abort(409, description="Email already taken")
    if (not is_valid_email(user_body["user_email_address"])):
        abort(400, description="Invalid email")
    if (not is_valid_password(user_body["password"])):
        abort(400, description="Password is too short")
    if (not is_valid_phone_number(user_body["phone_number"])):
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

def validate_password_change(user, currentPassword, new_password, confirm_new_password):
    if not bcrypt.check_password_hash(user.password, currentPassword):
        abort(400, description="Current password is not correct")
    if new_password == currentPassword:
        abort(400, description="New password is the same as currently set password")
    if new_password != confirm_new_password:
        abort(400, description="New passwords do not match")
    if not is_valid_password(new_password):
        abort(400, description="Password is too short")

def validate_addition_request_body(vehicle_body):
    if not is_valid_review_date(vehicle_body["technical_review_date"]):
        abort(400, description="Invalid date")
    if not (registration_number_avaliable(vehicle_body["registration_number"])):
        abort(409, description="Registration number taken")


def registration_number_avaliable(reg_number):
    vehicle = Vehicle.query.filter_by(registration_number=reg_number).first()
    return vehicle is None

def is_valid_review_date(date):
    current_date = datetime.datetime.now().date()
    date_string = current_date.strftime('%Y-%m-%d')
    current_date_formated = datetime.datetime.strptime(date_string, '%Y-%m-%d').date()

    regex = re.compile(r'^\d{4}-\d{2}-\d{2}$')
    if regex.match(date):
        date_formated = datetime.datetime.strptime(date, '%Y-%m-%d').date()
        if date_formated >= current_date_formated:
            return True
    return False



