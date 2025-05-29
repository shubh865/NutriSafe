from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from flask_restful import Resource, reqparse
import os
import json
from models.user import User as UserModel

os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI")
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7)

prompt1 = """
    Act as an expert of nutirition and allergies.
    I will give you a food name and my allergies. 
    You should suggest me a list of other similar allergic foods that I should avoid.
    You will receive the user's allergies and food preferences in the below format:
    users_allergies: {{
        allergens: {allergens},
        allergy_foods: {allergy_foods},
        food_preferences: {food_preferences}
    }}  
    food_name: {food_name}

    your output should strictly be in the below format:
    [
        "food1",
        "food2",
        ....
    ]
"""

prompt2 = """
    Act as an expert of nutirition and allergies.
    I will give you a food name and my allergies. 
    You should suggest me a list of other similar alternate/replacement foods that I can eat and their buy links.
    You will receive the user's allergies and food preferences in the below format:
    users_allergies: {{
        allergens: {allergens},
        allergy_foods: {allergy_foods},
        food_preferences: {food_preferences}
    }}  
    food_name: {food_name}

    your output should strictly be in the below format:
    [
        {{
            "food": "food1",
            "buy_link": "https://blinkit.com/s/?q=food1"
        }},
        {{
            "food": "food2",
            "buy_link": "https://blinkit.com/s/?q=food2"
        }}
    ]
"""

class AlternateAllergicFoods(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mobile_number", type=str, required=True, help="This field cannot be left blank!")
        parser.add_argument("food_name", type=str, required=True, help="This field cannot be left blank!")

        args = parser.parse_args()

        response = UserModel.get_user_by_mobile_number("9137357003")
        if response["error"]:
            return response, 400
        
        user = response["data"]
        allergens = user["allergens"]
        allergy_foods = user["allergy_foods"]
        food_preferences = user["food_preferences"]

        prompt = prompt1.format(
            allergens=json.dumps(allergens),
            allergy_foods=json.dumps(allergy_foods),
            food_preferences=json.dumps(food_preferences),
            food_name=args["food_name"]
        )

        response = llm.invoke(prompt)

        return {"error": False, "data": json.loads(response.content)}, 200


class AlternateNonAllergicFoods(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("mobile_number", type=str, required=True, help="This field cannot be left blank!")
        parser.add_argument("food_name", type=str, required=True, help="This field cannot be left blank!")

        args = parser.parse_args()

        response = UserModel.get_user_by_mobile_number("9137357003")
        if response["error"]:
            return response, 400
        
        user = response["data"]
        allergens = user["allergens"]
        allergy_foods = user["allergy_foods"]
        food_preferences = user["food_preferences"]

        prompt = prompt2.format(
            allergens=json.dumps(allergens),
            allergy_foods=json.dumps(allergy_foods),
            food_preferences=json.dumps(food_preferences),
            food_name=args["food_name"]
        )

        response = llm.invoke(prompt)

        return {"error": False, "data": json.loads(response.content)}, 200

