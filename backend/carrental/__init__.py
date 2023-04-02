from flask import Flask

from config import Config
from .api import api
from .auth import auth
from .extensions import bcrypt, db, login_manager
from .views import views


def bad_request(e):
    return {"code": e.code, "name": e.name, "description": e.description}, 400


def unauthorized(e):
    return {"code": e.code, "name": e.name, "description": e.description}, 401


def forbidden(e):
    return {"code": e.code, "name": e.name, "description": e.description}, 403


def page_not_found(e):
    return {"code": e.code, "name": e.name, "description": e.description}, 404


def conflict(e):
    return {"code": e.code, "name": e.name, "description": e.description}, 409


def internal_server_error(e):
    return {"code": e.code, "name": e.name, "description": e.description}, 500


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)

    app.register_blueprint(views)
    app.register_blueprint(auth)
    app.register_blueprint(api)

    app.register_error_handler(400, unauthorized)
    app.register_error_handler(401, page_not_found)
    app.register_error_handler(403, page_not_found)
    app.register_error_handler(404, page_not_found)
    app.register_error_handler(409, page_not_found)
    app.register_error_handler(500, internal_server_error)

    with app.app_context():
        db.create_all()

    return app
