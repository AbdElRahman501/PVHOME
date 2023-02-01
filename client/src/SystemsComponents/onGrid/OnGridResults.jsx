import React, { useState } from 'react'
import { useEffect } from 'react';
import { choseInverter } from '../../actions/choseElemnts';

function OnGridResults(props) {
    const { data, numOfPanels, powerOfSingleModel, changeHandler } = props

    const [inverter, setInverter] = useState("none")

    useEffect(() => {
        if (data) {
            setInverter(choseInverter(data.power));
        }
    }, [data])
    console.log(inverter);
    return (
        <div>
            <div>
                <div className="data-entry-box">
                <p className='center'> inverter power you will need = </p>
                    <h3 className='center'>{inverter?.num} of {inverter?.name} with a total price {inverter?.totalPrice} EGP </h3>
                    <p className='center'> number of panels that you need = </p>
                    <h3 className='center'>  {numOfPanels} module of {powerOfSingleModel} W</h3>


                </div>
            </div>

            <div className="center">
                <button className="btn secondary" onClick={changeHandler}>Change</button>
            </div>

        </div>
    )
}

export default OnGridResults
