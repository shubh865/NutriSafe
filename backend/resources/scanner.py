from flask_restful import Resource, reqparse, request
from models.user import User as UserModel
from models.report import Report as ReportModel
import json
from io import BytesIO
import google.generativeai as genai
import os
from constants.gemini import (generate_gemini_response)

genai.configure(api_key = os.getenv("GEMINI"))

packaged_food_input_prompt = """
    You are an Nutirtional expert who understands a person with allergies should eat which food and which not.
    You will receive a input image of a packaged food item and you have to identify the ingredient/contents in the food item from the given photo. Then compare with the user's allergies and tell if the user can eat the food item or not. 
"""

packaged_food_question_prompt = """You will receive a input image of a packaged food item and you have to identify the ingredient/contents in the food item from the given photo. Then compare with the user's allergies and tell if the user can eat the food item or not.
    You should also check if any user with similar allergies as the user has eaten this food item and if they had any allergic reaction or not. If yes, then you should tell the user about the allergic reaction.
    users_allergies: {{
        allergens: {allergens},
        allergy_foods: {allergy_foods},
        food_preferences: {food_preferences}
    }}

    previous_reports_about_foods_that_gave_them_allergies: {previous_reports}

    Your response should be strictly in the below format in json:
    for example: 
        {{
            ingredients: [
                ingredients in the photo of the packaged food item,
            ],
            can_eat: yes or no,
            reason: explanation why the user can eat or not eat the food item based on the ingredients in the photo and the user's allergens, allergy_foods and food_preferences,
            previously_reported: "yes or no",
            previous_report_for_this_food: "X number of people with similar allergies as the user have eaten this food item and they were fine/they had an allergic reaction XYZ"
        }}
    Strictly no intro, outro  or any other special characters are allowed. don't format your response in any way.
"""

food_input_prompt = """
    You are an Nutirtional expert who understands a person with allergies should eat which food and which not.
    You will receive a input image of a food item/dish and you have to identify the ingredient/contents in the food item from the given photo. Then compare with the user's allergies and tell if the user can eat the food item or not. 
"""

food_question_prompt = """You will receive a input image of a food item/dish and you have to identify the name and ingredients/contents in the food item from the given photo. Then compare with the user's allergies and tell if the user can eat the food item or not.
    You should also check if any user with similar allergies as the user has eaten this food item and if they had any allergic reaction or not. If yes, then you should tell the user about the allergic reaction.
    users_allergies: {{
        allergens: {allergens},
        allergy_foods: {allergy_foods},
        food_preferences: {food_preferences}
    }}

    previous_reports_about_foods_that_gave_them_allergies: {previous_reports}

    Your response should be strictly in the below format in json:
    for example: 
        {{
            name: "name of the food item",
            ingredients: [
                ingredients in the photo of the food item,
            ],
            can_eat: "yes or no",
            reason: "explanation why the user can eat or not eat the food item based on the ingredients in the photo and the user's allergens, allergy_foods and food_preferences",
            previously_reported: "yes or no",
            previous_report_for_this_food: "X number of people with similar allergies as the user have eaten this food item and they were fine/they had an allergic reaction XYZ"
            
        }}
    Strictly no intro, outro  or any other special characters are allowed. don't format your response in any way.
"""

class PackagedFood(Resource):
    def post(self):
        image = request.files['image']
        image_content = BytesIO(image.read())

        response = UserModel.get_user_by_mobile_number("9137357003")
        if response["error"]:
            return response, 400
        
        user = response["data"]
        allergens = user["allergens"]
        allergy_foods = user["allergy_foods"]
        food_preferences = user["food_preferences"]

        allergens = json.dumps(allergens)
        allergy_foods = json.dumps(allergy_foods)

        response = ReportModel.get_reports()
        if response["error"]:
            return response, 400
        
        reports = response["data"]
        reports = reports.to_json()

        response = generate_gemini_response(packaged_food_input_prompt, image_content, packaged_food_question_prompt.format(allergens=allergens, allergy_foods=allergy_foods, food_preferences=food_preferences, previous_reports=reports))
        print(response)

        return {"error": False, "data": json.loads(response)}


class Food(Resource):
    def post(self):
        image = request.files['image']
        image_content = BytesIO(image.read())

        response = UserModel.get_user_by_mobile_number("9137357003")
        if response["error"]:
            return response, 400
        
        user = response["data"]
        allergens = user["allergens"]
        allergy_foods = user["allergy_foods"]
        food_preferences = user["food_preferences"]

        allergens = json.dumps(allergens)
        allergy_foods = json.dumps(allergy_foods)

        response = ReportModel.get_reports()
        if response["error"]:
            return response, 400

        reports = response["data"]
        reports = reports.to_json()

        prompt = food_question_prompt.format(allergens=allergens, allergy_foods=allergy_foods, food_preferences=food_preferences, previous_reports=reports)

        response = generate_gemini_response(food_input_prompt, image_content, prompt)
        print(response)

        return {"error": False, "data": json.loads(response)}

