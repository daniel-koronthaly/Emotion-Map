from pydantic import BaseModel
from pydantic import ConfigDict
from datetime import datetime

class DemographicResponseRead(BaseModel):
    id: int   
    session_id: str
    age: str
    gender: str
    sexuality: str
    transgender: str

    model_config = ConfigDict(from_attributes=True)

class EmotionResponseRead(BaseModel):
    id: int
    session_id: str
    emotion: str
    valence: float
    arousal: float
    timestamp: datetime
    demographic: DemographicResponseRead

    model_config = ConfigDict(from_attributes=True)