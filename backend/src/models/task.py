from ..config.extensions import db


class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(3000), nullable=False)
    name = db.Column(db.String(300), nullable=False)
    rental_id = db.Column(db.Integer, db.ForeignKey('rental.rental_id'), nullable=False)
    task_status = db.Column(db.String(30), nullable=False)
    staff_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)

    rental = db.relationship('Rental', backref='tasks')
    user = db.relationship('User', backref='tasks')

    def get_id(self):
        return self.task_id

    def __init__(self, insurance_dict):
        self.description = insurance_dict['description']
        self.name = insurance_dict['name']
        self.rental_id = insurance_dict['rental_id']
        self.task_status = insurance_dict['task_status']
        self.staff_id = insurance_dict['staff_id']

    def serialize(self):
        return {
            'task_id': self.task_id,
            'description': self.description,
            'name': self.name,
            'rental_id': self.rental_id,
            'task_status': self.task_status,
            'staff_id': self.staff_id
        }