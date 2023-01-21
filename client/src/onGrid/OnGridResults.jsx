import React from 'react'

function OnGridResults(props) {
    const { numOfPanels, powerOfSingleModel, changeHandler } = props
    return (
        <div>
            <div>
                <div className="data-entry-box">

                    <p className='center'> number of panels that you need = </p>
                    <h3 className='center'>  {numOfPanels} module of {powerOfSingleModel} W</h3>


                </div>
            </div>

            <div className="center">
                <button className="btn secondary" onClick={changeHandler}>Change</button>
            </div>

        </div>
    )
}

export default OnGridResults
