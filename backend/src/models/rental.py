from ..config.extensions import db


class Rental(db.Model):
    rental_id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.vehicle_id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    discount_code_id = db.Column(db.Integer, nullable=True)
    client_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    policy_number = db.Column(db.Integer, db.ForeignKey('insurance.policy_number'), nullable=True)

    client = db.relationship('User', backref='rentals')
    vehicle = db.relationship('Vehicle', backref='rentals')
    insurance = db.relationship('Insurance', backref='rentals')

    def get_id(self):
        return self.rental_id

    def __init__(self, rental_dict):
        self.rental_id = rental_dict['rental_id']
        self.vehicle_id = rental_dict['vehicle_id']
        self.start_time = rental_dict['start_time']
        self.end_time = rental_dict['end_time']
        self.discount_code_id = rental_dict['discount_code_id']
        self.client_id = rental_dict['client_id']
        self.policy_name = rental_dict['policy_name']

    def serialize(self):
        return {
            'rental_id': self.rental_id,
            'vehicle_id': self.vehicle_id,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'discount_code_id': self.discount_code_id,
            'client_id': self.client_id,
            'policy_number': self.policy_number,
            'name': self.client.name,
            'surname': self.client.surname,
            'user_email_address': self.client.user_email_address,
            'phone_number': self.client.phone_number,
            'registration_number': self.vehicle.registration_number,
            'brand': self.vehicle.brand,
            'model': self.vehicle.model,
            'policy_name': self.insurance.policy_name
        }

# ZMIANY W BAZIE W NAZWIACH KOLUMN TABELI INSURANCE!!!
