import unittest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask.testing import FlaskClient

from backend.src.config.config import Config
from backend.src.models.user import User
from backend.src.controllers.users import users
from backend.src.config.extensions import db, bcrypt, login_manager


class UsersBlueprintTestCase(unittest.TestCase):
    def setUp(self):
        # Create a Flask app and configure it for testing
        self.app = Flask(__name__)
        self.app.config.from_object(Config)

        # Initialize database, bcrypt, and login_manager
        db.init_app(self.app)
        bcrypt.init_app(self.app)
        login_manager.init_app(self.app)

        # Register the users blueprint
        self.app.register_blueprint(users)

    def test_get_all_without_login(self):
        with self.app.test_client() as client:
            # Make a GET request to the 'get_all' route
            response = client.get('/users/', headers={'Content-Type': 'application/json'})

            # Verify the response
            self.assertEqual(response.status_code, 401)
            # users_data = response.get_json()
            # self.assertIsInstance(users_data, list)
            # TO DO: Add assertions to verify the user data returned


if __name__ == '__main__':
    unittest.main()