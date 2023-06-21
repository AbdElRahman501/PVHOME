import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { SolarChargersList } from '../actions/DevicesList';
import AddSolarCharger from './AddSolarCharger';

export default function SolarChargers() {
    const { search } = useLocation();
    const id = new URLSearchParams(search).get('id')

    const [{ chargers, loading, error }, setChargers] = useState({})
    const [selectedCharger, setSelectedCharger] = useState()

    const [successMessage, setSuccessMessage] = useState(false)

    useEffect(() => {
        if (!chargers && !loading) {
            SolarChargersList(setChargers)
        }
    }, [])
    useEffect(() => {
        if (id && chargers) {
            setSelectedCharger(chargers.find(x => x._id === id));
        } else {
            setSelectedCharger()
            setSuccessMessage()
        }
    }, [id])

    useEffect(() => {
        if (successMessage) {
            SolarChargersList(setChargers)
        }
    }, [successMessage])

    return (
        selectedCharger
            ?
            <AddSolarCharger selectedCharger={selectedCharger} successMessage={successMessage} setSuccessMessage={setSuccessMessage} />
            :
            <div className='data-entry-box center '>
                <ul className='devices' >
                    {loading && <div className='center grid-item'><i style={{ fontSize: "60px" }} className=" fa fa-spinner fa-pulse"></i></div>}
                    {error && <div className='center grid-item'>{error.message}</div>}
                    {chargers?.length > 0 && !selectedCharger && chargers.sort((a, b) => a.rateCurrent - b.rateCurrent).map((charger) => <div key={charger._id}>
                        <li ><Link to={"/Devices?show=Solar Charger&id=" + charger._id}> {charger.name} <i className='fa fa-angle-down'></i></Link></li>
                        <hr />
                    </div>)}
                </ul>

            </div>
    )
}


