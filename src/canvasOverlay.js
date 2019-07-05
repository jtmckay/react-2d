import { findRangeSpace, getBounds } from './space'

export function transformXPoint (drawMultiline, multiline, xOffset, yOffset) {
    return function (number) {
        const multilineToDraw = { ...multiline }
        multilineToDraw.points = multilineToDraw.points.map(point => [ point[0] + xOffset + number, point[1] + yOffset ])
        drawMultiline(multilineToDraw)
    }
}

export function transformYPoint (drawMultiline, multiline, xOffset, yOffset) {
    return function (number) {
        const multilineToDraw = { ...multiline }
        multilineToDraw.points = multilineToDraw.points.map(point => [ point[0] + xOffset, point[1] + yOffset + number ])
        drawMultiline(multilineToDraw)
    }
}

export function canvasOverlay (drawMultiline, vertical, width, height) {
    return function (settings) {
        const bounds = getBounds(width, height, settings)
        const {
            alignBottom,
            alignRight,
            itemSize,
            multiline,
            size = vertical ? bounds.height : bounds.width
        } = settings
        const rangeToDisplay = findRangeSpace(0, vertical ? bounds.height : bounds.width, size, itemSize)
        if (!vertical) {
            rangeToDisplay.forEach(transformXPoint(drawMultiline, multiline, bounds.leftEdge, alignBottom ? bounds.bottomEdge : bounds.topEdge))
        } else {
            rangeToDisplay.forEach(transformYPoint(drawMultiline, multiline, alignRight ? bounds.rightEdge : bounds.leftEdge, bounds.topEdge))
        }
    }
}
