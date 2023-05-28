import unittest
from backend.src.models.vehicle import Vehicle


class VehicleTestCase(unittest.TestCase):
    def setUp(self):
        self.vehicle_data = {
            'brand': 'Opel',
            'model': 'Corsa',
            'year_of_production': 2022,
            'body_type': 'Hatchback',
            'status': 'available',
            'number_of_seats': 5,
            'vehicle_class': 'Economy',
            'technical_review_date': '2023-01-01',
            'number_of_doors': 5,
            'image': b'mock_image_data',
            'drive_type': 'Front-wheel drive',
            'engine_power': 100,
            'engine_capacity': 1.6,
            'fuel_type': 'Petrol',
            'tank_capacity': 40.0,
            'registration_number': 'T3ST',
            'additional_equipment': ['GPS', 'Bluetooth'],
            'description': 'Test vehicle',
            'color': 'Red',
            'gearbox_type': 'Manual',
        }

        self.test_vehicle = Vehicle(self.vehicle_data)

    def test_vehicle(self):
        self.assertEqual(self.test_vehicle.brand, self.vehicle_data['brand'])
        self.assertEqual(self.test_vehicle.model, self.vehicle_data['model'])
        self.assertEqual(self.test_vehicle.year_of_production, self.vehicle_data['year_of_production'])
        self.assertEqual(self.test_vehicle.body_type, self.vehicle_data['body_type'])
        self.assertEqual(self.test_vehicle.status, self.vehicle_data['status'])
        self.assertEqual(self.test_vehicle.number_of_seats, self.vehicle_data['number_of_seats'])
        self.assertEqual(self.test_vehicle.vehicle_class, self.vehicle_data['vehicle_class'])
        self.assertEqual(str(self.test_vehicle.technical_review_date), self.vehicle_data['technical_review_date'])
        self.assertEqual(self.test_vehicle.number_of_doors, self.vehicle_data['number_of_doors'])
        self.assertEqual(self.test_vehicle.image, self.vehicle_data['image'])
        self.assertEqual(self.test_vehicle.drive_type, self.vehicle_data['drive_type'])
        self.assertEqual(self.test_vehicle.engine_power, self.vehicle_data['engine_power'])
        self.assertEqual(self.test_vehicle.engine_capacity, self.vehicle_data['engine_capacity'])
        self.assertEqual(self.test_vehicle.fuel_type, self.vehicle_data['fuel_type'])
        self.assertEqual(self.test_vehicle.tank_capacity, self.vehicle_data['tank_capacity'])
        self.assertEqual(self.test_vehicle.registration_number, self.vehicle_data['registration_number'])
        self.assertEqual(self.test_vehicle.additional_equipment, self.vehicle_data['additional_equipment'])
        self.assertEqual(self.test_vehicle.description, self.vehicle_data['description'])
        self.assertEqual(self.test_vehicle.color, self.vehicle_data['color'])
        self.assertEqual(self.test_vehicle.gearbox_type, self.vehicle_data['gearbox_type'])

    def test_vehicle_serialize(self):
        expected_serialized_data = {
            'vehicle_id': None,
            'brand': 'Opel',
            'model': 'Corsa',
            'year_of_production': 2022,
            'body_type': 'Hatchback',
            'status': 'available',
            'number_of_seats': 5,
            'vehicle_class': 'Economy',
            'technical_review_date': '2023-01-01',
            'number_of_doors': 5,
            'image': 'bW9ja19pbWFnZV9kYXRh',  # base64 encoded 'mock_image_data'
            'drive_type': 'Front-wheel drive',
            'engine_power': 100,
            'engine_capacity': 1.6,
            'fuel_type': 'Petrol',
            'tank_capacity': 40.0,
            'registration_number': 'T3ST',
            'additional_equipment': ['GPS', 'Bluetooth'],
            'description': 'Test vehicle',
            'color': 'Red',
            'gearbox_type': 'Manual',
        }

        serialized_data = self.test_vehicle.serialize()
        self.assertEqual(serialized_data, expected_serialized_data)


if __name__ == '__main__':
    unittest.main()
