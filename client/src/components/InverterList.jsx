import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { InvertersList} from '../actions/DevicesList';
import AddInverter from './AddInverter';

export default function Inverters() {
    const { search } = useLocation();
    const id = new URLSearchParams(search).get('id')

    const [{ inverters, loading, error }, setInverter] = useState({})
    const [selectedInverter , setSelectedInverter] = useState()

    useEffect(() => {
        if (!inverters && !loading) {
            InvertersList(setInverter)
        }
    }, [])
    useEffect(() => {
        if (id && inverters) {
            setSelectedInverter(inverters.find(x => x._id === id));
        } else {
            setSelectedInverter()
        }
    }, [id])

    return (
        selectedInverter 
            ?
            <AddInverter selectedInverter ={selectedInverter } />
            :
            <div className='data-entry-box center '>
                <ul className='devices' >
                    {loading && <div className='center grid-item'><i style={{ fontSize: "60px" }} className=" fa fa-spinner fa-pulse"></i></div>}
                    {error && <div className='center grid-item'>{error.message}</div>}
                    {inverters?.length > 0 && !selectedInverter  && inverters.map((inverter) => <div key={inverter._id}>
                        <li ><Link to={"/Devices?show=Inverter&id=" + inverter._id}> {inverter.name} <i className='fa fa-angle-down'></i></Link></li>
                        <hr />
                    </div>)}
                </ul>
                
            </div>
    )
}


