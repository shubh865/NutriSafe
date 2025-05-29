from flask_restful import Resource, reqparse
from models.message import Message as MessageModel
import json

class Message(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('text', type=str, required=True)
        parser.add_argument('image', type=str, required=True)
        args = parser.parse_args()

        response = MessageModel.add_message(args)
        if response["error"]:
            return response, 400

        return {"error": False}, 200
    
    def get(self):
        response = MessageModel.get_messages()
        if response["error"]:
            return response, 400
        
        messages = response["data"]
        print(messages)

        return {"error": False, "data": json.loads(messages.to_json())}, 200