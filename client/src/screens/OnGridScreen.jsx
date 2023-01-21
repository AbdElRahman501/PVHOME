import React from 'react'
import { useState } from 'react';
import OnGridDataEntry from '../onGrid/OnGridDataEntry';
import OnGridResults from '../onGrid/OnGridResults';

function OnGridScreen() {
    const [data, setData] = useState({ });
    const [onSubmit, setOnSubmit] = useState(false)
    const [numOfPanels, setNumOfPanels] = useState();
    const powerOfSingleModel = 250


    function changeHandler() {
        setOnSubmit(false)
        setNumOfPanels()
    }

    function submitHandler(e) {
        e.preventDefault();
        console.log(data);
        setOnSubmit(true)
        let number = (data.power / powerOfSingleModel) + 1
        setNumOfPanels(Math.floor(number))
    }



    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content">
                    <div className="center">
                        <h1>On Grid</h1>
                    </div>
                    {!onSubmit
                        ? <OnGridDataEntry submitHandler={submitHandler} data={data} setData={setData}  />
                        : <OnGridResults changeHandler={changeHandler} numOfPanels={numOfPanels} powerOfSingleModel={powerOfSingleModel}  />
                    }
                </div>
            </div>
        </section>
    )
}

export default OnGridScreen
