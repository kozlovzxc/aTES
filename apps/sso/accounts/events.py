import json
from dataclasses import dataclass, field
from typing import TypedDict
from uuid import uuid4

from jsonschema import validate

schema = json.load(open('../schema-registry/schemas/account/created/1.json'))


class AccountCreatedData(TypedDict):
    public_id: str
    username: str
    role: str


@dataclass
class AccountCreated:
    event_data: AccountCreatedData

    event_id: str = field(init=False)
    event_name: str = 'AccountCreated'
    event_version: int = 1

    def __post_init__(self):
        self.event_id = str(uuid4())
        validate(self.__dict__, schema)

    def __str__(self):
        return json.dumps(self.__dict__)


class AccountAuthenticatedData(TypedDict):
    public_id: str
    accessToken: str


@dataclass
class AccountAuthenticated:
    event_data: AccountAuthenticatedData

    event_id: str = field(init=False)
    event_name: str = 'AccountAuthenticated'
    event_version: int = 1

    def __post_init__(self):
        self.event_id = str(uuid4())

    def __str__(self):
        return json.dumps(self.__dict__)
