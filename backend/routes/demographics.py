from fastapi import APIRouter
from dependencies import SessionDep
from crud import create_demographic_response, get_demographic_by_session
from models import DemographicResponse
from schemas import DemographicResponseRead

router = APIRouter(prefix="/demographics", tags=["demographics"])

@router.post("/", response_model=DemographicResponseRead)
def post_emotion(response: DemographicResponse, session: SessionDep):
    """
    Endpoint to submit a new demographic response.
    """
    return create_demographic_response(session, response)

@router.get("/{session_id}", response_model=DemographicResponseRead)
def read_demographic_by_sessionid(session_id: str, session: SessionDep):
    """
    Endpoint to fetch the demographic response for a specific session.
    """
    return get_demographic_by_session(session, session_id)