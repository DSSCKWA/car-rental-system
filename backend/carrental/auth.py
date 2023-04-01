# from flask import Blueprint, render_template, request, redirect, url_for, session, flash
# import re
# import os
# import hashlib
import json

from flask import Blueprint, render_template, redirect, url_for, flash, request, jsonify, Response, stream_with_context
from flask_login import login_required, logout_user, login_user, current_user
from .extensions import db, bcrypt, login_manager
from .forms import LoginForm, RegisterForm, EditProfileForm
from .models import User

auth = Blueprint('auth', __name__)
response_class = Blueprint('response_class', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(user_email_adress=form.user_email_adress.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data):
                login_user(user)
                return redirect(url_for('views.index'))
            else:
                flash('Incorrect password')
        else:
            flash('User does not exist')
    return render_template('login.html', form=form)


@auth.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))


@auth.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()

    if request.method == 'POST':
        if form.validate_on_submit():
            hashed_password = bcrypt.generate_password_hash(form.password.data).decode("utf-8")
            new_user = User(user_id=form.user_id.data, user_email_adress=form.user_email_adress.data,
                            name=form.name.data, surname=form.surname.data, permission=form.permission.data,
                            password=hashed_password, account_status=form.account_status.data,
                            phone_number=form.phone_number.data, birth_date=form.birth_date.data)
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('auth.login'))
        else:
            flash('Username or email is not available')

    # return render_template('register.html', form=form)
    return jsonify({user_id : user_id})

# @login_manager.user_loader
# def get_user_by_id(user_id):

@auth.route('/summary/<int:user_id>')
def summary(user_id):

    if (load_user(user_id) == None):
        return jsonify(
            status_code=404,
            status_messagge="CHOPIE CO TY ROBISZ",
            data=""
        )

    return jsonify(
        status_code=200,
        status_messagge="OK",
        data={
            "User": load_user(user_id).serialize()
        }
    )


# @auth.route('/summary/<int:user_id>')
# def summary(user_id):
#     # # data = make_summary()
#     # response = auth.response_class(
#     #     response=json.dumps(load_user(user_id)),
#     #     status=200,
#     #     mimetype='application/json'
#     # )
#
#     response = {
#         "response":str((load_user(user_id))),
#         "status":200
#     }
#
#     # return Response(stream_with_context(generate()), response)
#     return jsonify(user_id=load_user(user_id))

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# @auth.route('/login', methods=['GET', 'POST'])
# def login():
#     # Check if "username" and "password" POST requests exist (user submitted form)
#     if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
#         # Create variables for easy access
#         username = request.form['username']
#         password = request.form['password']
#
#         password_hash = hashlib.sha256(password.encode('utf-8'))
#         password_hash_hex = password_hash.hexdigest()
#
#         if not re.match(r'^[A-Za-z0-9]+[A-Za-z0-9]$', username):
#             flash('Incorrect input data')
#
#         else:
#             # Check if account exists using MySQL
#             existing_users = db.select_from_users('uzytkownik', "\'" + username + "\'", "\'" + str(password_hash_hex) + "\'")
#
#             # If account exists in accounts table in out database
#             if existing_users != [] and username == existing_users[0][9] and str(password_hash_hex) == \
#                     existing_users[0][10]:
#
#                 # If account in inactive
#                 if existing_users[0][8] == "0":
#                     flash('This account was deleted!')
#                     return render_template('index.html')
#
#                 session['logged_in'] = True
#                 session['id'] = existing_users[0][0]
#                 session['name'] = existing_users[0][1]
#                 session['surname'] = existing_users[0][2]
#                 session['city'] = existing_users[0][3]
#                 session['zip_code'] = existing_users[0][4]
#                 session['street'] = existing_users[0][5]
#                 session['house_number'] = existing_users[0][6]
#                 session['flat_number'] = existing_users[0][7]
#                 session['account_status'] = existing_users[0][8]
#                 session['username'] = existing_users[0][9]
#                 session['password'] = existing_users[0][10]
#                 session['account_type'] = existing_users[0][11]
#                 # Redirect to home page
#                 flash('Logged in successfully!')
#                 return render_template('index.html')
#             else:
#                 # Account doesnt exist or username/password incorrect
#                 flash('Incorrect username or password!')
#     return render_template('login.html')
#
#
# @auth.route('/logout')
# def logout():
#     # Remove session data, this will log the user out
#     session.pop('logged_in', None)
#     session.pop('id', None)
#     session.pop('name', None)
#     session.pop('surname', None)
#     session.pop('city', None)
#     session.pop('zip_code', None)
#     session.pop('street', None)
#     session.pop('house_number', None)
#     session.pop('flat_number', None)
#     session.pop('account_status', None)
#     session.pop('username', None)
#     session.pop('password', None)
#     session.pop('account_type', None)
#     flash('Logged out...')
#     return render_template('index.html')
#
# @auth.route('/register', methods=['GET', 'POST'])
# def register():
#
#     # Check if "username", "password" and "email" POST requests exist (user submitted form)
#     if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'confirm_password' in request.form:
#
#         # Create variables for easy access
#         username = request.form['username']
#         password = request.form['password']
#         # email = request.form['email']
#         confirm_password = request.form['confirm_password']
#
#         password_hash = hashlib.sha256(password.encode('utf-8'))
#         password_hash_hex = password_hash.hexdigest()
#         print(password_hash_hex)
#
#         # Check if account exists using MySQL
#         existing_users = db.select_from_registration('uzytkownik')
#         print(existing_users)
#
#         # If account exists show error and validation checks
#         if username in existing_users:
#             flash('Account with this username already exists!')
#
#         elif not re.match(r'^[A-Za-z0-9]+[A-Za-z0-9]$', username):
#             flash('Username must contain only characters and numbers!')
#
#         elif password != confirm_password:
#             flash('Retyped password is not correct!')
#
#         elif not username or not password: # or not email:
#             flash('Please fill out the form!')
#
#         else:
#             db.insert_into_users('uzytkownik', "\'" + username + "\'",
#                                  "\'" + str(password_hash_hex) + "\'")
#
#             flash('You have successfully registered!')
#             return render_template('login.html')
#
#     elif request.method == 'POST':
#         # Form is empty... (no POST data)
#         flash("Please fill out the form")
#
#     # Show registration form with message (if any)
#     return render_template('register.html')
