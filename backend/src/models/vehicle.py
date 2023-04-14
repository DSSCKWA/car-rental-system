from ..config.extensions import db

import base64

class Vehicle(db.Model):
    vehicle_id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(30), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year_of_production = db.Column(db.Integer, nullable=False)
    body_type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(30), nullable=False)
    number_of_seats = db.Column(db.Integer, nullable=False)
    vehicle_class = db.Column(db.String(10), nullable=False)
    technical_review_date = db.Column(db.Date, nullable=False)
    number_of_doors = db.Column(db.Integer, nullable=False)
    image = db.Column(db.LargeBinary, nullable=False) # check bytea usage
    drive_type = db.Column(db.String(30), nullable=False) 
    engine_power = db.Column(db.Integer, nullable=False)
    engine_capacity = db.Column(db.Float, nullable=False)
    fuel_type = db.Column(db.String(10), nullable=False)
    tank_capacity = db.Column(db.Float, nullable=False)
    registration_number = db.Column(db.String(10), nullable=False)
    additional_equipment = db.Column(db.ARRAY(db.String), nullable=True)
    description = db.Column(db.String(3000), nullable=True)

    def get_id(self):
        return self.vehicle_id
    

    def __init__(self, vehicle_dict):
        self.brand = vehicle_dict['brand']
        self.model = vehicle_dict['model']
        self.year_of_production = vehicle_dict['year_of_production']
        self.body_type = vehicle_dict['body_type']
        self.status = vehicle_dict['status']
        self.number_of_seats = vehicle_dict['number_of_seats']
        self.vehicle_class = vehicle_dict['vehicle_class']
        self.technical_review_date = vehicle_dict['technical_review_date']
        self.number_of_doors = vehicle_dict['number_of_doors']
        self.image = vehicle_dict['image']
        self.drive_type = vehicle_dict['drive_type']
        self.engine_power = vehicle_dict['engine_power']
        self.engine_capacity = vehicle_dict['engine_capacity']
        self.fuel_type = vehicle_dict['fuel_type']
        self.tank_capacity = vehicle_dict['tank_capacity']
        self.registration_number = vehicle_dict['registration_number']
        self.additional_equipment = vehicle_dict['additional_equipment']
        self.description = vehicle_dict['description']

    def serialize(self):
        return {
            'vehicle_id': self.vehicle_id,
            'brand': self.brand,
            'model': self.model,
            'year_of_production': self.year_of_production,
            'body_type': self.body_type,
            'status': self.status,
            'number_of_seats': self.number_of_seats,
            'vehicle_class': self.vehicle_class,
            'technical_review_date': self.technical_review_date,
            'number_of_doors': self.number_of_doors,
            'image': str(base64.b64encode(self.image),"utf-8"),
            'drive_type': self.drive_type,
            'engine_power': self.engine_power,
            'engine_capacity': self.engine_capacity,
            'fuel_type': self.fuel_type,
            'tank_capacity': self.tank_capacity,
            'registration_number': self.registration_number,
            'additional_equipment': self.additional_equipment,
            'description': self.description
        }
