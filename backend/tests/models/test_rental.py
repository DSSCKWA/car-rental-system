import unittest
from unittest.mock import MagicMock, patch
from backend.src.models.rental import Rental

patch('backend.src.models.rental.db', MagicMock()).start()


class RentalTestCase(unittest.TestCase):
    def setUp(self):
        self.rental_data = {
            'vehicle_id': '1',
            'start_time': '2023-06-06',
            'end_time': '2023-07-07',
            'discount_code_id': '1',
            'client_id': '1',
            'policy_number': '1',
            'rental_status': 'upcoming',
        }

        client = MagicMock()
        client.name = 'John'
        client.surname = 'Smith'
        client.user_email_address = 'rental@test.com'
        client.phone_number = '123456789'

        vehicle = MagicMock()
        vehicle.registration_number = 'T3ST'
        vehicle.brand = 'Opel'
        vehicle.model = 'Corsa'

        insurance = MagicMock()
        insurance.policy_name = "third_party_liability"
        insurance.policy_number = "1"

        self.test_rental = Rental(self.rental_data)

        setattr(self.test_rental, 'client', client)
        setattr(self.test_rental, 'vehicle', vehicle)
        setattr(self.test_rental, 'insurance', insurance)

    def test_new_rental(self):
        self.assertEqual(self.test_rental.vehicle_id, self.rental_data['vehicle_id'])
        self.assertEqual(str(self.test_rental.start_time), self.rental_data['start_time'])
        self.assertEqual(str(self.test_rental.end_time), self.rental_data['end_time'])
        self.assertEqual(self.test_rental.discount_code_id, self.rental_data['discount_code_id'])
        self.assertEqual(self.test_rental.client_id, self.rental_data['client_id'])
        self.assertEqual(self.test_rental.policy_number, self.rental_data['policy_number'])
        self.assertEqual(self.test_rental.rental_status, self.rental_data['rental_status'])
        self.assertEqual(self.test_rental.vehicle.registration_number, 'T3ST')
        self.assertEqual(self.test_rental.vehicle.brand, 'Opel')
        self.assertEqual(self.test_rental.vehicle.model, 'Corsa')
        self.assertEqual(self.test_rental.client.name, 'John')
        self.assertEqual(self.test_rental.client.surname, 'Smith')
        self.assertEqual(self.test_rental.client.user_email_address, 'rental@test.com')
        self.assertEqual(self.test_rental.client.phone_number, '123456789')
        self.assertEqual(self.test_rental.insurance.policy_name, 'third_party_liability')
        self.assertEqual(self.test_rental.insurance.policy_number, '1')

    def test_rental_serialize(self):
        expected_serialized_data = {
            'rental_id': None,
            'vehicle_id': '1',
            'start_time': '2023-06-06',
            'end_time': '2023-07-07',
            'discount_code_id': '1',
            'client_id': '1',
            'policy_number': '1',
            'name': 'John',
            'surname': 'Smith',
            'user_email_address': 'rental@test.com',
            'phone_number': '123456789',
            'registration_number': 'T3ST',
            'brand': 'Opel',
            'model': 'Corsa',
            'policy_name': 'third_party_liability',
            'rental_status': 'upcoming',
            'total_cost': 0
        }

        serialized_data = self.test_rental.serialize()
        self.assertEqual(serialized_data, expected_serialized_data)


if __name__ == '__main__':
    unittest.main()
