from flask_restful import Resource, reqparse, request
from models.user import User as UserModel
from models.report import Report as ReportModel
import json
import base64
import cloudinary.uploader

class Report(Resource):
    def post(self):
        file_to_upload = request.files['file']
        mobile_number = request.form['mobile_number']
        food_name = request.form['food_name']
        effect = request.form['effect']

        cloudinary.config(cloud_name ="dcwwcwkvu", api_key="363672271215785", api_secret="Oba71bEe-7fmwIgjugIe3qDZsDY")
        upload_result = cloudinary.uploader.upload(file_to_upload)
        image_url = upload_result['secure_url']

        response = UserModel.get_user_by_mobile_number(mobile_number=mobile_number)
        if response["error"]:
            return response, 400
        
        user = response["data"]
        allergies = {
            "allergens": json.dumps(user["allergens"]),
            "allergy_foods": json.dumps(user["allergy_foods"]),
            "food_preferences": json.dumps(user["food_preferences"])
        }

        response = ReportModel.add_report(
            allergies=allergies, 
            food_image=image_url,
            food_name=food_name, 
            allergies_detected=effect
        )

        if response["error"]:
            return response, 400
        
        return {"error": False}, 200
        


        # args = parser.parse_args()

        # response = UserModel.get_user_by_mobile_number(args["mobile_number"])
        # if response["error"]:
        #     return response, 400
        
        # user = response["data"]
        # allergies = {
        #     "allergens": json.dumps(user["allergens"]),
        #     "allergy_foods": json.dumps(user["allergy_foods"]),
        #     "food_preferences": json.dumps(user["food_preferences"])
        # }

        # food_image_binary = base64.b64decode(args["food_image"])
        # print(food_image_binary)

        # response = ReportModel.add_report(
        #     allergies=allergies, 
        #     food_image=food_image_binary,
        #     food_name=args["food_name"], 
        #     allergies_detected=args["allergies_detected"]
        # )

        # if response["error"]:
        #     return response, 400
        
        return {"error": False}, 200
    
    def get(self):
        response = ReportModel.get_reports()
        if response["error"]:
            return response, 400
        
        reports = response["data"]

        return {"error": False, "data": json.loads(reports.to_json())}, 200