import Axios from "axios";



export async function choseInverter(power,rang, setInverters) {
    setInverters({inverters:"",loading:true,error:false})
    try {
        const { data: inverters } = await Axios.post("/api/inverters/choseInverter", { power,rang });
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
export async function chosePanel(data,setPanels) {
    setPanels({panels:"",loading:true,error:false})
    try {
        const { data: panels } = await Axios.post("/api/panels/chosePanel", data);
        setPanels({panels,loading:false,error:false})
    } catch (error) {
        setPanels({panels:"",loading:false,error})

    }
}