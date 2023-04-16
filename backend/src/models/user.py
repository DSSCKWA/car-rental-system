from flask_login import UserMixin

from ..config.extensions import db


class User(db.Model, UserMixin):
    user_id = db.Column(db.Integer, primary_key=True)
    user_email_address = db.Column(db.String(255), nullable=False, unique=True)
    name = db.Column(db.String(30), nullable=True)
    surname = db.Column(db.String(100), nullable=True)
    permissions = db.Column(db.String(30), nullable=True)
    password = db.Column(db.String(255), nullable=False)
    account_status = db.Column(db.String(30), nullable=True)
    phone_number = db.Column(db.Integer, nullable=True)
    date_of_birth = db.Column(db.Date, nullable=True)

    def get_id(self):
        return self.user_id

    def __init__(self, user_dict):
        self.user_email_address = user_dict['user_email_address']
        self.name = user_dict['name']
        self.surname = user_dict['surname']
        self.permissions = user_dict['permissions']
        self.password = user_dict['password']
        self.account_status = user_dict['account_status']
        self.phone_number = user_dict['phone_number']
        self.date_of_birth = user_dict['date_of_birth']

    def serialize(self):
        return {
            'user_id': self.user_id,
            'user_email_address': self.user_email_address,
            'name': self.name,
            'surname': self.surname,
            'permissions': self.permissions,
            'account_status': self.account_status,
            'phone_number': self.phone_number,
            'date_of_birth': self.date_of_birth
        }
