import React from 'react'
import { useState } from 'react';
import DropDown from '../components/DropDown';
import HybridDataEntry from '../SystemsComponents/hybrid/HybridDataEntry';
import HybridResults from '../SystemsComponents/hybrid/HybridResults';


function HybridScreen() {

    const [onSubmit, setOnSubmit] = useState(false)
    const [data, setData] = useState({ type: "OFF Grid", safetyFactor: 25, dod: 0.8, autonomyDay: 1 })
    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content">
                    <div className="center">
                        <h1>Hybrid</h1>
                    </div>
                    <DropDown setData={setData} data={data} onSubmit={onSubmit}  />
                    {!onSubmit
                        ? <HybridDataEntry data={data} setData={setData} setOnSubmit={setOnSubmit} />
                        : <HybridResults data={data} setOnSubmit={setOnSubmit} />
                    }

                </div>
            </div>
        </section>
    )
}

export default HybridScreen
