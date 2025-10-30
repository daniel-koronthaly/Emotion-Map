import pytest
from sqlmodel import SQLModel, Session, create_engine
from fastapi.testclient import TestClient
from main import app
from dependencies import get_session
from sqlalchemy.pool import StaticPool

sqlite_url = "sqlite:///:memory:"
test_engine = create_engine(
    sqlite_url,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)

@pytest.fixture(scope="session")
def client():
    def get_test_session():
        with Session(test_engine) as session:
            yield session

    app.dependency_overrides[get_session] = get_test_session
    SQLModel.metadata.create_all(test_engine)
    yield TestClient(app)
    SQLModel.metadata.drop_all(test_engine)
