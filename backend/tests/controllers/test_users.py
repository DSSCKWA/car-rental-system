import unittest
from base64 import b64encode

from backend.src import create_app
from backend.src.config.extensions import db
from backend.src.models.user import User


class UsersBlueprintTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config.update(
            {
                "TESTING": True,
            }
        )

        with self.app.app_context():
            user_data = {
                'user_email_address': 'taa@ete.com',
                'name': 'John',
                'surname': 'Doe',
                'permissions': 'admin',
                'password': '$2b$12$PilCu1V2lCMG7JsVvYFiquOEhG2GU2CBLLFkMdlbSM.E8azCUj/kS',
                'account_status': 'active',
                'phone_number': '123456789',
                'date_of_birth': '1990-01-01'
            }
            self.new_user = User(user_data)

            db.session.add(self.new_user)
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.session.delete(self.new_user)
            db.session.commit()

    def test_get_all(self):
        with self.app.test_client() as client:
            responsee = client.post('/auth/login', headers={
                'Authorization': 'Basic ' + b64encode('taa@ete.com:spirol123'.encode("utf-8")).decode("ascii")})
            response = client.get('/users/', headers={'Content-Type': 'application/json'})

            self.assertEqual(responsee.status_code, 200)
            self.assertEqual(response.status_code, 200)

            res = client.post('/auth/logout')
            self.assertEqual(res.status_code, 200)

            # users_data = response.get_json()
            # self.assertIsInstance(users_data, list)
            # TO DO: Add assertions to verify the user data returned


if __name__ == '__main__':
    unittest.main()
