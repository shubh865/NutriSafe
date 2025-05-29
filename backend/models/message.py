from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class Message(db.Document):
    msg_id = db.IntField(required=True)
    username = db.StringField(required=True)
    text = db.StringField(required=True)
    image = db.StringField()

    meta = {'collection': 'messages'}

    @classmethod
    def add_message(cls, args):
        try:
            print(cls.objects.count())
            args['msg_id'] = cls.objects.count() + 1
            message = cls(**args)
            message.save()
            return {"error": False, "data": message}
        
        except (DuplicateKeyError, NotUniqueError):
            return {"error": True, "message": "Message with same id already exists"}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def get_messages(cls):
        try:
            messages = cls.objects()
            return {"error": False, "data": messages}
        
        except Exception as e:
            return {"error": True, "message": str(e)}