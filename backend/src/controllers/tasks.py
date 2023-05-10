from flask import Blueprint, request, abort, Response, flash, jsonify
from flask_login import login_required, current_user

from ..config.extensions import bcrypt, db, login_manager
from ..models.task import Task
from ..models.rental import Rental
from ..models.user import User
from ..utils.validator import user_exists

tasks = Blueprint('task', __name__, url_prefix='/tasks')
response_class = Blueprint('response_class', __name__)


@tasks.route('/', methods=['GET'])
@login_required
def get_all():
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        tasks = db.session.query(Task).outerjoin(
            User, Task.staff_id == User.user_id).all()
        return [task.serialize() for task in tasks]
    else:
        abort(403, description="Invalid permissions")


@tasks.route('/<int:id>', methods=['PUT'])
@login_required
def change_task_status(id):
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        if not user_exists(current_user.user_id):
            abort(404, description="User not found")
        else:
            task = get_task_by_id(id)
            task.task_status = request.json["task_status"]
            db.session.commit()
            return task.serialize()
    else:
        abort(403, description="Invalid permissions")


def get_task_by_id(id):
    return Task.query.filter_by(task_id=id).first()


def get_user_by_id(id):
    return User.query.filter_by(user_id=id).first()


def get_rental_by_id(id):
    return Rental.query.filter_by(rental_id=id).first()


@tasks.route('/<int:task_id>/assign', methods=['PUT'])
@login_required
def assign_worker_to_task(task_id):
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        if not user_exists(current_user.user_id):
            abort(404, description="User not found")
        else:
            task = get_task_by_id(task_id)
            task.staff_id = current_user.user_id
            task.worker_name = current_user.name
            task.worker_surname = current_user.surname
            task.task_status = "active"
            rental = get_rental_by_id(task.rental_id)
            rental.rental_status = "ongoing"
            db.session.commit()
            return task.serialize()
    else:
        abort(403, description="Invalid permissions")


@tasks.route('/', methods=['POST'])
@login_required
def add():
    new_task_body = request.json
    new_task_body["task_status"] = "to_do"
    new_task = Task(new_task_body)
    db.session.add(new_task)
    db.session.commit()
    return new_task.serialize()
