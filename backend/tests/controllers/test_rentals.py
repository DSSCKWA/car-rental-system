import base64
import unittest
from base64 import b64encode

from flask import json, abort
from flask_login import current_user

from backend.src import create_app
from backend.src.config.extensions import db
from backend.src.models.vehicle import Vehicle
from backend.src.models.rental import Rental
from backend.src.models.user import User
from backend.src.models.cost_distribution import Cost_distribution


class TestRentals(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config.update({"TESTING": True})
        with self.app.app_context():
            client_data = self.set_data('client@test.com', 'client')
            self.test_client = User(client_data)
            db.session.add(self.test_client)

            worker_data = self.set_data('worker@test.com', 'worker')
            self.test_worker = User(worker_data)
            db.session.add(self.test_worker)

            manager_data = self.set_data('manager@test.com', 'manager')
            self.test_manager = User(manager_data)
            db.session.add(self.test_manager)

            self.test_vehicle = self.create_test_vehicle()
            db.session.add(self.test_vehicle)

            self.test_rental = self.create_test_rental()
            db.session.add(self.test_rental)

            db.session.commit()
            db.session.refresh(self.test_vehicle)
            db.session.refresh(self.test_client)
            db.session.refresh(self.test_worker)
            db.session.refresh(self.test_manager)
            db.session.refresh(self.test_rental)

            self.test_cost_distribution = self.create_test_cost_distribution()
            db.session.add(self.test_cost_distribution)

            db.session.commit()
            db.session.refresh(self.test_cost_distribution)

    def tearDown(self):
        with self.app.app_context():
            db.session.delete(self.test_cost_distribution)
            db.session.delete(self.test_vehicle)
            db.session.delete(self.test_client)
            db.session.delete(self.test_worker)
            db.session.delete(self.test_manager)
            db.session.delete(self.test_rental)
            db.session.commit()

    def test_get_all(self):
        with self.app.test_client() as client:

            # not logged
            response = client.get('/rentals/', headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 401)

            # valid response - worker
            self.login_with_check(client, 'worker@test.com:spirol123')
            response = client.get('/rentals/', headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 200)

            # check response length
            self.assertTrue(len(response.data) > 0)

            # check response type
            rentals_data = response.get_json()
            self.assertEqual(type(rentals_data), list)
            correct_keys = ["vehicle_id", "start_time", "end_time", "discount_code_id", "client_id", "policy_number",
                            "name", "surname", "user_email_address", "phone_number", "registration_number", "brand",
                            "model", "policy_name", "rental_status", "total_cost"]
            for rental_data in rentals_data:
                self.assertEqual(type(rental_data), dict)
                for key in correct_keys:
                    self.assertTrue(key in rental_data)
            self.logout_with_check(client)

            # valid response - manager
            self.login_with_check(client, 'manager@test.com:spirol123')
            response = client.get('/rentals/', headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 200)
            self.logout_with_check(client)

            # valid response - client
            self.login_with_check(client, 'client@test.com:spirol123')
            response = client.get('/rentals/', headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 200)

            # check response
            rentals_data = response.get_json()
            self.assertEqual(type(rentals_data), list)
            correct_keys = ["vehicle_id", "start_time", "end_time", "discount_code_id", "client_id", "policy_number",
                            "name", "surname", "user_email_address", "phone_number", "registration_number", "brand",
                            "model", "policy_name", "rental_status", "total_cost"]
            for rental_data in rentals_data:
                self.assertEqual(type(rental_data), dict)
                for key in correct_keys:
                    self.assertTrue(key in rental_data)
                self.assertEqual(rental_data["client_id"], current_user.get_id())
                self.assertEqual(rental_data["name"], self.test_client.name)
                self.assertEqual(rental_data["surname"], self.test_client.surname)
                self.assertEqual(rental_data["user_email_address"], self.test_client.user_email_address)
                self.assertEqual(rental_data["phone_number"], self.test_client.phone_number)
            self.logout_with_check(client)

    def test_add(self):
        with self.app.test_client() as client:

            # not logged - add
            rental_data = self.create_test_rental_data()
            response = client.post('/rentals/', data=json.dumps(rental_data),
                                   headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 401)

            # invalid permissions - add
            self.login_with_check(client, 'client@test.com:spirol123')
            vehicle_data = self.create_test_vehicle_data("base64")
            response = client.post('/vehicles/', data=json.dumps(vehicle_data),
                                   headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 403)
            self.logout_with_check(client)

            # valid add
            self.login_with_check(client, 'worker@test.com:spirol123')
            rental_data = self.create_test_rental_data()
            response = client.post('/rentals/', data=json.dumps(rental_data),
                                   headers={'Content-Type': 'application/json'})
            id = response.json["rental_id"]
            self.assertEqual(response.status_code, 200)

            # revert add
            rental = Rental.query.get(id)
            if rental is None:
                abort(404, description="Rental not found")
            db.session.delete(rental)
            db.session.commit()

    def set_data(self, email, permissions):
        user_data = {
            'user_email_address': email,
            'name': 'John',
            'surname': 'Doe',
            'permissions': permissions,
            'password': '$2b$12$PilCu1V2lCMG7JsVvYFiquOEhG2GU2CBLLFkMdlbSM.E8azCUj/kS',
            'account_status': 'active',
            'phone_number': '123456789',
            'date_of_birth': '1990-01-01'
        }
        return user_data

    def create_test_vehicle(self):
        vehicle_data = self.create_test_vehicle_data("bytes")
        return Vehicle(vehicle_data)

    def create_test_vehicle_data(self, image_type):
        image = bytes(65)
        registration = 'T3ST7ULL'
        if image_type == "base64":
            image_base64 = base64.b64encode(image).decode('utf-8')
            image = image_base64
            registration = 'BAS37ULL'
        vehicle_data = {
            'brand': 'Opel',
            'model': 'Corsa',
            'year_of_production': '2022',
            'body_type': 'hatchback',
            'status': 'available',
            'number_of_seats': '5',
            'vehicle_class': 'A',
            'technical_review_date': '2024-01-01',
            'number_of_doors': '5',
            'image': image,
            'drive_type': 'RWD',
            'engine_power': '100',
            'engine_capacity': '1.6',
            'fuel_type': 'petrol',
            'tank_capacity': '40',
            'registration_number': registration,
            'additional_equipment': None,
            'description': 'Test vehicle',
            'color': 'red',
            'gearbox_type': 'manual',
        }
        return vehicle_data

    def create_test_rental(self):
        rental_data = self.create_test_rental_data()
        return Rental(rental_data)

    def create_test_rental_data(self):
        rental_data = {
            'vehicle_id': '1',
            'start_time': '2023-06-06',
            'end_time': '2023-07-07',
            'discount_code_id': '1',
            'client_id': '1',
            'policy_number': '1',
            'name': 'John',
            'surname': 'Doe',
            'user_email_address': 'joe@doe.com',
            'phone_number': '123456789',
            'registration_number': 'J03D03',
            'brand': 'Opel',
            'model': 'Corsa',
            'policy_name': None,
            'rental_status': 'upcoming',
            'total_cost': 0
        }
        return rental_data

    def login_with_check(self, client, credentials):
        response = client.post('/auth/login', headers={
            'Authorization': 'Basic ' + b64encode(credentials.encode("utf-8")).decode("ascii")})
        self.assertEqual(response.status_code, 200)

    def logout_with_check(self, client):
        response = client.post('/auth/logout')
        self.assertEqual(response.status_code, 200)

    def create_test_cost_distribution(self):
        cost_distribution_data = {
            'rental_id': self.test_rental.rental_id,
            'vehicle_cost': '10',
            'item_cost': '10',
            'insurance_cost': '10',
            'penalty_charges': '10',
            'total': '10'
        }
        return Cost_distribution(cost_distribution_data)


if __name__ == '__main__':
    unittest.main()
