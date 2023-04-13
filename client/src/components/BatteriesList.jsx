import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { BatteriesList } from '../actions/DevicesList';
import AddBattery from './AddBattery';

export default function Batteries() {
    const { search } = useLocation();
    const id = new URLSearchParams(search).get('id')

    const [{ batteries, loading, error }, setBatteries] = useState({})
    const [selectedBattery, setSelectedBattery] = useState()

    const [updatedBattery, setUpdateBattery] = useState({});
    const [successMessage, setSuccessMessage] = useState(false)

    useEffect(() => {
        if (!batteries && !loading) {
            BatteriesList(setBatteries)
        }
    }, [])
    useEffect(() => {
        if (id && batteries) {
            setSelectedBattery(batteries.find(x => x._id === id));
        } else {
            setSelectedBattery()
            setSuccessMessage()
        }
    }, [id])

    useEffect(() => {
        if (updatedBattery.success) {
            BatteriesList(setBatteries)
            setSuccessMessage(updatedBattery.success)
            setUpdateBattery({})
        }
    }, [updatedBattery])

    return (
        selectedBattery
            ?
            <AddBattery selectedBattery={selectedBattery} successMessage={successMessage} updatedBattery={updatedBattery} setUpdateBattery={setUpdateBattery} />
            :
            <div className='data-entry-box center '>
                <ul className='devices' >
                    {loading && <div className='center grid-item'><i style={{ fontSize: "60px" }} className=" fa fa-spinner fa-pulse"></i></div>}
                    {error && <div className='center grid-item'>{error.message}</div>}
                    {batteries?.length > 0 && !selectedBattery && batteries.sort((a,b) => a.ampereHour-b.ampereHour ).map((battery) => <div key={battery._id}>
                        <li ><Link to={"/Devices?show=Battery&id=" + battery._id}> {battery.name} <i className='fa fa-angle-down'></i></Link></li>
                        <hr />
                    </div>)}
                </ul>

            </div>
    )
}


