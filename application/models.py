
#! This file conains all the database models that are required for the models


from flask_sqlalchemy import SQLAlchemy
from flask_security.core import UserMixin,RoleMixin

db = SQLAlchemy()
class User(db.Model,UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer,autoincrement = True, primary_key=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean()) #* Used for validating the manager by the admin
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)  #* Used to generate JWT token
    roles = db.relationship('Role',secondary='roles_users',backref=db.backref('users',lazy='dynamic'))

class RoleUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer,primary_key = True)
    user_id = db.Column('user_id',db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column('role_id',db.Integer,db.ForeignKey('role.id'))

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True,autoincrement= True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class Section(db.Model):
    __tablename__ = 'section'
    id = db.Column(db.Integer,primary_key = True, autoincrement=True)
    name = db.Column(db.String,unique = True, nullable = False)
    description = db.Column(db.String,nullable = False)
    active = db.Column(db.Boolean())
#! Add a active boolean flag here so that we can approve the section based on the admin approval

class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String, nullable = False,unique = True)
    description = db.Column(db.String, nullable=False)
    section = db.Column(db.String, db.ForeignKey('section.name'))
    quantity = db.Column(db.Integer,nullable = False)
    amount = db.Column(db.Integer,nullable = False)

     