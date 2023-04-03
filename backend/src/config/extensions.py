from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

# database extension
db = SQLAlchemy()

# bcrypt extension
bcrypt = Bcrypt()

# login manager extension
login_manager = LoginManager()
# login_manager.login_view = 'auth.login'
