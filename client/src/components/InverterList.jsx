import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { InvertersList } from '../actions/DevicesList';
import AddInverter from './AddInverter';

export default function Inverters() {
    const { search } = useLocation();
    const id = new URLSearchParams(search).get('id')

    const types = ["ALL", "On Grid", "OFF Grid", "Hybrid"]
    const [chosen, setChosen] = useState("ALL")

    const [{ inverters, loading, error }, setInverter] = useState({})
    const [selectedInverter, setSelectedInverter] = useState()

    const [successMessage, setSuccessMessage] = useState("")

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
            setSuccessMessage()
        }
    }, [id])

    useEffect(() => {
        if (successMessage) {
            InvertersList(setInverter)
        }
    }, [successMessage])
    return (
        selectedInverter
            ?
            <AddInverter selectedInverter={selectedInverter} successMessage={successMessage} setSuccessMessage={setSuccessMessage} />
            :
            <div className='data-entry-box center '>
                <ul className='devices' >
                    {loading && <div className='center grid-item'><i style={{ fontSize: "60px" }} className=" fa fa-spinner fa-pulse"></i></div>}
                    {error && <div className='center grid-item'>{error.message}</div>}
                    {inverters?.length > 0 && !selectedInverter && <div className='center options'>{types.map((x, i) => <h2 key={i} onClick={() => setChosen(x)} className={x === chosen ? "chosen choice" : "choice"}>{x}</h2>)} </div>}
                    {inverters?.length > 0 && !selectedInverter && inverters.filter(x => chosen === "ALL" ? true : x.type === chosen).sort((a, b) => a.power - b.power).map((inverter) => <div key={inverter._id}>
                        <li ><Link to={"/Devices?show=Inverter&id=" + inverter._id}> {inverter.name} <i className='fa fa-angle-down'></i></Link></li>
                        <hr />
                    </div>)}
                </ul>

            </div>
    )
}


