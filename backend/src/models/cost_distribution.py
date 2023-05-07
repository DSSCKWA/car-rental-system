from ..config.extensions import db


class Cost_distribution(db.Model):
    cost_distribution_id = db.Column(db.Integer, primary_key=True)
    rental_id = db.Column(db.Integer,db.ForeignKey('rental.rental_id'),
                           nullable=False )
    vehicle_cost = db.Column(db.Float, nullable=False)
    item_cost = db.Column(db.Float, nullable=True)
    insurance_cost = db.Column(db.Float ,nullable=True)
    penalty_charges = db.Column(db.Float ,nullable=True)
    total = db.Column(db.Float ,nullable=False)

    rental = db.relationship('Rental', backref='costs')

    def get_id(self):
        return self.cost_distribution_id    

    def __init__(self, cost_dict):
        self.rental_id = cost_dict["rental_id"]
        self.vehicle_cost = cost_dict["vehicle_cost"]
        self.item_cost = cost_dict["item_cost"]
        self.insurance_cost = cost_dict["insurance_cost"]
        self.penalty_charges = cost_dict["penalty_charges"]
        self.total = self.calculate_total()

    def calculate_total(self):
        return outplayNull(self.vehicle_cost)+outplayNull(self.item_cost)+outplayNull(self.insurance_cost)+outplayNull(self.penalty_charges)
    
    def serialize(self):
        return {"cost_distribution_id": self.cost_distribution_id, "rental_id": self.rental_id, "vehicle_cost": self.vehicle_cost,"item_cost": self.item_cost,"insurance_cost": self.insurance_cost, "penalty_charges": self.penalty_charges, "total": self.total}
    
def outplayNull(theValueToOutplay):
    if(theValueToOutplay is None):
        theValueToOutplay=0
    return float(theValueToOutplay)
