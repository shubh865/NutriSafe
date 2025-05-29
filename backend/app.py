from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from flask_restful import Api
from resources.user import (Signup, Login, Allergies)
from resources.scanner import (PackagedFood, Food)
from resources.recipe import (Recipe, RecipeFromFoodItemsAtHome)
from resources.message import Message
from resources.report import Report
# from resources.remedies import remedies
# from backend.resources.alternateFoodsOld import (AlternateAllergicFoods, AlternateNonAllergicFoods)
from resources.alternateFoods import (AlternateAllergicFoods, AlternateNonAllergicFoods)
from resources.Calories import Calories
from resources.ImageToItems import ImageToItems
from mongo_engine import db
from flask_cors import CORS
import os

app = Flask(__name__)
api = Api(app)
CORS(app)

DB_URI = os.getenv("FLASK_MONGODB_URI")

app.config["MONGODB_HOST"] = DB_URI

db.init_app(app)

api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Allergies, "/addAllergies")
api.add_resource(PackagedFood, "/packagedFood")
api.add_resource(Food, "/food")
api.add_resource(Recipe, "/recipe")
api.add_resource(RecipeFromFoodItemsAtHome, '/recipeFromFoodItemsAtHome')
api.add_resource(Message, "/message")
api.add_resource(Report, "/report")
api.add_resource(AlternateAllergicFoods, "/alternateAllergicFoods")
api.add_resource(AlternateNonAllergicFoods, "/alternateNonAllergicFoods")
api.add_resource(Calories, "/calculateCalories")
api.add_resource(ImageToItems, "/imageToItems")

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "Pong!"})



if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
            
