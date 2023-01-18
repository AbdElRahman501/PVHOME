import React from 'react'

function DataEntryScreen() {
  return (
    <section id="data-entry">
        <div className="center bk">
            <div className="data-entry-container content">
                <div className="center">
                    <h1>Data Entry</h1>
                </div>
                <form>
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
                                        <input type="text" name="area" id="area" />
                                        <span>m<sup>2</sup></span>
                                    </div>
                                </label>
                                <label className="data-input flex-item"  htmlFor="total-power">Total Power
                                    <div>
                                        <input type="text" name="total-power" id="total-power" />
                                        <span>W</span>
                                    </div>

                                </label>

                            </div>
                        </div>

                    </div>

                    <div className="center">
                        <button className="btn primary">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    </section>
  )
}

export default DataEntryScreen
