from ..config.extensions import db


class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True)
    task_description = db.Column(db.String(3000), nullable=False)
    task_name = db.Column(db.String(300), nullable=False)
    rental_id = db.Column(db.Integer, nullable=False)
    task_status = db.Column(db.String(30), nullable=False)
    staff_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=True)

    worker = db.relationship('User', backref='tasks')

    def get_id(self):
        return self.task_id

    def __init__(self, task_dict):
        self.task_id = task_dict['task_id']
        self.task_description = task_dict['task_description']
        self.task_name = task_dict['task_name']
        self.rental_id = task_dict['rental_id']
        self.task_status = task_dict['task_status']
        self.staff_id = task_dict['staff_id']

    def serialize(self):
        worker_name = "Not"
        worker_surname = "assigned"
        if self.worker:
            worker_name = self.worker.name,
            worker_surname = self.worker.surname
        return {
            'task_id': self.task_id,
            'task_description': self.task_description,
            'task_name': self.task_name,
            'rental_id': self.rental_id,
            'task_status': self.task_status,
            'staff_id': self.staff_id,
            'worker_name': worker_name,
            'worker_surname': worker_surname
        }
