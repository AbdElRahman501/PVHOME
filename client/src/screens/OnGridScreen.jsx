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
        localStorage.setItem("DATA-" + data.type, JSON.stringify(data))
    }
    let localData = JSON.parse((localStorage.getItem("DATA-" + data.type)))

    if (localData && localData.type === data.type && !data.government) {
        setData(localData)
    }


    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content">
                    <div className="center">
                        <h1>On Grid</h1>
                    </div>
                    <DropDown setData={setData} localData={localData} data={data} onSubmit={onSubmit} />
                    {!onSubmit
                        ? <OnGridDataEntry localData={localData} submitHandler={submitHandler} data={data} setData={setData} />
                        : <OnGridResults changeHandler={changeHandler} setData={setData} data={data} />
                    }
                </div>
            </div>
        </section>
    )
}

export default OnGridScreen
