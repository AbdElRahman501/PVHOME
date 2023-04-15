import React, { useEffect, useState } from 'react'

function DropDown(props) {
    const { data } = props
    const [dropDown, setDropDown] = useState(false)
    useEffect(() => {
        if (data?.coordinates) {
            setDropDown(true)
        }

    }, [data?.coordinates])
    return (
        <>
            {data?.coordinates && <div className={dropDown ? 'dropdown info active' : 'dropdown info'} >
                <label className='dropdown-toggle' htmlFor="dropDown"
                    onClick={() => setDropDown(p => p ? false : true)}>
                    <i className='fa fa-angle-down'></i>
                </label>

                <p className='center'>{data?.government}-{data?.city}</p>
                <p className='center'><strong></strong> lat {data?.coordinates.lat?.toFixed(2)} - lon {data?.coordinates.lon?.toFixed(2)}</p>
                <p className='flex-container'><strong>tilt angle :</strong>  {data?.coordinates.tiltAngle?.toFixed(2)}</p>
                <p className='flex-container'><strong>shadow angle : </strong> {data?.coordinates.elevationAngle?.toFixed(2)}</p>
                <p className='flex-container'><strong>daily irradiance : </strong> {data?.dailyIrradiation?.toFixed(2)} W/m2</p>
                <p className='flex-container'><strong>Peak Sun Hours :</strong>  {(data?.dailyIrradiation / 1000)?.toFixed(2)} H</p>
                <p className='flex-container'><strong>Safety Factor :</strong>  {data?.safetyFactor}</p>
                {data.type === "OFF Grid" && <>
                    <p className='flex-container'> <strong>Depth of Discharge: </strong> {data.dod}</p>
                    <p className='flex-container'> <strong>Autonomy Day: </strong> {data.autonomyDay}</p>
                </>}
            </div>}
            {dropDown &&
                <div className='black-back' onClick={() => setDropDown(false)}></div>
            }
        </>

    )
}

export default DropDown
