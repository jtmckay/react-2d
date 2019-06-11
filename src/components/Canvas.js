import React, { useEffect, useRef } from 'react'
import { drawMultilineFactory } from '../drawMultilineFactory'
import { canvasOverlay } from '../canvasOverlay'

const animationRequests = {}

function requestFrame (id, callback) {
    window.cancelAnimationFrame(animationRequests[id])
    animationRequests[id] = window.requestAnimationFrame(callback)
}

export function Canvas ({ id, style, width, height, multilines, fill, imageDataUrl, verticalOverlay, horizontalOverlay }) {
    const settings = {
        fill,
        width,
        height
    }
    const sketchElement = useRef()

    function redraw () {
        sketchElement.current.width = width
        sketchElement.current.height = height
        const context = sketchElement.current.getContext('2d')
        context.clearRect(0, 0, width, height)
        const drawMultiline = drawMultilineFactory(context, settings)
        if (imageDataUrl) {
            const img = new Image()
            img.src = imageDataUrl
            img.onload = () => {
                context.drawImage(img, 0, 0)
            }
        }
        if (multilines) {
            multilines.forEach(drawMultiline)
        }
        if (verticalOverlay) {
            verticalOverlay.forEach(canvasOverlay(drawMultilineFactory(context), true, width, height))
        }
        if (horizontalOverlay) {
            horizontalOverlay.forEach(canvasOverlay(drawMultilineFactory(context), false, width, height))
        }
    }

    useEffect(() => {
        requestFrame(id, redraw)
    }, [width, height, multilines, imageDataUrl, verticalOverlay, horizontalOverlay])

    return (
        <canvas
            ref={sketchElement}
            style={{ overflow: 'hidden', position: 'absolute', top: '0px', left: '0px', width, height, ...style }}>
        </canvas>
    )
}
