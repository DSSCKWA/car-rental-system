from flask import Blueprint, send_file
import os

files = Blueprint('files', __name__, url_prefix='/files')
response_class = Blueprint('response_class', __name__)
base_path = os.path.join('assets', 'static')
application_pdf = 'application/pdf'


@files.route('/terms-of-service', methods=['GET'])
def get_terms_of_service():
    path = os.path.join(base_path, 'terms_of_service.pdf')
    return send_file(path_or_file=path, mimetype=application_pdf)


@files.route('/privacy-policy', methods=['GET'])
def get_privacy_policy():
    path = os.path.join(base_path, 'privacy_policy.pdf')
    return send_file(path_or_file=path, mimetype=application_pdf)
