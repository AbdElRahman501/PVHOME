import React, { useEffect, useState } from 'react'
import { NumFormatter } from '../actions/Functions'
import AdjustItem from './AdjustItem'

function DropDown(props) {
    const { data, setData, localData, onSubmit } = props
    const [dropDown, setDropDown] = useState(false)


    useEffect(() => {
        if ((data?.coordinates || data?.error) && (localData?.city !== data?.city)) {
            setDropDown(true)
        }

    }, [data?.coordinates, data?.error])

    useEffect(() => {
        if (data) {
            setData(pv => ({ ...pv, peakSonHours: (localData?.city === data?.city) ? data.peakSonHours : data?.dailyIrradiation / 1000, loss: 0.85, topResults: 3 }))
        }
    }, [data?.dailyIrradiation])

    return (
        <>
            {data?.error && <div className={dropDown ? 'dropdown info active' : 'dropdown info'} >
                <label className='dropdown-toggle' htmlFor="dropDown"
                    onClick={() => setDropDown(p => p ? false : true)}>
                    <i className='fa fa-angle-down'></i>
                </label>
                <p className='center'>{data?.error?.message}</p>
            </div>}

            {data?.coordinates && <div className={dropDown ? 'dropdown info active' : 'dropdown info'} >
                <label className='dropdown-toggle' htmlFor="dropDown"
                    onClick={() => setDropDown(p => p ? false : true)}>
                    <i className='fa fa-angle-down'></i>
                </label>
                <p className='center'>{data?.government}-{data?.city}</p>
                <p className='center'><strong></strong> lat {data?.coordinates?.lat?.toFixed(2)} - lon {data?.coordinates?.lon?.toFixed(2)}</p>
                <AdjustItem data={data} setData={setData} onSubmit={onSubmit} rang={[1, 10]} fixed={true} >top Results : topResults : #</AdjustItem>

                <hr />
                <AdjustItem data={data} setData={setData} onSubmit={onSubmit} >tilt angle : tiltAngle</AdjustItem>
                <AdjustItem data={data} setData={setData} onSubmit={onSubmit} >shadow angle : elevationAngle</AdjustItem>
                <AdjustItem data={data} setData={setData} onSubmit={onSubmit} rang={[1, 8]} >Peak Sun Hours : peakSonHours : H </AdjustItem>
                <hr />
                <AdjustItem data={data} setData={setData} onSubmit={onSubmit} rang={[0, 100]} fixed={true} >Safety Factor : safetyFactor : %</AdjustItem>

                {(data.type === "OFF Grid" || data?.type === "Hybrid") && <>
                    <AdjustItem data={data} setData={setData} onSubmit={onSubmit} toPercentage={true} rang={[10, 100]} fixed={true} >Depth of Discharge : dod</AdjustItem>
                    <AdjustItem data={data} setData={setData} onSubmit={onSubmit} rang={[0.1, 10]} >Autonomy Day : autonomyDay : D</AdjustItem>
                </>}
                {(data?.totalPower || data?.totalEnergy) && <hr />}
                {data?.totalPower && <p className='flex-container'><strong>Total Power : </strong>  {NumFormatter(data.totalPower * (1 + (data?.safetyFactor / 100)), 2)} W</p>}
                {data?.totalEnergy && <p className='flex-container'><strong>Total Energy : </strong> {NumFormatter(data.totalEnergy, 2)} Whr</p>}
            </div>}
            {dropDown &&
                <div className='black-back' onClick={() => setDropDown(false)}></div>
            }
        </>

    )
}

export default DropDown
