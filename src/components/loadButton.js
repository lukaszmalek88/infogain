import React from "react"

export default function LoadButton({ handleClick }) {
    return (
        <button
            type="button"
            onClick={handleClick}>
            Load data
        </button>
    )
}