from flask import Blueprint, Response, abort, flash, jsonify, request, session
from flask_login import login_required, current_user
import datetime
from sqlalchemy import and_, not_, or_
from ..config.extensions import bcrypt, db, login_manager
from ..models.rental import Rental
from ..models.vehicle_review import Vehicle_review
from ..models.cost_distribution import Cost_distribution
from ..models.price_list import Price_list
from ..models.user import User
from ..models.task import Task
from datetime import datetime
from ..models.vehicle import Vehicle
from ..models.insurance import Insurance
from ..models.feedback import Feedback


rentals = Blueprint('rentals', __name__, url_prefix='/rentals')
response_class = Blueprint('response_class', __name__)


def check_if_feedback_exist(rental):
    return Feedback.query.filter_by(rental_id=rental.rental_id).first() is not None


@rentals.route('/', methods=['GET'])
@login_required
def get_all():

    start_date = request.args.get('startDate', default=None, type=str)
    start_time = request.args.get('startTime', default=None, type=str)
    end_date = request.args.get('endDate', default=None, type=str)
    end_time = request.args.get('endTime', default=None, type=str)

    rentals = []
    start_datetime = None
    end_datetime = None
    if start_date and start_time and end_date and end_time:
        start_datetime = datetime.strptime(f"{start_date} {start_time}",
                                           "%Y-%m-%d %H:%M:%S")
        end_datetime = datetime.strptime(f"{end_date} {end_time}",
                                         "%Y-%m-%d %H:%M:%S")

    user_permissions = current_user.permissions

    if user_permissions in ["manager"]:
            if start_datetime and end_datetime:
                rentals_unavailable = Rental.query.join(
                    User, Rental.client_id == User.user_id).join(
                    Vehicle, Rental.vehicle_id == Vehicle.vehicle_id).join(
                        Cost_distribution,
                        Rental.rental_id == Cost_distribution.rental_id 
                    ).outerjoin(
                        Insurance,
                        Rental.policy_number == Insurance.policy_number 
                    ).where(
                    
                            or_(Rental.end_time <= start_datetime,
                                Rental.end_time >= end_datetime),
                        ).all()
                rentals = [
                    rental for rental in Rental.query.join(
                    User, Rental.client_id == User.user_id).join(
                    Vehicle, Rental.vehicle_id == Vehicle.vehicle_id).join(
                        Cost_distribution,
                        Rental.rental_id == Cost_distribution.rental_id 
                    ).outerjoin(
                            Insurance,
                            Rental.policy_number == Insurance.policy_number 
                    ).all()
                    if rental not in rentals_unavailable
                ]
            else:
                rentals = Rental.query.join(
                    User, Rental.client_id == User.user_id).join(
                        Vehicle, Rental.vehicle_id == Vehicle.vehicle_id).join(
                        Cost_distribution,
                        Rental.rental_id == Cost_distribution.rental_id 
                    ).outerjoin(
                            Insurance,
                            Rental.policy_number == Insurance.policy_number).all()
    else: 
        if user_permissions in ["worker"]:
            rentals = Rental.query.join(
            User, Rental.client_id == User.user_id).join(
            Vehicle, Rental.vehicle_id == Vehicle.vehicle_id).outerjoin(
            Insurance,
            Rental.policy_number == Insurance.policy_number).all()
        else:
            rentals = Rental.query.join(
            User, Rental.client_id == User.user_id).join(
                Vehicle, Rental.vehicle_id == Vehicle.vehicle_id).outerjoin(
                    Insurance,
                    Rental.policy_number == Insurance.policy_number).filter(
                        Rental.client_id == current_user.user_id).all()
            
    better_rental = []
    for rental in rentals:
        costs = Cost_distribution.query.where(rental.rental_id == Cost_distribution.rental_id).first()
        better_rental.append({**rental.serialize(costs.total), 'feedback_status': check_if_feedback_exist(rental)})

    return better_rental


@rentals.route('/', methods=['POST'])
@login_required
def add():
    new_rental_body = request.json
    new_rental = Rental(new_rental_body)
    db.session.add(new_rental)
    db.session.commit()
    return new_rental.serialize()


@rentals.route('/<int:id>/review', methods=['POST'])
@login_required
def review(id):
    user_permissions = current_user.permissions
    if user_permissions == "worker":

        new_review_body = request.json
        new_review = Vehicle_review(id, new_review_body)
        new_review.staff_id = current_user.user_id
        db.session.add(new_review)

        vehicle = Vehicle.query.join(
            Rental, Rental.vehicle_id == Vehicle.vehicle_id).filter(
            Rental.rental_id == id).first()

        price_list = Price_list.query.filter_by(
            vehicle_class=vehicle.vehicle_class).first()

        costs = Cost_distribution.query.filter_by(rental_id=id).first()
        costs.penalty_charges = calculate_penalties(new_review, price_list)
        costs.total = costs.calculate_total()

        task = Task.query.filter_by(rental_id=id,
                                    task_type='review_vehicle').first()
        task.task_status = "completed"

        rental = Rental.query.filter_by(rental_id=id).first()
        rental.rental_status = "completed"

        db.session.commit()

        # TODO: send invoice to client here

        return new_review.serialize()
    else:
        abort(403, description="Invalid permissions")


def get_task_by_rental_id(id):
    return Task.query.filter_by(rental_id=id).first()


@rentals.route('/<int:id>', methods=['PUT'])
@login_required
def update(id):
    user_permissions = current_user.permissions
    if user_permissions == "worker":
        rental = Rental.query.filter_by(rental_id=id).first()
        rental.rental_status = request.json["rental_status"]
        if rental.rental_status == 'in_review':
            new_task = Task({
                "task_name": "Pick up the vehicle and check status",
                "task_description":
                    "Recieve and check the vehicle for damages",
                "rental_id": rental.rental_id,
                "task_status": "to_do",
                "staff_id": None,
                "task_type": "review_vehicle",
            })
            db.session.add(new_task)
        elif rental.rental_status == "canceled":
            tasks = Task.query.filter_by(rental_id=id).all()
            for task in tasks:
                if task.task_status != "completed":
                    task.task_status = "canceled"
        db.session.commit()
    elif user_permissions == "client" and current_user.user_id == request.json["client_id"] and rental_belongs_to_client(current_user.user_id, id):
        if is_more_than_24_hours(request.json["start_time"]):
            rental = Rental.query.filter_by(rental_id=id).first()
            rental.rental_status = request.json["rental_status"]
            task = get_task_by_rental_id(rental.rental_id)
            task.task_status = "canceled"
            db.session.commit()
        else:
            abort(403, description="Cannot cancel the rental in less than 24 hours to the start date")
    else:
        abort(403, description="Invalid permissions")
    return rental.serialize()


def is_more_than_24_hours(start_time):
    current_time = datetime.datetime.utcnow()
    rental_time = datetime.datetime.strptime(start_time, "%d/%m/%Y, %H:%M")
    time_difference = rental_time - current_time
    return time_difference.total_seconds() > 24 * 60 * 60


def rental_belongs_to_client(client_id, id):
    rental = Rental.query.filter_by(rental_id=id).first()
    return rental.client_id == client_id


def calculate_penalties(review, price_list):
    penalties = 0
    if not review.exterior_cleanness:
        penalties += price_list.exterior_cleanness_penalty
    if not review.interior_cleanness:
        penalties += price_list.interior_cleanness_penalty
    if review.vehicle_body_condition:
        penalties += price_list.vehicle_body_condition_penalty
    if review.fuel_level == "depleted":
        penalties += price_list.fuel_level_minor_penalty
    if review.fuel_level == "empty":
        penalties += price_list.fuel_level_major_penalty
    if review.other_mechanical_damage == "minor":
        penalties += price_list.other_mechanical_damage_minor_penalty
    if review.other_mechanical_damage == "major":
        penalties += price_list.other_mechanical_damage_major_penalty
    return penalties
