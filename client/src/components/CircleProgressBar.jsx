import React from 'react'
import "../styles/CircleProgressBar.css"

function CircleProgressBar(props) {
    let max = -219.99078369140625;
    let x = Number(props.children) > 0 ? (((100 - Number(props.children)) / 100) * max) : max
    return (
        <div>
            <div className="wrapper-center">
                <div className="progress-bar">
                    <svg className="progress" data-progress="10" x="0px" y="0px" viewBox="0 0 80 80">
                        <path className="track" d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
                        <path className="fill" style={{ strokeDashoffset: x }} d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
                        <text className="value" x="50%" y="55%">{props.children || 0}%</text>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default CircleProgressBar
