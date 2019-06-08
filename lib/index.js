import React, { useEffect, useRef } from 'react'
import { drawArea, drawLine } from './canvas'
import { findIndexSpace } from './space'

export function RCanvas ({ className, style, width, height, lines, area, shape }) {
    const sketchElement = useRef()

    useEffect(() => {
        const context = sketchElement.current.getContext('2d')
        context.clearRect(0, 0, width, height)
        if (lines && area) {
            lines.forEach(drawArea(context, area, width, height))
        } else if (lines && shape) {
            lines.forEach(drawArea(context, shape))
        } else if (lines) {
            lines.forEach(drawLine(context))
        }
    }, [lines])

    return (
        <canvas
            ref={sketchElement}
            className={className}
            style={style}
            width={width}
            height={height}>
        </canvas>
    )
}

export function AbsoluteItems ({ xOffset, yOffset, vertical, size, items, itemSize, ItemComponent }) {
    const itemIndicesToDisplay = findIndexSpace(items, size, itemSize)
    return <div style={{ position: 'absolute' }}>
        {itemIndicesToDisplay.map(i => <ItemComponent key={i} {...items[i]} xOffset={vertical ? xOffset : xOffset + i * itemSize} yOffset={vertical ? yOffset + i * itemSize : yOffset} />)}
    </div>
}

export function Label ({ text, xOffset, yOffset }) {
    return <div style={{ position: 'absolute', left: xOffset, top: yOffset }}>{text}</div>
}

export function RLine ({ className, style, width, height, data }) {

}

export {
    drawArea,
    drawLine
}
