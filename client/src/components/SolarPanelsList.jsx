import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { panelsList } from '../actions/DevicesList';
import AddSolarPanel from './AddSolarPanel';

export default function SolarPanels() {
    const { search } = useLocation();
    const id = new URLSearchParams(search).get('id')

    const [{ panels, loading, error }, setPanels] = useState({})
    const [selectedSolarPanel, setSelectedSolarPanel] = useState()

    useEffect(() => {
        if (!panels && !loading) {
            panelsList(setPanels)
        }
    }, [panels, id])
    useEffect(() => {
        if (id && panels) {
            setSelectedSolarPanel(panels.find(x => x._id === id));
        } else {
            setSelectedSolarPanel()
        }
    }, [id])


    return (
        selectedSolarPanel
            ?
            <AddSolarPanel selectedSolarPanel={selectedSolarPanel} />
            :
            <div className='data-entry-box center '>
                <ul className='devices' >
                    {loading && <div className='center grid-item'><i style={{ fontSize: "60px" }} className=" fa fa-spinner fa-pulse"></i></div>}
                    {error && <div className='center grid-item'>{error.message}</div>}
                    {panels?.length > 0 && !selectedSolarPanel && panels.map((panel) => <div key={panel._id}>
                        <li ><Link to={"/Devices?show=Solar Panel&id=" + panel._id}> {panel.name} <i className='fa fa-angle-down'></i></Link></li>
                        <hr />
                    </div>)}
                </ul>

            </div>
    )
}


