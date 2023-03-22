import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddBattery from '../components/AddBattery';
import AddInverter from '../components/AddInverter'
import AddSolarCharger from '../components/AddSolarCharger';
import AddSolarPanel from '../components/AddSolarPanel';

function AddDevice() {
    let navigate = useNavigate();
    const { search } = useLocation();
    const device = new URLSearchParams(search).get('add')
    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content relative">
                {device && <div className='back top'> <button type='button' onClick={() => navigate(-1)} ><i className='fa fa-angle-left'></i></button>  </div>}

                    <div className="center">
                        <h1>Add {device}</h1>
                    </div>
                    {!device
                        &&
                        <div className='data-entry-box center '>
                            <ul className='devices' >
                                <li><Link to="/Add Device?add=Solar Panel"> Solar Panel <i className="fa fa-plus"></i></Link></li>
                                <hr />
                                <li><Link to="/Add Device?add=Battery">Battery<i className="fa fa-plus"></i></Link></li>
                                <hr />
                                <li><Link to="/Add Device?add=Inverter">Inverter<i className="fa fa-plus"></i></Link></li>
                                <hr />
                                <li><Link to="/Add Device?add=Solar Charger">Solar Charger<i className="fa fa-plus"></i></Link></li>
                                <hr />
                            </ul>
                        </div>}

                    {device === "Inverter" && <AddInverter />}
                    {device === "Solar Panel" && <AddSolarPanel />}
                    {device === "Solar Charger" && <AddSolarCharger />}
                    {device === "Battery" && <AddBattery />}

                </div>
            </div>
        </section >

    )
}

export default AddDevice
