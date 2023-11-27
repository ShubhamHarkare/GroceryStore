
#! Contains all the routes in the flask application
from flask import current_app as app,jsonify,request,render_template,send_file
from flask_restful import marshal,fields
from flask_security.decorators import auth_required,roles_required
from application.models import Section, User,db,Product
from application.sec import datastore
from werkzeug.security import check_password_hash,generate_password_hash
import flask_excel as excel
from application.tasks import create_resource_csv
from celery.result import AsyncResult
#* Main template renders the index.html on which our vue application is based on
@app.get('/')
def home():
    return render_template('index.html')

#* APi to check if the auth_required and roles_requied works or not for the admin
@app.get('/admin')
@auth_required('token')
@roles_required('admin')
def admin():
    return "Welcome admin"

#* API route to register new managers into the database
@app.post("/manager-register")
def manager_register():
    data = request.get_json()
    try:
        if not datastore.find_user(email = data['email']):
            datastore.create_user(email = data['email'],password = generate_password_hash(data['password']),roles = ['manager'],active = False)
        else:
            return jsonify({"message":"Manager already exists"}),403
    except:
        raise
    finally: 
        db.session.commit()
        return jsonify({"message":"Manager Added Successfully"}),200


# TODO: API route which by which the manager approves the mangers onto the database
@app.get('/activate/manager/<int:manager_id>')
@auth_required('token')
@roles_required('admin')
def activate(manager_id):
    try:
        manager = User.query.get(manager_id)
        if not manager or 'manager' not in manager.roles:
            return jsonify({'message':"Manager not found"}), 404
        
        manager.active = True
    except:
        raise
    finally:
        db.session.commit()
        return jsonify({'message':"Manager successfully activated"}), 200


#* API route for users, managers and admins to login
@app.post('/user-login')
def user_login():
    data = request.get_json()
    email = data['email']
    if not email:
        return jsonify({'message':'Email not provided'}), 400
    
    user = datastore.find_user(email = email)
    
    if not user:
        return jsonify({'message':"User not found"}), 404
    
    if check_password_hash(user.password,data['password']): # type: ignore
        return jsonify({'token':user.get_auth_token(),'email':user.email,'role': user.roles[0].name})
    else:
        return jsonify({'message':"Incorrect Password"}), 400
    
user_fields = { #* This helps to get data in JSON format from the database
    'id':fields.Integer,
    'email':fields.String,
    'active':fields.Boolean
}
product_fields = {
    'id':fields.Integer,
    'name' : fields.String,
    'description' : fields.String,
    'section' : fields.String,
    'quantity': fields.Integer,
    'amount' : fields.Integer 
}



#* API route which returns all the users in the database    
@app.get('/users')
@auth_required('token')
@roles_required('admin')
def all_users():
    users = User.query.all()
    if len(users) == 0:
        return jsonify({'message':"No users found"}), 404
    return marshal(users,user_fields)

#! API to create a new section by the manager
@app.post('/create-section-manager')
@auth_required('token')
@roles_required('manager')
def create_section_manager():
    data = request.get_json()
    try:
        section = Section(name= data['name'],description= data['description'],active = data['active']) #type: ignore
        db.session.add(section)

    except:
        raise
    finally:
        db.session.commit()
        return jsonify({'message':"Section Created successfully"})



@app.get('/activate/section/<int:sectionID>')
@auth_required('token')
@roles_required('admin')
def activate_section(sectionID):
    try:
        section = Section.query.get(sectionID)
        if not section:
            return jsonify({'message':"Section not found"}),404
        section.active = True
    except:
        raise
    finally:
        db.session.commit()
        return jsonify({'message':"Section approved"}),200



# TODO: API route which helps in updating the sections by the admin
@app.post('/update-section')
@auth_required('token')
@roles_required('admin')
def update_section():
    data = request.get_json()
    section = Section.query.filter_by(name = data['name']).first()
    try:
        section.name = data['changed_name'] # type: ignore
        section.description = data['description'] # type: ignore
        return jsonify({'message':"Section updated successfully"}),200
    except:
        raise
    finally:
        db.session.commit()


# TODO: API route whcih helps in update the products details by the manager
@app.post('/update-product')
@auth_required('token')
@roles_required('manager')
def update_product():
    data = request.get_json()
    product = Product.query.filter_by(name = data['name']).first()

    if not product:
        return jsonify({'message':"No product with the given name found"}),200
    try:
        product.name = data['changed_name']
        product.description = data['description']
        product.section = data['section']
    except:
        raise
    finally:
        db.session.commit()

@app.post('/update-product-cart')
@auth_required('token')
@roles_required('user')
def update_product_cart():
    data = request.get_json()
    d = {}
    for items in data:
        if items['name'] not in d:
            d[items['name']] = int(items['quantity'])
        else:
            d[items['name']] += int(items['quantity'])
        
    for k,v in d.items():
        product = Product.query.filter_by(name = k).first()
        if not product:
            return jsonify({'message':"Product not available"}),200
        try:
            product.quantity -=  v # type: ignore
        except:
            raise
        finally:
            db.session.commit()
            return jsonify({'message':"Product quantity updated"})


#! This route is a celery route which is a backend job to generate a csv of details of all the products
@app.get('/download-csv')
def donwload_csv():
    response = create_resource_csv.delay() # type: ignore
    return jsonify({'task-id':response.id})


#! API route to download the CSV file generated in the above route
@app.get('/get-csv/<taskID>')
def get_csv(taskID):
    res = AsyncResult(taskID)
    if res.ready():
        filename = res.result
        return send_file(path_or_file=filename, as_attachment = True,download_name='test.csv')
    else:
        return jsonify({'message':"Task pending"}), 404
