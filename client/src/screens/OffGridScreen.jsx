import React, { useState } from 'react'
import OffGridDataEntry from '../SystemsComponents/offGrid/OffGridDataEntry';
import OffGridResults from '../SystemsComponents/offGrid/OffGridResults';
import DropDown from '../components/DropDown';


function OffGridScreen() {

    const [onSubmit, setOnSubmit] = useState(false)
    const [data, setData] = useState({ type: "OFF Grid", safetyFactor: 25, dod: 0.80, autonomyDay: 1})

    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content">
                    <div className="center">
                        <h1>OFF Grid</h1>
                    </div>
                    <DropDown setData={setData} data={data} onSubmit={onSubmit} />
                    {!onSubmit
                        ? <OffGridDataEntry data={data} setData={setData} setOnSubmit={setOnSubmit} />
                        : <OffGridResults data={data} setOnSubmit={setOnSubmit} />
                    }

                </div>
            </div>
        </section>
    )
}

export default OffGridScreen
