from ..config.extensions import db


class Vehicle_review(db.Model):
    vehicle_review_id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, nullable=False)
    fuel_level = db.Column(db.String, nullable=False)
    vehicle_body_condition = db.Column(db.Boolean, nullable=False)
    other_mechanical_damage = db.Column(db.String, nullable=False)
    interior_cleanness = db.Column(db.Boolean, nullable=False)
    exterior_cleanness = db.Column(db.Boolean, nullable=False)
    rental_id = db.Column(db.Integer,
                          db.ForeignKey('rental.rental_id'),
                          nullable=False)
    rental = db.relationship('Rental', backref='vehicle_reivew')

    def get_id(self):
        return self.vehicle_review_id

    def __init__(self, rental_id, vehicle_review_dict):
        self.fuel_level = vehicle_review_dict['fuel_level']
        self.vehicle_body_condition = vehicle_review_dict[
            'vehicle_body_condition']
        self.other_mechanical_damage = vehicle_review_dict[
            'other_mechanical_damage']
        self.interior_cleanness = vehicle_review_dict['interior_cleanness']
        self.exterior_cleanness = vehicle_review_dict['exterior_cleanness']
        self.rental_id = rental_id

    def serialize(self):
        return {
            'vehicle_review_id': self.vehicle_review_id,
            'staff_id': self.staff_id,
            'fuel_level': self.fuel_level,
            'vehicle_body_condition': self.vehicle_body_condition,
            'other_mechanical_damage': self.other_mechanical_damage,
            'interior_cleanness': self.interior_cleanness,
            'exterior_cleanness': self.exterior_cleanness,
            'rental_id': self.rental_id,
        }