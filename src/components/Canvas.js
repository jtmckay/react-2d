import React, { useEffect, useRef } from 'react'
import { drawMultilineFactory } from '../drawMultilineFactory'
import { canvasOverlay } from '../canvasOverlay'

export function Canvas ({ style, width, height, multilines, fill, rawContextCallback, imageDataUrl, verticalOverlay, horizontalOverlay }) {
    const settings = {
        fill,
        width,
        height
    }
    const sketchElement = useRef()

    useEffect(() => {
        sketchElement.current.width = width
        sketchElement.current.height = height
        const context = sketchElement.current.getContext('2d')
        context.clearRect(0, 0, width, height)
        if (imageDataUrl) {
            const img = new Image()
            img.src = imageDataUrl
            img.onload = () => {
                context.drawImage(img, 0, 0)
            }
        }
        if (rawContextCallback) {
            rawContextCallback(context)
        }
        if (multilines) {
            multilines.forEach(drawMultilineFactory(context, settings))
        }
        if (verticalOverlay) {
            verticalOverlay.forEach(canvasOverlay(drawMultilineFactory(context), true, width, height))
        }
        if (horizontalOverlay) {
            horizontalOverlay.forEach(canvasOverlay(drawMultilineFactory(context), false, width, height))
        }
    }, [width, height, multilines, imageDataUrl, verticalOverlay, horizontalOverlay])

    return (
        <canvas
            ref={sketchElement}
            style={{ overflow: 'hidden', position: 'absolute', top: '0px', left: '0px', ...style }}>
        </canvas>
    )
}
