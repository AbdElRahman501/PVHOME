import React from 'react'
import { useState } from 'react';
import { NumFormatter } from '../actions/Functions';
import OnGridDataEntry from '../SystemsComponents/onGrid/OnGridDataEntry';
import OnGridResults from '../SystemsComponents/onGrid/OnGridResults';

function OnGridScreen() {
    const [data, setData] = useState({});
    const [onSubmit, setOnSubmit] = useState(false)


    function changeHandler() {
        setData(pv => ({...pv,totalPower:"",area:""}))
        setOnSubmit(false)
    }

    function submitHandler(e) {
        e.preventDefault();
        console.log(data);
        setOnSubmit(true)
    }
    let rang = (data.rang / 100) + 1 || 1.25



    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content">
                    <div className="center">
                        {/* <p className='calc-data'>{NumFormatter(data.totalPower, 2)}* {rang} // {NumFormatter(data.totalPower * rang, 2)}  W</p> */}
                        <h1>On Grid</h1>
                    </div>
                    {!onSubmit
                        ? <OnGridDataEntry submitHandler={submitHandler} data={data} setData={setData} />
                        : <OnGridResults changeHandler={changeHandler} data={data} />
                    }
                </div>
            </div>
        </section>
    )
}

export default OnGridScreen
