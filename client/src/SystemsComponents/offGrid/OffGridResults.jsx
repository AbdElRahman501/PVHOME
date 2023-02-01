import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { choseBattery, choseInverter } from '../../actions/choseElemnts'

function OffGridResults(props) {
    const { setOnSubmit, data } = props

    const [inverter, setInverter] = useState("none")
    const [battery, setBattery] = useState("none")


    function totalPower(power, en) {
        let energy = en || power * 10
        let inverter = choseInverter(power);
        let battery = choseBattery(energy, inverter)
        return { inverter, battery }

    }



    useEffect(() => {
        if (data) {
            let { inverter, battery } = totalPower(data.totalPower, data.totalEnergy)
            setInverter(inverter)
            setBattery(battery)
        }
    }, [data])
    
    return (
        <div>
            <div>
                <div className="data-entry-box">
                    <p className='center'> inverter power you will need = </p>
                    <h3 className='center'>{inverter?.num} of {inverter?.name} with a total price {inverter?.totalPrice} EGP </h3>

                    <p className='center'> battery capacity you will need = </p>
                    <h3 className='center'>{battery?.num} of {battery?.name} with total price  {battery?.totalPrice} EGP </h3>

                    <p className='center'> Solar Panels you will need = </p>
                    <h3 className='center'>{Math.floor(((data.totalEnergy) / (0.75 * 5)) / 330) + 1} of 330w panels</h3>

                </div>
            </div>

            <div className="center">
                <button className="btn secondary" onClick={() => setOnSubmit(false)} >Change</button>
            </div>

        </div>
    )
}

export default OffGridResults
