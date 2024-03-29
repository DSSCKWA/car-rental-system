import unittest
from base64 import b64encode

from flask import json

from backend.src import create_app
from backend.src.config.extensions import db
from backend.src.models.user import User


class UsersBlueprintTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config.update({"TESTING": True})
        with self.app.app_context():
            client_data = self.set_data('client@test.com', 'client')
            self.test_client = User(client_data)
            worker_data = self.set_data('worker@test.com', 'worker')
            self.test_worker = User(worker_data)
            admin_data = self.set_data('admin@test.com', 'admin')
            self.test_admin = User(admin_data)
            manager_data = self.set_data('manager@test.com', 'manager')
            self.test_manager = User(manager_data)
            db.session.add(self.test_client)
            db.session.add(self.test_worker)
            db.session.add(self.test_admin)
            db.session.add(self.test_manager)
            db.session.commit()
            db.session.refresh(self.test_client)
            db.session.refresh(self.test_worker)
            db.session.refresh(self.test_admin)
            db.session.refresh(self.test_manager)

    def tearDown(self):
        with self.app.app_context():
            db.session.delete(self.test_client)
            db.session.delete(self.test_worker)
            db.session.delete(self.test_admin)
            db.session.delete(self.test_manager)
            db.session.commit()

    def test_get_all(self):
        with self.app.test_client() as client:
            self.login_with_check(client, 'admin@test.com:spirol123')

            # check permissions
            response = client.get('/users/', headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 200)

            # check response length
            self.assertTrue(len(response.data) > 0)

            # check response type
            users_data = response.get_json()
            self.assertEqual(type(users_data), list)
            correct_keys = ["account_status", "date_of_birth", "name", "permissions", "phone_number", "surname",
                            "user_email_address", "user_id"]
            for user_data in users_data:
                self.assertEqual(type(user_data), dict)
                for key in correct_keys:
                    self.assertTrue(key in user_data)

            self.logout_with_check(client)

    def test_get_all_invalid_permissions(self):
        with self.app.test_client() as client:
            # check permissions - not logged
            response = client.get('/users/', headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 401)

            # check permissions - client
            self.login_with_check(client, 'client@test.com:spirol123')
            response = client.get('/users/', headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 403)
            self.logout_with_check(client)

            # check permissions - worker
            self.login_with_check(client, 'worker@test.com:spirol123')
            response = client.get('/users/', headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 403)
            self.logout_with_check(client)

    def test_change_password(self):
        with self.app.test_client() as client:
            # check permissions - not logged
            response = client.put('/users/change-password', headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 401)

            self.login_with_check(client, 'client@test.com:spirol123')

            # valid change
            self.check_change_password(client, 'spirol123', '123', '123', 200)

            # same new password and old password
            self.check_change_password(client, 'spirol123', 'spirol123', 'spirol123', 400)

            # password too short
            self.check_change_password(client, 'spirol123', 'sp', 'sp', 400)

            # new password differ from confirm new password
            self.check_change_password(client, 'spirol123', '123', '321', 400)

            self.logout_with_check(client)

    def test_change_permissions(self):
        with self.app.test_client() as client:
            # check permissions - not logged
            response = client.put(f'/users/change-permissions/{self.test_client.user_id}',
                                  data=json.dumps({'permissions': 'manager'}),
                                  headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 401)

            self.login_with_check(client, 'admin@test.com:spirol123')

            # permissions not provided
            response = client.put(f'/users/change-permissions/{self.test_client.user_id}',
                                  data=json.dumps({}),
                                  headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 400)

            # user does not exist
            response = client.put('/users/change-permissions/999999999',
                                  data=json.dumps({'permissions': 'manager'}),
                                  headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 404)

            # invalid path
            response = client.put('/users/change-permissions/abc',
                                  data=json.dumps({'permissions': 'manager'}),
                                  headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 404)

            # invalid permissions provided
            response = client.put(f'/users/change-permissions/{self.test_client.user_id}',
                                  data=json.dumps({'permissions': 'employee'}),
                                  headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 400)

            # valid change
            user_permissions = self.test_client.permissions
            response = client.put(f'/users/change-permissions/{self.test_client.user_id}',
                                  data=json.dumps({'permissions': 'manager'}),
                                  headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 200)

            # revert change
            response = client.put(f'/users/change-permissions/{self.test_client.user_id}',
                                  data=json.dumps({'permissions': user_permissions}),
                                  headers={'Content-Type': 'application/json'})
            self.assertEqual(response.status_code, 200)

    def check_change_password(self, client, currentPassword, newPassword, confirmNewPassword, code):
        req_body = {
            'currentPassword': currentPassword,
            'newPassword': newPassword,
            'confirmNewPassword': confirmNewPassword
        }
        response = client.put('/users/change-password', data=json.dumps(req_body),
                              headers={'Content-Type': 'application/json'})
        self.assertEqual(response.status_code, code)

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
