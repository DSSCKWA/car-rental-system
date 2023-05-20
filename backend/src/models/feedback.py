from ..config.extensions import db

class Feedback(db.Model):
    feedback_id = db.Column(db.Integer, primary_key=True)
    vehicle_rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255), nullable=True)
    client_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    service_rating = db.Column(db.Integer, nullable=False)
    rental_id = db.Column(db.Integer, db.ForeignKey('rental.rental_id'), nullable=False)

    def get_id(self):
        return self.feedback_id

    def __init__(self, feedback_dict):
        self.vehicle_rating = feedback_dict['vehicle_rating']
        self.comment = feedback_dict['comment']
        self.client_id = feedback_dict['client_id']
        self.service_rating = feedback_dict['service_rating']
        self.rental_id = feedback_dict['rental_id']

    def serialize(self):
        return {
            'feedback_id': self.feedback_id,
            'vehicle_rating': self.vehicle_rating,
            'comment': self.comment,
            'client_id': self.client_id,
            'service_rating': self.service_rating,
            'rental_id': self.rental_id,
        }