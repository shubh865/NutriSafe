from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class User(db.Document):
    name = db.StringField(required=True)
    age = db.IntField(required=True)
    gender = db.StringField(required=True)
    mobile_number = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)

    allergens = db.ListField(db.StringField())
    allergy_foods = db.ListField(db.StringField())
    food_preferences = db.StringField()

    today_calories = db.IntField(default=0)
    previous_calories = db.ListField(db.DictField())

    meta = {'collection': 'users'}

    @classmethod
    def add_user(cls, args):
        try:
            user = cls(**args)
            user.save()
            return {"error": False, "data": user}
        
        except (DuplicateKeyError, NotUniqueError):
            return {"error": True, "message": "User with same mobile already exists"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}

    @classmethod
    def get_user_by_mobile_number(cls, mobile_number):
        try:
            user = cls.objects.get(mobile_number=mobile_number)
            return {"error": False, "data": user}
        
        except cls.DoesNotExist:
            return {"error": True, "message": "User does not exist"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def add_allergies(cls, args):
        # add all the three allergies to the user

        try:
            user = cls.objects.get(mobile_number=args['mobile_number'])
            user.allergens = args['allergens']
            user.allergy_foods = args['allergy_foods']
            user.food_preferences = args['food_preferences']
            user.save()
            return {"error": False, "data": user}
        
        except cls.DoesNotExist:
            return {"error": True, "message": "User does not exist"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    
