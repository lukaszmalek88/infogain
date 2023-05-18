import React from "react"
import { useCalculateLoyaltyPoints } from "../hooks/useCalculateLoyaltyPoints"


export default function DataTable(data) {
    const { summedPoints } = useCalculateLoyaltyPoints(data)

    return (
        <div className="grid-container">
            <div className="grid-row">
                {Object.keys(summedPoints[0]).map(key => (
                    <div className="grid-item" key={key}>{key}</div>
                ))}
            </div>
            {summedPoints.map((item, index) => (
                <div className="grid-row" key={index}>
                    <span className="grid-item">{item.customerId}</span>
                    <span className="grid-item">{item.name}</span>
                    <span className="grid-item">{item.totalPoinst}</span>
                    <span className="grid-item">{item.threeMonthsBack}</span>
                    <span className="grid-item">{item.twoMonthsBack}</span>
                    <span className="grid-item">{item.monthBack}</span>
                </div>
            ))}
        </div>
    )
}