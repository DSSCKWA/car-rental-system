import unittest

import pytest
from flask import Flask

from backend.src.config.config import Config
from backend.src.config.extensions import db, login_manager
from backend.src.controllers.auth import auth
from backend.src.utils.validator import *


class TestValidator(unittest.TestCase):
    def test_is_valid_email(self):
        self.assertIsNone(is_valid_email(''))
        self.assertIsNone(is_valid_email('111'))
        self.assertIsNone(is_valid_email('111@'))
        self.assertIsNone(is_valid_email('111@111'))
        self.assertIsNone(is_valid_email('111@111.'))
        self.assertIsNotNone(is_valid_email('a@a.pl'))
        self.assertIsNone(is_valid_email('```@a.pl'))
        self.assertIsNotNone(is_valid_email('a^a@a.pl'))
        self.assertIsNone(is_valid_email('__^a__@__.pl'))
        self.assertIsNone(is_valid_email('a@a..pl'))
        self.assertIsNotNone(is_valid_email('a@a@a.com'))
        self.assertIsNone(is_valid_email('a@.a.pl'))
        self.assertIsNotNone(is_valid_email('a.a.a.a@a.pl'))
        self.assertIsNone(is_valid_email('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@a.pl'))

    def set_up(self):
        self.app = Flask(__name__)
        self.app.config.from_object(Config)

        db.init_app(self.app)
        bcrypt.init_app(self.app)
        login_manager.init_app(self.app)

        self.app.register_blueprint(auth)

    def test_validate_registration_request_body(self):
        self.set_up()
        with self.app.test_client() as client:
            response = client.post('/auth/register', json={
                'user_email_address': 'a@a..pl',
                'password': 'a',
                'phone_number': '111111111',
                'date_of_birth': '2000-01-01'
            })
            self.assertEquals(response.status_code, 400)

        with self.app.test_client() as client:
            response = client.post('/auth/register', json={
                'user_email_address': 'test@abc.pl',
                'password': 'a',
                'phone_number': '111111111',
                'date_of_birth': '2000-01-01'
            })
            self.assertEquals(response.status_code, 400)

        with self.app.test_client() as client:
            response = client.post('/auth/register', json={
                'user_email_address': 'test@abc.pl',
                'password': '12345678',
                'phone_number': '11111111x',
                'date_of_birth': '2000-01-01'
            })
            self.assertEquals(response.status_code, 400)

        with self.app.test_client() as client:
            response = client.post('/auth/register', json={
                'user_email_address': 'test@abc.pl',
                'password': '12345678',
                'phone_number': '111111111',
                'date_of_birth': '2120-01-01'
            })
            self.assertEquals(response.status_code, 400)

    def test_is_valid_date(self):
        self.assertTrue(is_valid_date('2000-01-01'), 'Date is valid')
        self.assertFalse(is_valid_date('3000-01-01'), 'Date is too far in the future')
        self.assertFalse(is_valid_date('2000-1-01'), 'Date is invalid')
        self.assertFalse(is_valid_date('2000-01-1'), 'Date is invalid')
        self.assertFalse(is_valid_date('2000-01-01a'), 'Date is invalid')
        self.assertFalse(is_valid_date('2000-aa-01'), 'Date is invalid')

    def test_is_valid_phone_number(self):
        self.assertIsNone(is_valid_phone_number('111111111'), 'Phone number is valid')
        self.assertFalse(is_valid_phone_number('1111111111'), 'Phone number is too long')
        self.assertFalse(is_valid_phone_number('11111111'), 'Phone number is too short')
        self.assertFalse(is_valid_phone_number('11111111a'), 'Phone number cannot contain letters')
        self.assertFalse(is_valid_phone_number('1111111 1'), 'Phone number cannot contain spaces')

    def test_is_valid_password(self):
        self.assertTrue(is_valid_password('12345678'), 'Password is valid')
        self.assertTrue(is_valid_password('abc'), 'Password is valid')
        self.assertFalse(is_valid_password('12'), 'Password is too short')

    def test_is_valid_review_date(self):
        self.assertFalse(is_valid_review_date('2023-01-01'), 'Date is too far in the past')
        current_date = datetime.datetime.now().date()
        date_string = current_date.strftime('%Y-%m-%d')
        self.assertTrue(is_valid_review_date(date_string), 'Date is valid')
        future_date = current_date + datetime.timedelta(days=1)
        date_string = future_date.strftime('%Y-%m-%d')
        self.assertTrue(is_valid_review_date(date_string), 'Date is valid')


if __name__ == '__main__':
    pytest.main()
