from flask import Flask, jsonify, request
from flask_mongoalchemy import MongoAlchemy
from marshmallow import Schema, fields
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["MONGOALCHEMY_DATABASE"] = "teippo"
db = MongoAlchemy(app)

class Warehouse(db.Document):
	code = db.StringField()
	name = db.StringField()

class WarehouseSchema(Schema):
	id = fields.Str(attribute="mongo_id")
	code = fields.Str()
	name = fields.Str()

# GET METHOD
@app.route("/api/warehouse/", methods=["GET"])
def get_warehouses():
	warehouses = Warehouse.query.all()
	warehouses_schema = WarehouseSchema(many=True)
	results, errors = warehouses_schema.dump(warehouses)

	return jsonify(results)

@app.route("/api/warehouse/<string:code>")
def get_warehouses_by_code(code):
	warehouse = Warehouse.query.filter(Warehouse.code == code).first()
	warehouse_schema = WarehouseSchema()
	result, errors = warehouse_schema.dump(warehouse)

	return jsonify(result)

# POST METHOD
@app.route("/api/warehouse/", methods=["POST"])
def add_warehouses():
	new_warehouse = Warehouse(name=request.json["name"], code=request.json["code"])
	new_warehouse.save()

	warehouse_dict = {
		"id": "{}".format(new_warehouse.mongo_id),
		"code": new_warehouse.code,
		"name": new_warehouse.name
	}

	return jsonify(warehouse_dict)

# PUT METHOD
@app.route("/api/warehouse/<string:id>", methods=["PUT"])
def edit_warehouse(id):
	warehouse = Warehouse.query.get(id)
	warehouse.name = request.json["name"]
	warehouse.save()

	warehouse_dict = {
			"id": "{}".format(warehouse.mongo_id),
			"code": warehouse.code,
			"name": warehouse.name
	}

	return jsonify(warehouse_dict)

# DELETE METHOD
@app.route("/api/warehouses/<string:id>", methods=["DELETE"])
def delete_warehouse(id):
	warehouse = Warehouse.query.get(id)
	warehouse.remove()

	return jsonify({"message": "ok"})

if __name__ == "__main__":
		app.run()
