from ..config.extensions import db


class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(3000), nullable=False)
    name = db.Column(db.String(300), nullable=False)
    rental_id = db.Column(db.Integer, nullable=False)
    task_status = db.Column(db.String(30), nullable=False)
    staff_id = db.Column(db.Integer, nullable=False)

    def get_id(self):
        return self.task_id

    def __init__(self, task_dict):
        self.task_id = task_dict['task_id']
        self.description = task_dict['description']
        self.name = task_dict['name']
        self.rental_id = task_dict['rental_id']
        self.task_status = task_dict['task_status']
        self.staff_id = task_dict['staff_id']

    def serialize(self):
        return {
            'task_id': self.task_id,
            'description': self.description,
            'name': self.name,
            'rental_id': self.rental_id,
            'task_status': self.task_status,
            'staff_id': self.staff_id,
        }
