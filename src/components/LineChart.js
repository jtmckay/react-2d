import React from 'react'
import { Canvas } from './Canvas'
import { ComponentOverlay } from './ComponentOverlay'
import { getProjection } from '../getProjection'

export function LineLabel ({ text, left, top }) {
    return <div style={{ position: 'absolute', left, top }}>{text}</div>
}

export function LineChart ({ className, style, width, height, data, componentOverlay, horizontalOverlay, verticalOverlay, labels, labelFirstData = true, area }) {
    const overlaySettings = {
        bottomPadding: 20,
        leftPadding: 20,
        topPadding: 20,
        rightPadding: 20
    }

    const projection = getProjection(data, labelFirstData, width, height, overlaySettings)

    return (
        <div>
            <Canvas
                className={className}
                style={style}
                width={width}
                height={height}
                multilines={projection.multilines}
                horizontalOverlay={horizontalOverlay || [{
                    ...overlaySettings,
                    itemSize: 20,
                    multiline: {
                        points: [
                            [0, 0],
                            [0, 10]
                        ],
                        strokeStyle: 'blue'
                    }
                }]}
                verticalOverlay={verticalOverlay || [{
                    ...overlaySettings,
                    fill: area && { bottomOut: true },
                    itemSize: 20,
                    multiline: {
                        points: [
                            [0, 0],
                            [10, 0]
                        ],
                        strokeStyle: 'green'
                    }
                }]}
            />
            <ComponentOverlay
                {...overlaySettings}
                ItemComponent={LineLabel}
                items={labels || projection.xAxis}
                width={width}
                height={height}
            />
        </div>
    )
}
