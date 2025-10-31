from sqlmodel import Session, select
from models import EmotionResponse, DemographicResponse
from typing import List
from database import engine
import csv

# Put new emotion entry into database
def create_emotion_response(session: Session, response: EmotionResponse) -> EmotionResponse:
    session.add(response)
    session.commit()
    session.refresh(response)
    return response

# Get all emotions of a specific session
def get_emotions_by_session(session: Session, session_id: str):
    results = session.exec(
        select(EmotionResponse).where(EmotionResponse.session_id == session_id)
    ).all()
    return results

# Get all entries for a specific emotion
def get_emotions_by_name(session: Session, emotion: str):
    results = session.exec(
        select(EmotionResponse).where(EmotionResponse.emotion == emotion)
    ).all()
    return results

# Put new demographic entry into database
def create_demographic_response(session: Session, response: DemographicResponse) -> DemographicResponse:
    session.add(response)
    session.commit()
    session.refresh(response)
    return response

# Get demographic info for a specific session
def get_demographic_by_session(session: Session, session_id: str):
    results = session.exec(
        select(DemographicResponse).where(DemographicResponse.session_id == session_id)
    ).one()
    return results

# Exports all data to csv
def export_all_data_to_csv(session: Session, file_path: str) -> str:
    """
    Export all emotion responses and their associated demographics to a CSV.
    
    Args:
        session: SQLModel/SQLAlchemy Session object.
        file_path: Path where the CSV will be saved.

    Returns:
        Number of rows exported.
    """
    # Join EmotionResponse with its DemographicResponse
    statement = select(EmotionResponse, DemographicResponse).where(
        EmotionResponse.session_id == DemographicResponse.session_id
    )
    results = session.exec(statement).all()

    # CSV header
    header = [
        "emotion_id", "session_id", "emotion", "valence", "arousal", "timestamp",
        "age_range", "gender", "sexuality", "is_transgender"
    ]

    with open(file_path, mode="w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(header)

        for emotion, demographic in results:
            writer.writerow([
                emotion.id,
                emotion.session_id,
                emotion.emotion,
                emotion.valence,
                emotion.arousal,
                emotion.timestamp.isoformat(),
                demographic.age,
                demographic.gender,
                demographic.sexuality,
                demographic.transgender,
            ])

    return file_path