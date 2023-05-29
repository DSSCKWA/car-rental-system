import unittest

from backend.src.models.user import User


class UserTestCase(unittest.TestCase):
    def setUp(self):
        self.user_data = {
            'user_email_address': 'test@example.com',
            'name': 'John',
            'surname': 'Doe',
            'permissions': 'client',
            'password': 'password123',
            'account_status': 'active',
            'phone_number': '123456789',
            'date_of_birth': '1990-01-01'
        }
        self.new_user = User(self.user_data)

    def test_new_user(self):
        self.assertEqual(self.new_user.user_email_address, self.user_data['user_email_address'])
        self.assertEqual(self.new_user.name, self.user_data['name'])
        self.assertEqual(self.new_user.surname, self.user_data['surname'])
        self.assertEqual(self.new_user.permissions, self.user_data['permissions'])
        self.assertEqual(self.new_user.password, self.user_data['password'])
        self.assertEqual(self.new_user.account_status, self.user_data['account_status'])
        self.assertEqual(self.new_user.phone_number, self.user_data['phone_number'])
        self.assertEqual(str(self.new_user.date_of_birth), self.user_data['date_of_birth'])

    def test_user_serialize(self):
        expected_serialized_data = {
            'user_id': None,
            'user_email_address': 'test@example.com',
            'name': 'John',
            'surname': 'Doe',
            'permissions': 'client',
            'account_status': 'active',
            'phone_number': '123456789',
            'date_of_birth': '1990-01-01'
        }
        serialized_data = self.new_user.serialize()
        self.assertEqual(serialized_data, expected_serialized_data)


if __name__ == '__main__':
    unittest.main()
