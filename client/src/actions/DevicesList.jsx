import Axios from "axios";

////panels 
export async function panelsList(setPanels) {
    setPanels({ panels: "", loading: true, error: false })
    try {
        const { data } = await Axios.get("/api/panels");
        setPanels({ panels: data, loading: false, error: false })
    } catch (error) {
        setPanels({ panels: "", loading: false, error })
    }
}
export async function updatePanel(id, newData, setUpdatePanel) {
    setUpdatePanel({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.post("/api/panels/UpdatePanel/" + id, newData);
        setUpdatePanel({ success: data.message, loading: false, error: false })
    } catch (error) {
        setUpdatePanel({ success: false, loading: false, error })
    }
}
export async function removePanel(id, setDeletedPanel) {
    setDeletedPanel({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.delete("/api/panels/deletePanel/" + id);
        setDeletedPanel({ success: data.message, loading: false, error: false })
    } catch (error) {
        setDeletedPanel({ success: false, loading: false, error })
    }
}

//// inverters 
export async function InvertersList(setInverters) {
    setInverters({ inverters: "", loading: true, error: false })
    try {
        const { data } = await Axios.get("/api/inverters");
        setInverters({ inverters: data, loading: false, error: false })
    } catch (error) {
        setInverters({ inverters: "", loading: false, error })
    }
}
export async function UpdateInverter(id, newData, setUpdateInverter) {
    setUpdateInverter({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.post("/api/inverters/UpdateInverter/" + id, newData);
        setUpdateInverter({ success: data.message, loading: false, error: false })
    } catch (error) {
        setUpdateInverter({ success: false, loading: false, error })
    }
}
export async function removeInverter(id, setDeletedPanel) {
    setDeletedPanel({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.delete("/api/inverters/deleteInverter/" + id);
        setDeletedPanel({ success: data.message, loading: false, error: false })
    } catch (error) {
        setDeletedPanel({ success: false, loading: false, error })
    }
}

//// batteries 
export async function BatteriesList(setBatteries) {
    setBatteries({ batteries: "", loading: true, error: false })
    try {
        const { data } = await Axios.get("/api/batteries");
        setBatteries({ batteries: data, loading: false, error: false })
    } catch (error) {
        setBatteries({ batteries: "", loading: false, error })
    }
}
export async function UpdateBattery(id, newData, setUpdateBattery) {
    setUpdateBattery({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.post("/api/batteries/UpdateBattery/" + id, newData);
        setUpdateBattery({ success: data.message, loading: false, error: false })
    } catch (error) {
        setUpdateBattery({ success: false, loading: false, error })
    }
}
export async function RemoveBattery(id, setDeleteBattery) {
    setDeleteBattery({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.delete("/api/batteries/RemoveBattery/" + id);
        setDeleteBattery({ success: data.message, loading: false, error: false })
    } catch (error) {
        setDeleteBattery({ success: false, loading: false, error })
    }
}