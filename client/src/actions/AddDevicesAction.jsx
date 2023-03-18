import Axios from "axios";


export async function addInverter(inverter, setAddInverter) {
    setAddInverter({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.post("/api/inverters/addInverter", inverter);
        setAddInverter({ inverter: data, success: true, loading: false, error: false })
    } catch (error) {
        setAddInverter({ success: false, loading: false, error })
    }
}
export async function addBattery(battery, setAddBattery) {
    setAddBattery({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.post("/api/batteries/addBattery", battery);
        setAddBattery({ battery: data, success: true, loading: false, error: false })
    } catch (error) {
        setAddBattery({ success: false, loading: false, error })
    }
}
export async function addPanel(panel, setAddPanel) {
    setAddPanel({ success: false, loading: true, error: false })
    try {
        const { data } = await Axios.post("/api/panels/addPanel", panel);
        setAddPanel({ panel: data.panel, success: true, loading: false, error: false })
    } catch (error) {
        setAddPanel({ success: false, loading: false, error })
    }
}
