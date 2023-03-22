import React from 'react'

function SuccessMessage(props) {
    return (
        <div className='grid-container' style={{ width: "400px" }}>
            <h1>{props.children}</h1>
            <img className="big-icon" src="/images/icons8-checkmark-128.png" alt="" />
        </div>
    )
}

export default SuccessMessage
