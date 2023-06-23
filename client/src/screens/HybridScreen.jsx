import React from 'react'
import { useState } from 'react';
import DropDown from '../components/DropDown';
import HybridDataEntry from '../SystemsComponents/hybrid/HybridDataEntry';
import HybridResults from '../SystemsComponents/hybrid/HybridResults';


function HybridScreen() {

    const [onSubmit, setOnSubmit] = useState(false)
    const [data, setData] = useState({ type: "Hybrid", safetyFactor: 25, dod: 0.85, autonomyDay: 1 })


    let localData = JSON.parse((localStorage.getItem("DATA-" + data.type)))

    if (localData && localData.type === data.type && !data.government) {
        setData(localData)
    }
    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content">
                    <div className="center">
                        <h1>Hybrid</h1>
                    </div>
                    <DropDown setData={setData} localData={localData} data={data} onSubmit={onSubmit} />
                    {!onSubmit
                        ? <HybridDataEntry data={data} localData={localData} setData={setData} setOnSubmit={setOnSubmit} />
                        : <HybridResults data={data} setOnSubmit={setOnSubmit} />
                    }

                </div>
            </div>
        </section>
    )
}

export default HybridScreen
