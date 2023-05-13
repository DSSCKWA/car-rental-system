from ..config.extensions import db


class Task(db.Model):
    task_id = db.Column(db.Integer, primary_key=True)
    task_description = db.Column(db.String(3000), nullable=False)
    task_name = db.Column(db.String(300), nullable=False)
    rental_id = db.Column(db.Integer,
                          db.ForeignKey('rental.rental_id'),
                          nullable=False)
    task_status = db.Column(db.String(30), nullable=False)
    staff_id = db.Column(db.Integer,
                         db.ForeignKey('user.user_id'),
                         nullable=True)
    task_type = db.Column(db.String(30), nullable=False)

    rental = db.relationship('Rental', backref='tasks')
    worker = db.relationship('User', backref='tasks')

    def get_id(self):
        return self.task_id

    def __init__(self, task_dict):
        self.task_description = task_dict['task_description']
        self.task_name = task_dict['task_name']
        self.rental_id = task_dict['rental_id']
        self.task_status = task_dict['task_status']
        self.staff_id = task_dict['staff_id']
        self.task_type = task_dict['task_type']

    def serialize(self):
        dict = {
            'task_id': self.task_id,
            'task_description': self.task_description,
            'task_name': self.task_name,
            'task_type': self.task_type,
            'rental_id': self.rental_id,
            'task_status': self.task_status,
            'staff_id': self.staff_id,
        }
        if self.worker is not None:
            dict['worker_name'] = self.worker.name
            dict['worker_surname'] = self.worker.surname
        return dict
