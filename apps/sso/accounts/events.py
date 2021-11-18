import json
from dataclasses import dataclass, field
from uuid import uuid4

from jsonschema import validate

schema = json.load(open('../schema-registry/schemas/account/created/1.json'))


@dataclass
class AccountCreated:
    event_data: object

    event_id: str = field(init=False)
    event_name: str = 'AccountCreated'
    event_version: int = 1

    def __post_init__(self):
        self.event_id = str(uuid4())

    def is_valid(self):
        try:
            print(self.__dict__)
            validate(self.__dict__, schema)
            return True
        except Exception as e:
            print(e)
            # TODO: handle exception
            return False
