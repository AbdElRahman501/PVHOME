import React from 'react'
import { Link } from 'react-router-dom'

function SystemsScreen() {
    return (
        <section id="design">
            <div className="center bk">
                <div className="grid-container">
                    <div className="grid-item blur-box">
                        <div className="center">
                            <img className="big-icon" src="images/image4.png" alt=""   />
                        </div>
                        <div className="title">
                            <h2>On Grid</h2>
                            <div className="content">
                                <strong>Advantages</strong>
                                <ul>
                                    <li>Low Cost</li>
                                    <li>Easy maintenance</li>
                                    <li>Synchronize with other sources of power</li>
                                    <li>Better ROI (Return On Investment)</li>
                                </ul>
                                <strong>Disadvantages</strong>
                                <ul>
                                    <li>Doesn't generate electricity during Link blackout</li>
                                    <li>Doesn't Work At Night</li>
                                </ul>
                            </div>
                            <div className="center"><Link to="/dataEntry" className="none"><button
                                className="btn secondary">Select</button></Link></div>
                        </div>
                    </div>
                    <div className="grid-item blur-box">
                        <div className="center">
                            <img className="big-icon" src="images/image5.png" alt=""   />
                        </div>
                        <div className="title">
                            <h2>Off Grid</h2>
                            <div className="content">
                                <strong>Advantages</strong>
                                <ul>
                                    <li>No more relying with the Grid</li>
                                    <li>No more Power Interruptions</li>
                                    <li>No more Monthly electricity bills</li>
                                    <li>Ideal for Remote Areas</li>
                                </ul>
                                <strong>Disadvantages</strong>
                                <ul>
                                    <li>Higher Initial Cost.</li>
                                    <li>Limited Solar Energy Storage.</li>
                                    <li>Battery Life Span is up to 10-15 years only compared</li>
                                </ul>
                            </div>
                            <div className="center"><Link to="/dataEntry" className="none"><button
                                className="btn secondary">Select</button></Link></div>
                        </div>
                    </div>
                    <div className="grid-item blur-box">
                        <div className="center">
                            <img className="big-icon" src="images/Group1.png" alt=""   />
                        </div>
                        <div className="title">
                            <h2>Hybrid</h2>
                            <div className="content">
                                <strong>Advantages</strong>
                                <ul>
                                    <li>Energy Independence up to 95%.</li>
                                    <li>No more Power Interruptions.</li>
                                    <li>High Efficiency.</li>
                                    <li>Low Maintenance</li>
                                </ul>
                                <strong>Disadvantages</strong>
                                <ul>
                                    <li>Higher Initial Cost than On Grid</li>
                                    <li>Limited Solar Energy Storage.</li>
                                    <li>Battery Life Span is up to 10-15 years only compared</li>
                                </ul>
                            </div>
                            <div className="center"><Link to="/dataEntry" className="none"><button
                                className="btn secondary">Select</button></Link></div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default SystemsScreen
