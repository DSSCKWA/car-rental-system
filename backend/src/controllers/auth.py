from flask import Blueprint, flash, request, jsonify, Response, session, abort
from flask_login import login_required, logout_user, login_user

from ..config.extensions import db, bcrypt, login_manager
from ..models.user import User

auth = Blueprint('auth', __name__, url_prefix='/auth')
response_class = Blueprint('response_class', __name__)


@auth.route('/login', methods=['POST'])
def login():

    user_credentials = request.authorization
    # print("uc: ", user_credentials)

    user = User.query.filter_by(user_email_address=user_credentials.username).first()
    if user:
        if bcrypt.check_password_hash(user.password, user_credentials.password):
            login_user(user)
            return user.serialize()
        else:
            pass
            # flash('Incorrect password') #403 incorrect password (401 zle uprawnienia)
    else:
        pass
        # flash('User does not exist') ## 404 not found
    # return user.serialize()


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return Response(status=200)


@auth.route('/register', methods=['POST'])
def register():
        new_user_body = request.json

        # inny blad - 500
        # bad body - 400
        # user istnieje - 409

        new_user_body["password"] = bcrypt.generate_password_hash(new_user_body["password"]).decode("utf-8")
        new_user_body["permissions"] = "client"
        new_user_body["account_status"] = "active"
        new_user = User(new_user_body)
        db.session.add(new_user)
        db.session.commit()
        # print("id: ", new_user.user_id)
        return new_user.serialize()


@login_manager.user_loader
def load_user(user_id):
    #404 jak nie znajdzie
    return User.query.get(int(user_id))
