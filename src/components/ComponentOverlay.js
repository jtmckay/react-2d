import React from 'react'
import { findIndexSpace } from '../space'

export function ComponentOverlay ({ xOffset, yOffset, vertical, size, items, itemSize, ItemComponent }) {
    const itemIndicesToDisplay = findIndexSpace(items, size, itemSize)
    return <div style={{ position: 'absolute' }}>
        {itemIndicesToDisplay.map(i => <ItemComponent
            key={i}
            {...items[i]}
            xOffset={vertical ? xOffset : xOffset + i * itemSize}
            yOffset={vertical ? yOffset + i * itemSize : yOffset} />)}
    </div>
}
