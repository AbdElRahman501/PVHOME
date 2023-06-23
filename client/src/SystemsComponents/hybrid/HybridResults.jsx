import React from 'react'
import { useState } from 'react'
import BatteryComponents from '../../components/BatteryComponents'
import InverterComponents from '../../components/InverterComponents'
import PanelComponents from '../../components/PanelComponents'
import SolarChargerComponent from '../../components/SolarChargerComponent'

export default function HybridResults(props) {
    const { setOnSubmit, data } = props

  
    const [BatteryState, setBattery] = useState({})
    const [InverterState, setInverters] = useState({})
    const [panelsState, setPanels] = useState({})
    const [chargerState, setSolarCharger] = useState({})

    const [active, setActive] = useState(0)
    const dataSlider = document.querySelector(".data-slider")
    const dataBox = dataSlider?.querySelectorAll(".data-entry-box")
    
    function slide(dec) {
        let x
        if (dec === "next") {
            x = (active + 1) < dataBox.length ? (active + 1) : active
            setActive(x)
        } else {
            x = (active - 1) >= 0 ? (active - 1) : active
            setActive(x)
        }
        x = x * dataSlider.offsetWidth
        dataSlider.scrollTo({
            left: x,
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <div>
            <div className='center relative'>
                <div className='back'>{active !== 0 && <button onClick={() => slide("back")}><i className='fa fa-angle-left'></i></button>}</div>
                <div className='data-slider'>
                    <PanelComponents data={data} InverterState={InverterState} panelsState={panelsState} setPanels={setPanels} chargerState={chargerState} />
                    <InverterComponents data={data} InverterState={InverterState} panelsState={panelsState} setInverters={setInverters} setBattery={setBattery} />
                    <BatteryComponents data={data} BatteryState={BatteryState} setBattery={setBattery} />
                    {/* <SolarChargerComponent data={data} BatteryState={BatteryState} panelsState={panelsState} chargerState={chargerState} setSolarCharger={setSolarCharger} /> */}
                </div>
                <div className='next'>{active < dataBox?.length - 1 ? <button onClick={() => slide("next")} ><i className='fa fa-angle-right'></i></button> : ""} </div>
            </div>
            <div className="submit">
                <button className="btn secondary" onClick={() => setOnSubmit(false)} >Change</button>
            </div>

        </div>
    )
}

