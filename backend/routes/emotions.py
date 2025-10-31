from fastapi import APIRouter
from dependencies import SessionDep
from crud import create_emotion_response, get_emotions_by_session, get_emotions_by_name
from models import EmotionResponse
from schemas import EmotionResponseRead

router = APIRouter(prefix="/emotions", tags=["emotions"])

@router.post("/", response_model=EmotionResponseRead)
def post_emotion(response: EmotionResponse, session: SessionDep):
    """
    Endpoint to submit a new emotion response.
    """
    return create_emotion_response(session, response)

@router.get("/{emotion}", response_model=list[EmotionResponseRead])
def read_emotion_by_name(emotion: str, session: SessionDep):
    """
    Endpoint to fetch all emotion responses for a specific emotion.
    """
    return get_emotions_by_name(session, emotion)

@router.get("/{session_id}", response_model=list[EmotionResponseRead])
def read_emotions(session_id: str, session: SessionDep):
    """
    Endpoint to fetch all emotion responses for a specific session.
    """
    return get_emotions_by_session(session, session_id)
