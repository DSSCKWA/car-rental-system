import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = "7&Fa2sa23j"
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost/database'
