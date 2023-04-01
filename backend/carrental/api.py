from flask import Blueprint
from flask import request
from flask_login import current_user
from flask import Response

from .extensions import db
# from .models import Settings

api = Blueprint('api', __name__)


# @api.route('/settings/save', methods=['POST'])
# def save():
#     data = request.get_json()
#     settings = db.session.query(Settings).filter_by(id=current_user.id).first()
#     if data['zoom'] == 100 and data['speed'] == 100:
#         if settings is None:
#             return Response(status=200)
#         else:
#             db.session.delete(settings)
#             db.session.commit()
#             return Response(status=200)
#     if settings is None:
#         settings = Settings()
#         settings.id = current_user.id
#     settings.zoom = data['zoom']
#     settings.speed = data['speed']
#     db.session.merge(settings)
#     db.session.commit()
#     return Response(status=200)
