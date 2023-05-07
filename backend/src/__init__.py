from flask import Flask
from .config.config import Config
from .controllers.auth import auth
from .controllers.users import users
from .controllers.worker import worker
from .controllers.vehicles import vehicles
from .controllers.files import files
from .controllers.price_lists import price_lists
from .config.extensions import bcrypt, db, login_manager
from .controllers.rentals import rentals
from .controllers.insurances import insurances
from .controllers.costs import costs
from .controllers.tasks import tasks


def handle_error(e):
    return {
        "code": e.code,
        "name": e.name,
        "description": e.description
    }, e.code


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
    app.register_blueprint(price_lists)
    app.register_blueprint(rentals)
    app.register_blueprint(insurances)
    app.register_blueprint(costs)
    app.register_blueprint(tasks)

    for code in [400, 401, 403, 404, 409, 500]:
        app.register_error_handler(code, handle_error)

    with app.app_context():
        db.create_all()

    return app
