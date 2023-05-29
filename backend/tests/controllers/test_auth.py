import unittest
from base64 import b64encode
from flask import json

from backend.src import create_app
from backend.src.config.extensions import db
from backend.src.models.user import User


class AuthBlueprintTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config.update({"TESTING": True})
        with self.app.app_context():
            user_data = self.set_data('user@test.com', 'client')
            self.test_user = User(user_data)
            db.session.add(self.test_user)
            db.session.commit()
            db.session.refresh(self.test_user)

    def tearDown(self):
        with self.app.app_context():
            db.session.delete(self.test_user)
            db.session.commit()

    def test_login(self):
        with self.app.test_client() as client:

            # incorrect login
            self.login_with_check(client, "user-that-does-not-exist@test.com:spirol123", 404)

            # incorrect password
            self.login_with_check(client, "user@test.com:invalid-password", 403)

            # valid login
            self.login_with_check(client, "user@test.com:spirol123")
            self.logout_with_check(client)

    def test_logout(self):
        with self.app.test_client() as client:

            # logout without login
            self.logout_with_check(client, 401)

            # valid login and logout
            self.login_with_check(client, "user@test.com:spirol123")
            self.logout_with_check(client)

    def test_me(self):
        with self.app.test_client() as client:
            self.login_with_check(client, "user@test.com:spirol123")
            response = client.get('/auth/me')

            self.assertEqual(response.status_code, 200)

            self.assertTrue(len(response.data) > 0)

            user_data = response.get_json()

            correct_keys = ["account_status", "date_of_birth", "name", "permissions", "phone_number", "surname",
                            "user_email_address", "user_id"]
            self.assertEqual(type(user_data), dict)
            for key in correct_keys:
                self.assertTrue(key in user_data)

            self.logout_with_check(client)

            response = client.get('/auth/me')
            self.assertEqual(response.status_code, 200)

            self.assertEqual(response.get_json(), {})

    def test_register(self):
        with self.app.test_client() as client:
            user_data = {
                "user_email_address": "register_test@gmail.com",
                "name": "John",
                "surname": "Doe",
                "password": "test",
                "phone_number": "123456789",
                "date_of_birth": "1990-01-01"
            }
            response = self.register_user(client, user_data)
            user_id = int(response.json["user_id"])
            self.assertEqual(response.status_code, 200)

            response_json = response.get_json()
            correct_keys = ["account_status", "date_of_birth", "name", "permissions", "phone_number", "surname",
                            "user_email_address", "user_id"]
            self.assertEqual(type(response_json), dict)
            for key in correct_keys:
                self.assertTrue(key in response_json)

            self.assertEqual(response_json["account_status"], "active")
            self.assertEqual(response_json["permissions"], "client")

            response = self.register_user(client, user_data)
            self.assertEqual(response.status_code, 409)

            with self.app.app_context():
                User.query.filter_by(user_id=user_id).delete()
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

    def login_with_check(self, client, credentials, code=200):
        response = client.post('/auth/login', headers={
            'Authorization': 'Basic ' + b64encode(credentials.encode("utf-8")).decode("ascii")})
        self.assertEqual(response.status_code, code)

    def logout_with_check(self, client, code=200):
        response = client.post('/auth/logout')
        self.assertEqual(response.status_code, code)

    def register_user(self, client, user_data):
        response = client.post('/auth/register', data=json.dumps(user_data),
                               headers={'Content-Type': 'application/json'})
        return response


if __name__ == '__main__':
    unittest.main()
