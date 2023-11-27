
#! This file contains all the API's for the Product and Section model to GET and POST routes
from ast import arg
from flask_restful import Api,Resource,reqparse,marshal_with,fields,marshal
from .models import Product,db,Section
from flask_security.decorators import auth_required,roles_required
api = Api()

parser = reqparse.RequestParser()
parser.add_argument('name',type=str,help='Name should be a string and required')
parser.add_argument('description',type=str,help='Description should be a string and required')
parser.add_argument('section',type=str,help='Section should be a string and required')
parser.add_argument('quantity',type=int,help='Quantity should be a string and required')
parser.add_argument('amount',type=int,help='Amount should be a string and required')
parser.add_argument('active',type=bool,help='active should be a boolean value')

product_fields = {
    'id':fields.Integer,
    'name' : fields.String,
    'description' : fields.String,
    'section' : fields.String,
    'quantity': fields.Integer,
    'amount' : fields.Integer 
}
section_fields = {
    'id':fields.Integer,
    'name':fields.String,
    'description':fields.String,
    'active': fields.Boolean()
}

#* The below API GETS all the products in the database and allows only the manager to POST new data to the database
class ProductDescription(Resource):
    @auth_required('token')
    def get(self):
        products = Product.query.all()
        return marshal(products,product_fields)
    
    
    @auth_required('token')
    @roles_required('manager')
    def post(self):
        args = parser.parse_args()
        product = Product(name=args.get('name'),description=args.get('description'),section = args.get('section'),quantity = args.get('quantity'),amount = args.get('amount')) # type: ignore
        try:
            db.session.add(product)
        except:
            raise
        finally:
            db.session.commit()
            return {'message':'Data added successfully'}
        
#* This below API allows to GET all the sections in the database and only the manager can POST new sections
class SectionDescription(Resource):
    @auth_required('token')
    def get(self):
        sections = Section.query.all()
        return marshal(sections,section_fields)
    @auth_required('token')
    @roles_required('admin')
    def post(self):
        args = parser.parse_args()
        section = Section(name = args.get('name'), description = args.get('description'),active= args.get('active')) # type: ignore
        try:
            db.session.add(section)
        except:
            raise
        finally:
            db.session.commit()
            return {'message':"Section Created Successfully"}

api.add_resource(ProductDescription,'/product')
api.add_resource(SectionDescription,'/section')