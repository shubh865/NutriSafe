from flask_restful import Resource, reqparse
from models.user import User as UserModel
import json

class Signup(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', required=True, help="Name is required")
        parser.add_argument('age', required=True, help="Age is required")
        parser.add_argument('gender', required=True, help="gender is required")
        parser.add_argument('mobile_number', required=True, help="mobile_number is required")
        parser.add_argument('password', required=True, help="password is required")
        args = parser.parse_args()

        response = UserModel.add_user(args)
        if response['error']:
            return response
        
        return {"error": False}
        
    
class Login(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mobile_number', required=True, help="Mobile is required")
        parser.add_argument('password', required=True, help="Password is required")
        
        args = parser.parse_args()
        response = UserModel.get_user_by_mobile_number(args['mobile_number'])
        if response['error']:
            return response
        
        user = response['data']
        if user.password != args['password']:
            return {"error": True, "message": "Wrong credentials"}
        
        return {"error": False, "data": json.loads(user.to_json())}
        

class Allergies(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('mobile_number', type=str, required=True, help="Mobile number is required")
        parser.add_argument('allergens', type=list, location="json", required=True, help="allergens is required")
        parser.add_argument('allergy_foods', type=list, location="json", required=True, help="allergy_foods is required")
        parser.add_argument('food_preferences', type=str, required=True, help="food_preferences is required")
        args = parser.parse_args()

        response = UserModel.add_allergies(args)
        if response['error']:
            return response
        
        return {"error": False}

