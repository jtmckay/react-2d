import React from 'react'
import { findIndexSpace, getBounds } from '../space'

export function ComponentOverlay ({ vertical, alignRight, alignBottom, width, height, bottomPadding, leftPadding, rightPadding, topPadding, items, itemSize, ItemComponent }) {
    const bounds = getBounds(width, height, { bottomPadding, leftPadding, rightPadding, topPadding })
    const size = vertical ? bounds.height : bounds.width
    const itemIndicesToDisplay = findIndexSpace(items, size, itemSize)
    return <div style={{ position: 'absolute' }}>
        {itemIndicesToDisplay.map(i => <ItemComponent
            key={i}
            {...items[i]}
            left={!alignRight && !vertical ? bounds.leftEdge + i * itemSize : bounds.leftEdge}
            right={alignRight && !vertical ? bounds.leftEdge + i * itemSize : bounds.rightEdge}
            top={!alignBottom && vertical ? bounds.topEdge + i * itemSize : bounds.topEdge}
            bottom={alignBottom && vertical ? bounds.topEdge + i * itemSize : bounds.bottomEdge}
        />)}
    </div>
}
