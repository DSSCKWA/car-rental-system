from flask import Blueprint, request, abort
from flask_login import login_required, current_user

from ..models.task import Task
from ..models.user import User
from ..config.extensions import db
from ..utils.validator import user_exists

task = Blueprint('task', __name__, url_prefix='/task')
response_class = Blueprint('response_class', __name__)


@task.route('/', methods=['GET'])
@login_required
def get_all():
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        tasks = db.session.query(Task).outerjoin(User, Task.staff_id == User.user_id).all()
        return [task.serialize() for task in tasks]
    else:
        abort(403, description="Invalid permissions")


@task.route('/<int:id>', methods=['PUT'])
@login_required
def change_task_status(id):
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        if not user_exists(id):
            abort(404, description="User not found")
        else:
            task = get_task_from_id(id)
            task.task_status = request.json["task_status"]
            db.session.commit()
            return task.serialize()
    else:
        abort(403, description="Invalid permissions")


def get_task_from_id(id):
    task = Task.query.filter_by(task_id=id).first()
    return task


def get_user_from_id(id):
    user = User.query.filter_by(user_id=id).first()
    return user


@task.route('/<int:task_id>/assign', methods=['PUT'])
@login_required
def assign_worker_to_task(task_id):
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        if not user_exists(current_user.user_id):
            abort(404, description="User not found")
        else:
            task = get_task_from_id(task_id)
            task.staff_id = current_user.user_id
            task.worker_name = current_user.name
            task.worker_surname = current_user.surname
            task.task_status = request.json["assign_status"]
            db.session.commit()
            return task.serialize()
    else:
        abort(403, description="Invalid permissions")
