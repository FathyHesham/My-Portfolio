/* ============================= Start Fetch JSON File ============================= */
export async function getData (linkAPI) {
    try {
        const response = await fetch(linkAPI);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error Fetching Data:", error.message);
        showErrorMessage("Failed To Load Content. Please Refresh The Page.");
        return null;
    }
}
/* ============================= End Fetch JSON File ============================= */