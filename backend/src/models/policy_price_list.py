from ..config.extensions import db


class Policy_price_list(db.Model):
    policy_type = db.Column(db.String, primary_key=True)
    price = db.Column(db.Float(30), nullable=False)

    def get_id(self):
        return self.policy_type

    def __init__(self, cost_list_dict):
        self.policy_type = cost_list_dict["policy_type"]
        self.price = cost_list_dict["price"]

    def serialize(self):
        return {"policy_type": self.policy_type, "price": self.price}
