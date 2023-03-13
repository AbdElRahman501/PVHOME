import React, { useState } from 'react'
import { NumFormatter } from '../../actions/Functions'
import InverterComponents from '../../components/InverterComponents'
import PanelComponents from '../../components/PanelComponents'


function OnGridResults(props) {
    const { data, changeHandler } = props

    const [active, setActive] = useState(0)
    const dataSlider = document.querySelector(".data-slider")
    const dataBox = dataSlider?.querySelectorAll(".data-entry-box")

    const [InverterState, setInverters] = useState({})
    const [panelsState, setPanels] = useState({})


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

    // console.log(data);
    return (
        <div>

            <div className='center relative'>
                <div className='back'>{active !== 0 && <button onClick={() => slide("back")}><i className='fa fa-angle-left'></i></button>}</div>
                <div className='data-slider'>
                    <PanelComponents data={data} InverterState={InverterState} panelsState={panelsState} setPanels={setPanels} />
                    <InverterComponents data={data} InverterState={InverterState} setInverters={setInverters} panelsState={panelsState} />
                </div>
                <div className='next'>{active < dataBox?.length - 1 ? <button onClick={() => slide("next")} ><i className='fa fa-angle-right'></i></button> : ""} </div>
            </div>
            <div className="submit">
                {/* <div className='absolute'>
                    <p className='calc-data'>{NumFormatter(data.totalPower, 2)}* {rang} // {NumFormatter(data.totalPower * 1.3, 2)}  W</p>
                    <p className='calc-data'>{NumFormatter(data.totalEnergy, 2)} whr</p>
                </div> */}
                <button className="btn secondary" onClick={changeHandler} >Change</button>
            </div>

        </div>
    )
}

export default OnGridResults
