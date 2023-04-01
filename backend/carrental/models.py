from flask_login import UserMixin

from .extensions import db


class User(db.Model, UserMixin):
    user_id = db.Column(db.Integer, primary_key=True)
    user_email_adress = db.Column(db.String(255), nullable=False, unique=True)
    name = db.Column(db.String(30), nullable=True)
    surname = db.Column(db.String(100), nullable=True)
    permission = db.Column(db.String(30), nullable=True)
    password = db.Column(db.String(255), nullable=False)
    account_status = db.Column(db.String(30), nullable=True)
    phone_number = db.Column(db.Integer, nullable=True)
    birth_date = db.Column(db.Date, nullable=True)

    # username = db.Column(db.String(20), nullable=False, unique=True)
    # settings = db.relationship("Settings", uselist=False, back_populates="user")

    # def __init__(self, user_dict):
    #     self.user_id = user_dict['']
    #     self.user_email_adress = user_dict['']
    #     self.name = user_dict['']
    #     self.surname = user_dict['']
    #     self.permission = user_dict['']
    #     self.password = user_dict['']
    #     self.account_status = user_dict['']
    #     self.phone_number = user_dict['']
    #     self.birth_date = user_dict['']

    def serialize(self):
        return {
            'user_id': self.user_id,
            'user_email_adress': self.user_email_adress,
            'name': self.name,
            'surname': self.surname,
            'permission': self.permission,
            'password': self.password,
            'account_status': self.account_status,
            'phone_number': self.phone_number,
            'birth_date': self.birth_date
        }

    def deserialize(self, user_dict):
        User(user_dict)
        # return {
        #     self.user_id: user_dict['user_id'],
        #     'user_email_adress': self.user_email_adress,
        #     'name': self.name,
        #     'surname': self.surname,
        #     'permission': self.permission,
        #     'password': self.password,
        #     'account_status': self.account_status,
        #     'phone_number': self.phone_number,
        #     'birth_date': self.birth_date
        # }