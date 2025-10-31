import axios from "axios";

const ExportToCsv = () => {
    const downloadCSV = async () => {
        try {
            const response = await axios.get("http://localhost:8000/export", {
                responseType: "blob",
                withCredentials: true,
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "all_data.csv");
            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading CSV:", error);
        }
    };
    return (
        <div>
            <h2>Export to .csv</h2>
            <p>
                If you would like to download the dataset that is created by users using this website, click the link below.
            </p>
            <button onClick={downloadCSV}>Download CSV</button>
        </div>
    );
};

export default ExportToCsv;