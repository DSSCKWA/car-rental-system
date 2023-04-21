from flask import Flask
from .config.config import Config
from .controllers.auth import auth
from .controllers.users import users
from .controllers.worker import worker
from .controllers.rentals import rental
from .controllers.vehicles import vehicles
from .controllers.files import files
from .config.extensions import bcrypt, db, login_manager, LoginManager


def handle_error(e):
    return {"code": e.code, "name": e.name, "description": e.description}, e.code


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)

    app.register_blueprint(auth)
    app.register_blueprint(users)
    app.register_blueprint(worker)
    app.register_blueprint(vehicles)
    app.register_blueprint(files)
    app.register_blueprint(rental)

    for code in [400, 401, 403, 404, 409, 500]:
        app.register_error_handler(code, handle_error)

    with app.app_context():
        db.create_all()

    return app
