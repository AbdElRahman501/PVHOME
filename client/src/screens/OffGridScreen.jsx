import React from 'react'
import { useState } from 'react';


function OffGridScreen() {
 
    const [onSubmit , setOnSubmit] = useState(false)
    function submitHandler(e) {
        e.preventDefault();
        setOnSubmit(true)
    }

    
  return (
    <section id="data-entry">
        <div className="center bk">
            <div className="data-entry-container content">
                <div className="center">
                    <h1>OFF Grid</h1>
                </div>
                <div className="data-entry-box center">
                    <h2><strong>Coming Soon ...</strong></h2>
                </div>
                {/* <form onSubmit={submitHandler}>
                    <div className="data-entry-box center">
                        <div>
                            <label className="data-input"  htmlFor="government">Government
                                <select name="government" id="government">
                                    <option value="cairo">Cairo</option>
                                    <option value="qalubia">Qalubia</option>
                                    <option value="ealexandia">Ealexandia</option>
                                </select>
                            </label>
                            <div className="flex-container">
                                <label className="data-input flex-item"  htmlFor="area">Area
                                    <div>
                                        <input type="number" name="area" id="area" />
                                        <span>m<sup>2</sup></span>
                                    </div>
                                </label>
                                <label className="data-input flex-item"  htmlFor="total-power">Total Power
                                    <div>
                                        <input type="number" name="total-power" id="total-power" />
                                        <span>W</span>
                                    </div>

                                </label>

                            </div>
                        </div>

                    </div>

                    <div className="center">
                        <button className="btn primary">{onSubmit? "Thankes":"Submit"}</button>
                    </div>

                </form> */}
            </div>
        </div>
    </section>
  )
}

export default OffGridScreen
