from test_client import client
from models import DemographicResponse, EmotionResponse, AgeOptions, GenderOptions, SexualityOptions, TransgenderOptions

def test_create_emotion_response(client):
    # First, create the demographic so FK is valid
    client.post("/demographics/", json={
        "session_id": "test456",
        "age_range": AgeOptions.age_18to24,
        "gender": GenderOptions.gender_male,
        "sexuality": SexualityOptions.sexuality_bisexual,
        "is_transgender": TransgenderOptions.transgender_no
    })

    # Create emotion response
    payload = {
        "session_id": "test456",
        "emotion": "happy",
        "valence": 0.8,
        "arousal": 0.5
    }
    response = client.post("/emotions/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["emotion"] == "happy"
    assert data["session_id"] == "test456"
    assert "id" in data
    assert "timestamp" in data

    data = response.json()
    assert data["emotion"] == "happy"
    assert data["valence"] == 0.8
    assert data["arousal"] == 0.5

    demographic_info = data["demographic"]
    assert demographic_info["session_id"] == "test456"
    assert demographic_info["age_range"] == AgeOptions.age_18to24.value
    assert demographic_info["gender"] == GenderOptions.gender_male.value
    assert demographic_info["sexuality"] == SexualityOptions.sexuality_bisexual.value
    assert demographic_info["is_transgender"] == TransgenderOptions.transgender_no.value
