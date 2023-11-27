from main import app
from application.sec import datastore
from application.models import db,Role
from flask_security.utils import hash_password
from werkzeug.security import generate_password_hash,check_password_hash
with app.app_context():
    db.create_all()
    datastore.find_or_create_role(name='admin',description='User is an admin')
    datastore.find_or_create_role(name='manager',description='Manager is a manager')
    datastore.find_or_create_role(name='user',description='Uusser is an user')
#! The above lines create roles in the roles table
    db.session.commit()
    if not datastore.find_user(email='admin@grostore.com'):
        datastore.create_user(email='admin@grostore.com',password=generate_password_hash('admin'),roles=['admin'])
    if not datastore.find_user(email='manager1@grostore.com'):
        datastore.create_user(email='manager1@grostore.com',password=generate_password_hash('manager1'),roles=['manager'],active=False)
    if not datastore.find_user(email='user@grostore.com'):
        datastore.create_user(email='user@grostore.com',password=generate_password_hash('user'),roles=['user'])
    db.session.commit()
#! The above lines create users in the user table
