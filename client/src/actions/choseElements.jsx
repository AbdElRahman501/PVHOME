import Axios from "axios";



export async function choseInverter(power, setInverters) {
    setInverters({inverters:"",loading:true,error:false})
    try {
        const { data: inverters } = await Axios.post("/api/inverters/choseInverter", { power,rang:25 });
        setInverters({inverters:inverters,loading:false,error:false})
    } catch (error) {
        setInverters({inverters:"",loading:false,error})

    }
}
export async function choseBattery(energy, inverter, setBattery) {
    setBattery({ batteries:"", loading: true, error: false })
    try {
        const { data:batteries } = await Axios.post("/api/batteries/choseBattery", { energy,loss:0.85,dod:0.8,autonomyDay:1, inverter });
        setBattery({ batteries, loading: false, error: false })

    } catch (error) {
        setBattery({ batteries:"", loading: false, error: error })

    }
}
