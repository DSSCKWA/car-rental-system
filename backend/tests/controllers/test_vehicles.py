import base64
import unittest
from base64 import b64encode

from flask import json, abort

from backend.src import create_app
from backend.src.config.extensions import db
from backend.src.models.vehicle import Vehicle
from backend.src.models.user import User


class VehiclesBlueprintTestCase(unittest.TestCase):
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

            self.test_vehicle = self.create_test_vehicle()
            db.session.add(self.test_vehicle)

            db.session.commit()
            db.session.refresh(self.test_vehicle)
            db.session.refresh(self.test_client)
            db.session.refresh(self.test_worker)

    def tearDown(self):
        with self.app.app_context():
            db.session.delete(self.test_vehicle)
            db.session.delete(self.test_client)
            db.session.delete(self.test_worker)
            db.session.commit()

    def test_get_all(self):
        with self.app.test_client() as client:
            # valid response
            response = client.get('/vehicles/', headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 200)

            # check response length
            self.assertTrue(len(response.data) > 0)

            # check response type
            vehicles_data = response.get_json()
            self.assertEqual(type(vehicles_data), list)
            correct_keys = ["brand", "model", "year_of_production", "body_type", "status", "number_of_seats",
                            "vehicle_class", "technical_review_date", "technical_review_date", "technical_review_date",
                            "number_of_doors", "image", "drive_type", "engine_power", "engine_capacity", "fuel_type",
                            "tank_capacity", "registration_number", "additional_equipment", "description", "color",
                            "gearbox_type"]
            for vehicle_data in vehicles_data:
                self.assertEqual(type(vehicle_data), dict)
                for key in correct_keys:
                    self.assertTrue(key in vehicle_data)

    def test_get_by_id(self):
        with self.app.test_client() as client:
            # valid response
            response = client.get(f'/vehicles/{self.test_vehicle.vehicle_id}',
                                  headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 200)

            # check response length
            self.assertTrue(len(response.data) > 0)

            # check response type
            vehicle_data = response.get_json()
            self.assertEqual(type(vehicle_data), dict)

            # vehicle does not exist
            response = client.get('/vehicles/999999999',
                                  headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 404)

    def test_add_delete(self):
        with self.app.test_client() as client:

            # not logged - add
            vehicle_data = self.create_test_vehicle_data("base64")
            response = client.post('/vehicles/', data=json.dumps(vehicle_data),
                                   headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 401)

            # not logged - delete
            vehicle_data = self.create_test_vehicle_data("base64")
            response = client.patch(f'/vehicles/{self.test_vehicle.vehicle_id}', data=json.dumps(vehicle_data),
                                    headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 401)

            self.login_with_check(client, 'client@test.com:spirol123')

            # invalid permissions - add
            vehicle_data = self.create_test_vehicle_data("base64")
            response = client.post('/vehicles/', data=json.dumps(vehicle_data),
                                   headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 403)

            # invalid permissions - delete
            vehicle_data = self.create_test_vehicle_data("base64")
            response = client.patch(f'/vehicles/{self.test_vehicle.vehicle_id}', data=json.dumps(vehicle_data),
                                    headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 403)

            self.logout_with_check(client)

            # valid add
            self.login_with_check(client, 'worker@test.com:spirol123')
            vehicle_data = self.create_test_vehicle_data("base64")
            response = client.post('/vehicles/', data=json.dumps(vehicle_data),
                                   headers={'Content-Type': 'application/json'})
            id = response.json["vehicle_id"]
            self.assertEqual(response.status_code, 200)

            # valid delete
            vehicle_data = self.create_test_vehicle_data("base64")
            response = client.patch(f'/vehicles/{id}', data=json.dumps(vehicle_data),
                                    headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 200)

            self.logout_with_check(client)

            # revert add
            vehicle = Vehicle.query.get(id)
            if vehicle is None:
                abort(404, description="Vehicle not found")
            db.session.delete(vehicle)
            db.session.commit()

    def test_edit(self):
        with self.app.test_client() as client:

            # valid edit
            self.login_with_check(client, 'worker@test.com:spirol123')
            vehicle_data = self.create_test_vehicle_data("base64")
            vehicle_data["fuel_type"] = 'diesel'
            response = client.put(f'/vehicles/{self.test_vehicle.vehicle_id}', data=json.dumps(vehicle_data),
                                  headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 200)
            self.logout_with_check(client)

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

    def login_with_check(self, client, credentials):
        response = client.post('/auth/login', headers={
            'Authorization': 'Basic ' + b64encode(credentials.encode("utf-8")).decode("ascii")})
        self.assertEqual(response.status_code, 200)

    def logout_with_check(self, client):
        response = client.post('/auth/logout')
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
