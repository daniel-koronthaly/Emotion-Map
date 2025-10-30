from test_client import client
from models import DemographicResponse, EmotionResponse, AgeOptions, GenderOptions, SexualityOptions, TransgenderOptions

def test_create_and_read_demographic(client):
    # Create a demographic response
    payload = {
        "session_id": "test123",
        "age_range": AgeOptions.age_25to34,
        "gender": GenderOptions.gender_female,
        "sexuality": SexualityOptions.sexuality_heterosexual,
        "is_transgender": TransgenderOptions.transgender_no
    }

    response = client.post("/demographics/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["session_id"] == "test123"
    assert data["id"] is not None

    # Fetch the demographic by session_id
    response = client.get("/demographics/test123")
    assert response.status_code == 200
    results = response.json()
    assert results["session_id"] == "test123"
    assert results["id"] is not None
