import axios from "axios";

const ExportToCsv = () => {
    const downloadCSV = async () => {
        try {
            const response = await axios.get("http://localhost:8000/export/all-data", {
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
            <button onClick={downloadCSV}>Download CSV</button>
        </div>
    );
};

export default ExportToCsv;