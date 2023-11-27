
#! Celery tasks which helps in getting downloading a csv of all products for the manager
from celery import shared_task
from .models import Product
import flask_excel as excel

@shared_task(ignore_result=False)
def create_resource_csv():
    products = Product.query.with_entities(Product.name, Product.description,Product.quantity,Product.amount).all() # type: ignore

    csv_output = excel.make_response_from_query_sets(products, ["name", "description","quantity","amount"], "csv")
    filename="test.csv"

    with open(filename, 'wb') as f:
        f.write(csv_output.data) # type: ignore

    return filename