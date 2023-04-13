import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Batteries from '../components/BatteriesList';
import Inverters from '../components/InverterList';
import SolarPanels from '../components/SolarPanelsList';

function DeviceScreen() {
    let navigate = useNavigate();
    const { search } = useLocation();
    const device = new URLSearchParams(search).get('show')
    const id = new URLSearchParams(search).get('id')
    
    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content relative">
                    {device && <div className='back top'> <button type='button' onClick={() => navigate(-1)} ><i className='fa fa-angle-left'></i></button>  </div>}

                    <div className="center">
                        <h1> {device ? device : "Devices"}</h1>
                    </div>
                    {!device
                        &&
                        <div className='data-entry-box center '>
                            <ul className='devices' >
                                <li><Link to="/Devices?show=Solar Panel"> Solar Panel <i className='fa fa-angle-down'></i></Link></li>
                                <hr />
                                <li><Link to="/Devices?show=Battery">Battery<i className='fa fa-angle-down'></i></Link></li>
                                <hr />
                                <li><Link to="/Devices?show=Inverter">Inverter<i className='fa fa-angle-down'></i></Link></li>
                                <hr />
                                {/* <li><Link to="/Show Device?show=Solar Charger">Solar Charger<i className='fa fa-angle-down'></i></Link></li>
                                <hr /> */}
                            </ul>
                        </div>}

                    {device === "Inverter" && <Inverters />}
                    {device === "Solar Panel" && <SolarPanels />}
                    {/* {device === "Solar Charger" && <ShowSolarPanel />} */}
                    {device === "Battery" && <Batteries />}
                    {!id &&device &&
                        <div className="center">
                            <button className="btn primary" onClick={() => navigate("/Add Device?add=" + device)} >Add New</button>
                        </div>
                    }
                </div>
            </div>
        </section >
    )
}

export default DeviceScreen
