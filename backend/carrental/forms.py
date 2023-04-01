from flask_login import current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, EmailField, TextAreaField, DateField
from wtforms.validators import InputRequired, Length, ValidationError
from .models import User


class UserForm(FlaskForm):
    user_id = StringField(validators=[
        InputRequired(), Length(min=2, max=100)], render_kw={"placeholder": "Id"})

    user_email_adress = EmailField(validators=[
        InputRequired(), Length(min=2, max=100)], render_kw={"placeholder": "Email"})

    name = StringField(validators=[
        InputRequired(), Length(min=2, max=100)], render_kw={"placeholder": "Name"})

    surname = StringField(validators=[
        InputRequired(), Length(min=2, max=100)], render_kw={"placeholder": "Surname"})

    permission = StringField(validators=[
        InputRequired(), Length(min=2, max=100)], render_kw={"placeholder": "Permission"})

    account_status = StringField(validators=[
        InputRequired(), Length(min=2, max=100)], render_kw={"placeholder": "Account Status"})

    phone_number = StringField(validators=[
        InputRequired(), Length(min=2, max=100)], render_kw={"placeholder": "Phone Number"})

    birth_date = DateField(validators=[
        InputRequired()], render_kw={"placeholder": "Birth date"})


class RegisterForm(UserForm):
    password = PasswordField(validators=[
        InputRequired(), Length(min=2, max=100)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Register')

    # def validate_username(self, username):
    #     existing_user_username = User.query.filter_by(
    #         username=username.data).first()
    #     if existing_user_username:
    #         raise ValidationError('That username already exists. Please choose a different one.')

    def validate_email(self, user_email_adress):
        existing_user_email = User.query.filter_by(
            user_email_adress=user_email_adress.data).first()
        if existing_user_email:
            raise ValidationError('That email already exists. Please choose a different one.')


class EditProfileForm(UserForm):
    submit = SubmitField('Submit changes')

    # def validate_username(self, username):
    #     existing_user = User.query.filter_by(
    #         username=username.data).first()
    #     if existing_user and existing_user.username != current_user.username:
    #         raise ValidationError('That username already exists. Please choose a different one.')

    def validate_email(self, user_email_adress):
        existing_user = User.query.filter_by(
            user_email_adress=user_email_adress.data).first()
        if existing_user and existing_user.email != current_user.email:
            raise ValidationError('That email already exists. Please choose a different one.')


class LoginForm(FlaskForm):
    user_email_adress = EmailField(validators=[
        InputRequired(), Length(min=2, max=100)], render_kw={"placeholder": "Email"})

    password = PasswordField(validators=[
        InputRequired(), Length(min=2, max=100)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Login')
