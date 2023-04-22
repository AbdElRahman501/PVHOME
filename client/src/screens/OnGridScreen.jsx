import React from 'react'
import { useState } from 'react';
import OnGridDataEntry from '../SystemsComponents/onGrid/OnGridDataEntry';
import OnGridResults from '../SystemsComponents/onGrid/OnGridResults';
import DropDown from '../components/DropDown';

function OnGridScreen() {
    const [data, setData] = useState({ type: "On Grid", safetyFactor: 25 });
    const [onSubmit, setOnSubmit] = useState(false)


    function changeHandler() {
        const prevData = data
        setData(pv => ({ ...pv, loading: true, totalPower: "" }))
        const timer = () => setTimeout(() => {
            setData(pv => ({ ...prevData, loading: false }))
        }, 10);
        timer()
        setOnSubmit(false)
    }

    function submitHandler(e) {
        e.preventDefault();
        setOnSubmit(true)
    }



    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content">
                    <div className="center">
                        <h1>On Grid</h1>
                    </div>
                    <DropDown setData={setData} data={data} onSubmit={onSubmit} />
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
