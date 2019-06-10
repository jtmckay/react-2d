import React from 'react'
import { Canvas } from './Canvas'
import { ComponentOverlay } from './ComponentOverlay'
import { getConfiguration } from '../getConfiguration'

export function LineLabel ({ text, xOffset, yOffset }) {
    return <div style={{ position: 'absolute', left: xOffset, top: yOffset }}>{text}</div>
}

export function LineChart ({ className, style, width, height, data, verticalOverlay, horizontalOverlay, labels }) {
    const componentOverlaySettings = {
        xOffset: 50,
        yOffset: 50,
        size: 400,
        ItemComponent: LineLabel
    }

    const configuration = getConfiguration(data, width, height, [
        {
            id: 'multiline',
            size: 1,
            startIndex: labels ? 0 : 1
        },
        {
            id: 'xAxis',
            size: componentOverlaySettings.size,
            dataIndex: 0
        },
        {
            id: 'yAxis',
            size: 50,
            startIndex: labels ? 0 : 1
        }
    ])

    return (
        <div>
            <Canvas
                className={className}
                style={style}
                width={width}
                height={height}
                fill={{ bottomOut: true }}
                multilines={configuration.multilines}
                verticalOverlay={verticalOverlay || [{
                    itemSize: 20,
                    multiline: {
                        points: [
                            [0, 0],
                            [10, 0]
                        ],
                        strokeStyle: 'green'
                    }
                }]}
                horizontalOverlay={horizontalOverlay || [{
                    yOffset: -10,
                    itemSize: 20,
                    multiline: {
                        points: [
                            [0, 0],
                            [0, 10]
                        ],
                        strokeStyle: 'blue'
                    }
                }]}
            />
            <ComponentOverlay vertical items={labels || configuration.xAxis} {...componentOverlaySettings} />
        </div>
    )
}
