import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const ExportToCsv = () => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const downloadCSV = async () => {
        try {
            const response = await axios.get(`${API_URL}/export/all-data`, {
                responseType: "blob",
            });

            const blob = new Blob([response.data], { type: "text/csv" });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "all_data.csv");
            document.body.appendChild(link);
            link.click();

            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 200);
        } catch (error) {
            console.error("Error downloading CSV:", error);
        }
    };
    return (
        <div>
            <h2>Export to .csv</h2>
            <p>
                If you would like to download the dataset that is being created by using this website, click below.
            </p>
            <button
                style={{
                    backgroundColor: isHovered ? "#00a0b8" : "#008192",
                    color: "white",
                    width: 200,
                    height: 40,
                    borderWidth: 0,
                    borderRadius: 15,
                    fontSize: "14px",
                    fontWeight: 600,
                    marginTop: "10px",
                    transition: "background-color 0.2s, transform 0.1s"
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={downloadCSV}
            >
                Download CSV
            </button>
        </div>
    );
};

export default ExportToCsv;