from ..config.extensions import db


class Insurance(db.Model):
    policy_number = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(3000), nullable=False)
    policy_type = db.Column(db.String(30) ,nullable=False)

    def get_id(self):
        return self.insurance_number

    def __init__(self, insurance_dict):
        self.name = insurance_dict["name"]
        self.description = insurance_dict["description"]
        self.policy_type = insurance_dict["policy_type"]

    def serialize(self):
        return {"insurance_number": self.policy_number, "name": self.name,"description": self.description,"insurance_type": self.policy_type}