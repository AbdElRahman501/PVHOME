import Axios from "axios";


export async function addInverter(inverter, setAddInverter) {
    setAddInverter({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.post("/api/inverters/addInverter", inverter);
        setAddInverter({ inverter: data, success: data.message, loading: false, error: false })
    } catch (error) {
        setAddInverter({ success: false, loading: false, error })
    }
}
export async function addBattery(battery, setAddBattery) {
    setAddBattery({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.post("/api/batteries/addBattery", battery);
        setAddBattery({ battery: data, success: data.message, loading: false, error: false })
    } catch (error) {
        setAddBattery({ success: false, loading: false, error })
    }
}
export async function addPanel(panel, setAddPanel) {
    setAddPanel({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.post("/api/panels/addPanel", panel);
        setAddPanel({ panel: data.panel, success: data.message, loading: false, error: false })
    } catch (error) {
        setAddPanel({ success: false, loading: false, error })
    }
}
export async function addSolarCharger(solarCharger, setAddSolarCharger) {
    setAddSolarCharger({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.post("/api/solarChargers/addSolarCharger", solarCharger);
        setAddSolarCharger({ solarCharger: data, success: data.message, loading: false, error: false })
    } catch (error) {
        setAddSolarCharger({ success: false, loading: false, error })
    }
}