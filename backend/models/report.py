from mongo_engine import db
from pymongo.errors import DuplicateKeyError
from mongoengine import NotUniqueError

class Report(db.Document):
    report_id = db.IntField(required=True)
    allergies = db.DictField(required=True)
    food_image = db.StringField(required=True)
    food_name = db.StringField(required=True)
    allergies_detected = db.StringField(required=True)

    meta = {'collection': 'reports'}

    @classmethod
    def add_report(cls, allergies, food_image, food_name, allergies_detected):
        try:
            report_id = cls.objects.count() + 1
            report = cls(report_id=report_id, allergies=allergies, food_image=food_image, food_name=food_name, allergies_detected=allergies_detected)
            report.save()
            return {"error": False, "data": report}
        except NotUniqueError:
            return None
        
        except Exception as e:
            return {"error": True, "message": str(e)}
        
    @classmethod
    def get_reports(cls):
        try:
            reports = cls.objects()
            return {"error": False, "data": reports}
        
        except Exception as e:
            return {"error": True, "message": str(e)}
    