from flask import Blueprint, render_template, request, redirect, url_for, session, flash

views = Blueprint('views', __name__)

@views.route("/", methods=['GET', 'POST'])
def index():
    return render_template('index.html')
