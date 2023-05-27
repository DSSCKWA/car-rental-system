from flask import Blueprint, request, abort, Response, flash, jsonify
from flask_login import login_required, current_user
from ..config.extensions import db
from ..models.feedback import Feedback
from ..models.rental import Rental
from ..models.vehicle import Vehicle
from ..models.user import User

feedback = Blueprint('feedback', __name__, url_prefix='/feedback')
response_class = Blueprint('response_class', __name__)


@feedback.route('/', methods=['POST'])
@login_required
def add_feedback():
    user_permissions = current_user.permissions
    if user_permissions == "client":
        feedback_body = request.get_json()
        feedback_body['client_id'] = current_user.get_id()
        feedback = Feedback(feedback_body)
        db.session.add(feedback)
        db.session.commit()
        return feedback.serialize()
    else:
        abort(403, description="Invalid permissions")


@feedback.route('/<int:vehicle_id>', methods=['GET'])
def get_feedback(vehicle_id):
    feedback_list = Feedback.query \
        .join(Rental, Feedback.rental_id == Rental.rental_id) \
        .join(Vehicle, Rental.vehicle_id == Vehicle.vehicle_id) \
        .join(User, Feedback.client_id == User.user_id) \
        .add_columns(User.name, User.surname) \
        .filter(Vehicle.vehicle_id == vehicle_id).all()
    return jsonify(
        [{'comment': feedback.comment, 'vehicle_rating': feedback.vehicle_rating, 'service_rating': feedback.service_rating, 'name': name + " " + surname} for feedback, name, surname in feedback_list])
