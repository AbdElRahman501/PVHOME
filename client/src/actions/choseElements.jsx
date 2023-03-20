import Axios from "axios";
import { getElevationAngle, getOptimumTiltAngle } from "./Functions";


export async function choseInverter(power, safetyFactor, type, setInverters) {
    setInverters({ inverters: "", loading: true, error: false })
    try {
        const { data: inverters } = await Axios.post("/api/inverters/choseInverter", { type, power, safetyFactor });
        setInverters({ inverters: inverters, loading: false, error: false })
    } catch (error) {
        setInverters({ inverters: "", loading: false, error })

    }
}
export async function choseBattery(energy, inverter, setBattery) {
    setBattery({ batteries: "", loading: true, error: false })
    try {
        const { data: batteries } = await Axios.post("/api/batteries/choseBattery", { energy, loss: 0.85, dod: 0.8, autonomyDay: 1, inverter });
        setBattery({ batteries, loading: false, error: false })

    } catch (error) {
        setBattery({ batteries: "", loading: false, error: error })

    }
}
export async function chosePanel(data, setPanels) {
    setPanels({ panels: "", loading: true, error: false })
    try {
        const { data: panels } = await Axios.post("/api/panels/chosePanel", data);
        setPanels({ panels, loading: false, error: false })
    } catch (error) {
        setPanels({ panels: "", loading: false, error })

    }
}

export async function getDailyIrradiation(lat, lon, tilt, setIrradiation) {
    setIrradiation({ dailyIrradiation: "", loading: true, error: false });
    try {
        const { data } = await Axios.post("/api/panels/getDailyIrradiation", { lat, lon, tilt, });
        setIrradiation({ dailyIrradiation: data.dailyIrradiation, loading: false, error: false });
    } catch (error) {
        setIrradiation({ dailyIrradiation: "", loading: false, error });


    }
}
export async function getLocation(government, city, setCoordinates, setIrradiation) {
    setCoordinates({ coordinates: "", loading: true, error: "" })
    try {
        const { data } = await Axios.post(`https://nominatim.openstreetmap.org/search/egypt ${government} ${city || ""}?format=json&addressdetails=1&limit=1`);
        if (data.length > 0) {
            let lat = Number(data[0]?.lat)
            let lon = Number(data[0]?.lon)
            let tiltAngle = getOptimumTiltAngle(lat)
            let elevationAngle = getElevationAngle(lat)
            if (government) {
                getDailyIrradiation(lat, lon, tiltAngle, setIrradiation)
            }
            setCoordinates({ coordinates: { lon, lat, tiltAngle, elevationAngle }, loading: false, error: "" })
        } else {
            getLocation(government, "", setCoordinates, setIrradiation)
        }
    } catch (error) {
        setCoordinates({ coordinates: "", loading: false, error })


    }
}
