from flask import Blueprint, abort
from flask_login import login_required, current_user

from ..models.task import Task

task = Blueprint('task', __name__, url_prefix='/task')
response_class = Blueprint('response_class', __name__)


@login_required
@task.route('/', methods=['GET'])
def get_all():
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        tasks = Task.query.all()
        return [task.serialize() for task in tasks]
    else:
        abort(403, description="Invalid permissions")

