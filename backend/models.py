# Here I define the models for a demographic response and an emotion response
# enums.py defines the possible answers  

from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone
from enums import AgeOptions, GenderOptions, SexualityOptions, TransgenderOptions

# One per session_id
class DemographicResponse(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    session_id: str = Field(index=True, unique=True) # UUID
    age: AgeOptions
    gender: GenderOptions
    sexuality: SexualityOptions
    transgender: TransgenderOptions
    emotion_responses: list["EmotionResponse"] = Relationship(back_populates="demographic")

# One per emotion, multiple per specific session_id
class EmotionResponse(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    session_id: str = Field(foreign_key="demographicresponse.session_id", index=True) # links to DemographicResponse
    emotion: str = Field(index=True)
    valence: float # Has range [-1.0, 1.0] indicating how positive (or negative) an emotion is
    arousal: float # Has range [-1.0, 1.0] indicating how strong (or weak) an emotion is
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    demographic: DemographicResponse = Relationship(back_populates="emotion_responses")

