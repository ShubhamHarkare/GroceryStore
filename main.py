from flask import Flask
from application.models import db, User,Role
from config import DevelopmentConfig
from application.resource import api
from flask_security.core import Security
from application.sec import datastore
from application.worker import celery_init_app
import flask_excel as excel 
import redis
def create_app():
    app = Flask(__name__)
    redis_db = redis.StrictRedis(host='localhost',port=6379,db=0)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app=app)
    api.init_app(app)
    excel.init_excel(app)
    app.security = Security(app,datastore=datastore) # type: ignore
    with app.app_context():
        import application.views
        db.create_all()




    return app
app = create_app()
celery_app = celery_init_app(app)

if __name__ == '__main__':
    app.run(debug=True)