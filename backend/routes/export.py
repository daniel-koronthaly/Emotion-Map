# routes/export_data.py
from fastapi import APIRouter
from fastapi.responses import FileResponse
from dependencies import SessionDep
from crud import export_all_data_to_csv  # your CSV export function

router = APIRouter(prefix="/export", tags=["export"])

@router.get("/all-data")
def download_all_data(session: SessionDep):
    """
    Generate a CSV of all demographics and emotions and return it as a download.
    """
    csv_path = export_all_data_to_csv(session, "all_emotions.csv")  # generate CSV
    return FileResponse(csv_path, media_type="text/csv", filename="all_data.csv")
