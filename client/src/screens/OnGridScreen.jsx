import React from 'react'
import { useState } from 'react';
import governments from "../components/governorates.json"

function OnGridScreen() {

    const [onSubmit, setOnSubmit] = useState(false)
    const [government, setGovernment] = useState("");
    const [area, setArea] = useState(0);
    const [power, setPower] = useState(0);


    const [numOfPanels, setNumOfPanels] = useState();
    const powerOfSingleModel = 250

    function submitHandler(e) {
        e.preventDefault();
        setOnSubmit(true)
        let number = (power / powerOfSingleModel) + 1
        setNumOfPanels(Math.floor(number))
    }
    function changeHandler() {
        setOnSubmit(false)
        setNumOfPanels()
    }



    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content">
                    <div className="center">
                        <h1>On Grid</h1>
                    </div>
                    {onSubmit
                        ?
                        <div>
                            <div className="data-entry-box">

                                <p className='center'> number of panels that you need = </p>
                                <h3 className='center'>  {numOfPanels} module of {powerOfSingleModel} W</h3>


                            </div>
                            <div className="center">
                                <button className="btn secondary" onClick={changeHandler}>Change</button>
                            </div>

                        </div>
                        :
                        <form onSubmit={submitHandler}>
                            <div className="data-entry-box center">
                                <div>
                                    <label className="data-input" htmlFor="government">Government
                                        <select name="government" id="government" required
                                            value={government}
                                            onChange={(e) => setGovernment(e.target.value)}
                                        >
                                            {governments.map((x, i) => <option key={i} value={x.governorate_name_en}>{x.governorate_name_en}</option>)}
                                        </select>
                                    </label>
                                    <div className="flex-container">
                                        <label className="data-input flex-item" htmlFor="area">Area
                                            <div>
                                                <input type="number" name="area" id="area" placeholder='E.X 50' required
                                                    value={area}
                                                    onChange={(e) => setArea(e.target.value > 0 ? e.target.value : 0)}
                                                />
                                                <span>m<sup>2</sup></span>
                                            </div>
                                        </label>
                                        <label className="data-input flex-item" htmlFor="total-power">Total Power
                                            <div>
                                                <input type="number" name="total-power" id="total-power" placeholder='E.X 100' required
                                                    value={power}
                                                    onChange={(e) => setPower(e.target.value > 0 ? e.target.value : 0)}
                                                />
                                                <span>W</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="center">
                                <button className="btn primary">Submit</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </section>
    )
}

export default OnGridScreen
