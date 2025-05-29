from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from flask_restful import Resource, reqparse
import os
import json
from models.user import User as UserModel

os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI")
llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7)

prompt = """
    Act as an expert of nutirition and allergies. I will give you a food type like breakfast, lunch, dinner, etc. You should tell me a recipe for that food type keeping in mind the user's allergies and food preferences. 
    You will receive the user's allergies and food preferences in the below format:
    users_allergies: {{
        allergens: {allergens},
        allergy_foods: {allergy_foods},
        food_preferences: {food_preferences}
    }}  
    user recipe for: {time}

    output format should be in proper json format or else key error will occur:           
    {{
        "name": "name of the dish/recipe",
        "details": {{
            "nutrients": {{
                "calories": "0",
                "carbohydrates": "0",
                "fat": "0",
                "protein": "0"
            }}
        }},
        "ingredients": [
            "ingredient1",
            "ingredient2",
            "ingredient3"
        ],   
        "instructions": [
            "instruction1",
            "instruction2",
            "instruction3"
        ]
    }}
    strictly no intro or outro. Just the follow the format and give the recipe.
"""

prompt2 = """
    Act as an expert of nutirition and allergies. 
    You should tell me a recipe for that food type keeping in mind the user's allergies, food preferences and the major food items I have at home.
    Strictly generate recipe from the provided food items only, don't consider any other food items for generating recipe
    You will receive the user's allergies and food preferences in the below format:
    users_allergies: {{
        allergens: {allergens},
        allergy_foods: {allergy_foods},
        food_preferences: {food_preferences}
    }}  
    user recipe for: {time}
    foot_items_at_home: {food_items_at_home}

    output format should be in proper json format or else key error will occur:           
    {{
        "name": "name of the dish/recipe",
        "details": {{
            "nutrients": {{
                "calories": "0",
                "carbohydrates": "0",
                "fat": "0",
                "protein": "0"
            }}
        }},
        "ingredients": [
            "ingredient1",
            "ingredient2",
            "ingredient3"
        ],   
        "instructions": [
            "instruction1",
            "instruction2",
            "instruction3"
        ]
    }}
    strictly no intro or outro. Just the follow the format and give the recipe.
"""

class Recipe(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('time', type=str, required=True)
        args = parser.parse_args()

        response = UserModel.get_user_by_mobile_number("9137357003")
        if response["error"]:
            return response, 400
        
        user = response["data"]
        allergens = user["allergens"]
        allergy_foods = user["allergy_foods"]
        food_preferences = user["food_preferences"]

        response = llm.invoke(prompt.format(allergens=allergens, allergy_foods=allergy_foods, food_preferences=food_preferences, time=args["time"]))

        return {"error": False, "data": json.loads(response.content)}, 200


class RecipeFromFoodItemsAtHome(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('time', type=str, required=True)
        parser.add_argument('food_items_at_home', type=str, required=True)
        args = parser.parse_args()

        response = UserModel.get_user_by_mobile_number("9137357003")
        if response["error"]:
            return response, 400
        
        user = response["data"]
        allergens = user["allergens"]
        allergy_foods = user["allergy_foods"]
        food_preferences = user["food_preferences"]

        response = llm.invoke(prompt2.format(allergens=allergens, allergy_foods=allergy_foods, food_preferences=food_preferences, time=args["time"], food_items_at_home=args["food_items_at_home"]))
        print(response.content)

        return {"error": False, "data": json.loads(response.content)}, 200
