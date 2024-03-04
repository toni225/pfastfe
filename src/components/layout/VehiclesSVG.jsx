import React, { Component } from 'react'

export class VehiclesSVG extends Component {
  render() {
    return (
        <div className="w-[100%] flex rounded-md">
            <div className="w-[50%] flex flex-col justify-between items-center">
            <svg class="" xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 0 24 24" width="64px" fill="#E7F5F5">
                <defs>
                    <filter id="shadow">
                    <feDropShadow dx="-1" dy="2" stdDeviation="0.1" flood-color="#262341" flood-opacity="0.5" />
                    </filter>
                </defs>
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" filter="url(#shadow)" />
                <circle cx="7.5" cy="14.5" r="1.5" />
                <circle cx="16.5" cy="14.5" r="1.5" />
            </svg>
                <div>P 50/hr</div>
            </div>
            <div className="w-[50%] flex flex-col justify-between items-center">
                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="64px" viewBox="0 0 20 20" width="64px" fill="#E7F5F5"><path strokeWidth="0.3" d="M14.5,9c-0.16,0-0.31,0.02-0.45,0.05L13,8h1.5V6.5l-2,1L11,6H9.01v1h1.58l1,1H9.5L7,9L6,8H3v1h2.5C4.12,9,3,10.12,3,11.5 C3,12.88,4.12,14,5.5,14c1.23,0,2.24-0.88,2.45-2.05L9,13h1.5l2.03-4.06l0.52,0.52C12.42,9.92,12,10.66,12,11.5 c0,1.38,1.12,2.5,2.5,2.5s2.5-1.12,2.5-2.5C17,10.12,15.88,9,14.5,9z M5.5,13C4.67,13,4,12.33,4,11.5S4.67,10,5.5,10 S7,10.67,7,11.5S6.33,13,5.5,13z M14.5,13c-0.83,0-1.5-0.67-1.5-1.5s0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S15.33,13,14.5,13z" filter="url(#shadow2)"/>
                <defs>
                    <filter id="shadow2">
                    <feDropShadow dx="-1" dy="1" stdDeviation="0.1" flood-color="#262341" flood-opacity="0.5" />
                    </filter>
                </defs></svg>
                <div>P 20/hr</div>
            </div>
        </div>
    )
  }
}

export default VehiclesSVG