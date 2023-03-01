import React from 'react'
import { useState } from 'react'
import { NumFormatter } from '../../actions/Functions'
import BatteryComponents from '../../components/BatteryComponents'
import InverterComponents from '../../components/InverterComponents'
import PanelComponents from '../../components/PanelComponents'


function OffGridResults(props) {
    const { setOnSubmit, data } = props

    const [active, setActive] = useState(0)
    const dataSlider = document.querySelector(".data-slider")
    const dataBox = dataSlider?.querySelectorAll(".data-entry-box")
    const [BatteryState, setBattery] = useState({})
    const [InverterState, setInverters] = useState({})

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
    let rang = (data.rang/100)+1
    return (
        <div>
            <div className='center relative'>
                <div className='back'>{active !== 0 && <button onClick={() => slide("back")}><i className='fa fa-angle-left'></i></button>}</div>
                <div className='data-slider'>
                    <PanelComponents data={data} InverterState={InverterState} />
                    <InverterComponents data={data} InverterState={InverterState} setInverters={setInverters} setBattery={setBattery} />
                    <BatteryComponents data={data} BatteryState={BatteryState} setBattery={setBattery} />
                </div>
                <div className='next'>{active < dataBox?.length - 1 ? <button onClick={() => slide("next")} ><i className='fa fa-angle-right'></i></button> : ""} </div>
            </div>
            <div className="center relative">
                <div className='absolute'>
                    <p className='calc-data'>{NumFormatter(data.totalPower, 2)}* {rang} // {NumFormatter(data.totalPower * 1.3, 2)}  W</p>
                    <p className='calc-data'>{NumFormatter(data.totalEnergy, 2)} whr</p>
                </div>
                <button className="btn secondary" onClick={() => setOnSubmit(false)} >Change</button>
            </div>

        </div>
    )
}

export default OffGridResults
