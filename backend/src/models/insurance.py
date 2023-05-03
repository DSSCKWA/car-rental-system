from ..config.extensions import db


class Insurance(db.Model):
    policy_number = db.Column(db.Integer, primary_key=True)
    policy_name = db.Column(db.String(50), nullable=False)
    policy_description = db.Column(db.String(3000), nullable=False)
    policy_type = db.Column(db.String(50), nullable=False)

    def get_id(self):
        return self.policy_number

    def __init__(self, insurance_dict):
        self.policy_number = insurance_dict['policy_number']
        self.policy_name = insurance_dict['policy_name']
        self.policy_description = insurance_dict['policy_description']
        self.policy_type = insurance_dict['policy_type']

    def serialize(self):
        return {
            'policy_number': self.policy_number,
            'policy_name': self.policy_name,
            'policy_description': self.policy_description,
            'policy_type': self.policy_type
        }