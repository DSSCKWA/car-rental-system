from flask import Blueprint, Response, abort, flash, jsonify, request, session
from flask_login import login_required, current_user

from ..config.extensions import bcrypt, db, login_manager
from ..models.task import Task
from ..models.user import User
from ..models.vehicle import Vehicle
from ..models.insurance import Insurance
import base64

tasks = Blueprint('tasks', __name__, url_prefix='/tasks')
response_class = Blueprint('response_class', __name__)

@tasks.route('/', methods=['GET'])
@login_required
def get_all():
        tasks = Task.query.all()
        return [task.serialize() for task in tasks]

@tasks.route('/', methods=['POST'])
@login_required
def add():
    new_task_body = request.json

    new_task_body["task_status"] = "active"    
    new_task = Task(new_task_body)
    db.session.add(new_task)
    db.session.commit()
    return new_task.serialize()