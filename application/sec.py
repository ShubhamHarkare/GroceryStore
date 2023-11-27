
#! This file contains all the security related code which will help in getting the users based on roles
from flask_security.datastore import SQLAlchemyUserDatastore
from application.models import db,User,Role


datastore = SQLAlchemyUserDatastore(db,User,Role) # type: ignore
