import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = "7&Fa2sa23j"
    SQLALCHEMY_DATABASE_URI = 'postgresql://crs_user:CRS@localhost/car_rental_service'
    JSONIFY_PRETTYPRINT_REGULAR = True
    MAX_CONTENT_LENGTH = 1024 * 1024 * 100
