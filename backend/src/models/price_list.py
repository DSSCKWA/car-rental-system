from ..config.extensions import db


class Price_list(db.Model):
    vehicle_class = db.Column(db.String, primary_key=True)
    price = db.Column(db.Float(30), nullable=False)
    interior_cleanness_penalty = db.Column(db.Float(30), nullable=False)
    exterior_cleanness_penalty = db.Column(db.Float(30), nullable=False)
    fuel_level_minor_penalty = db.Column(db.Float(30), nullable=False)
    fuel_level_major_penalty = db.Column(db.Float(30), nullable=False)
    vehicle_body_condition_penalty = db.Column(db.Float(30), nullable=False)
    other_mechanical_damage_minor_penalty = db.Column(db.Float(30),
                                                      nullable=False)
    other_mechanical_damage_major_penalty = db.Column(db.Float(30),
                                                      nullable=False)

    def get_id(self):
        return self.vehicle_class

    def __init__(self, cost_list_dict):
        self.vehicle_class = cost_list_dict["vehicle_class"]
        self.price = cost_list_dict["price"]
        self.interior_cleanness_penalty = cost_list_dict[
            "interior_cleanness_penalty"]
        self.exterior_cleanness_penalty = cost_list_dict[
            "exterior_cleanness_penalty"]
        self.fuel_level_minor_penalty = cost_list_dict[
            "fuel_level_minor_penalty"]
        self.fuel_level_major_penalty = cost_list_dict[
            "fuel_level_major_penalty"]
        self.vehicle_body_condition_penalty = cost_list_dict[
            "vehicle_body_condition_penalty"]
        self.other_mechanical_damage_minor_penalty = cost_list_dict[
            "other_mechanical_damage_minor_penalty"]
        self.other_mechanical_damage_major_penalty = cost_list_dict[
            "other_mechanical_damage_major_penalty"]

    def serialize(self):
        return {
            "vehicle_class":
            self.vehicle_class,
            "price":
            self.price,
            "interior_cleanness_penalty":
            self.interior_cleanness_penalty,
            "exterior_cleanness_penalty":
            self.exterior_cleanness_penalty,
            "fuel_level_minor_penalty":
            self.fuel_level_minor_penalty,
            "fuel_level_major_penalty":
            self.fuel_level_major_penalty,
            "vehicle_body_condition_penalty":
            self.vehicle_body_condition_penalty,
            "other_mechanical_damage_minor_penalty":
            self.other_mechanical_damage_minor_penalty,
            "other_mechanical_damage_major_penalty":
            self.other_mechanical_damage_major_penalty,
        }
