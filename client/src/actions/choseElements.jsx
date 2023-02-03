import Axios from "axios";



export async function choseInverter(power, setInverters) {
    setInverters({inverters:"",loading:true,error:false})
    try {
        const { data: inverters } = await Axios.post("/api/inverters/choseInverter", { power });
        setInverters({inverters:inverters,loading:false,error:false})
    } catch (error) {
        setInverters({inverters:"",loading:false,error})

    }
}
export async function choseBattery(energy, inverter, setBattery) {
    setBattery({ battery:"", loading: true, error: false })
    try {
        const { data:battery } = await Axios.post("/api/batteries/choseBattery", { energy, inverter });
        setBattery({ battery, loading: false, error: false })

    } catch (error) {
        setBattery({ battery:"", loading: false, error: error })

    }
}
