import { findRangeSpace } from './space'

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
        const {
            xOffset = 0,
            yOffset = 0
        } = settings
        const fixedXOffset = xOffset < 0 ? width + xOffset : xOffset
        const fixedYOffset = yOffset < 0 ? height + yOffset : yOffset
        const {
            size = vertical ? height - fixedYOffset : width - fixedXOffset,
            itemSize,
            multiline
        } = settings
        const min = vertical ? fixedYOffset : fixedXOffset
        const max = vertical ? fixedYOffset + size : fixedXOffset + size
        const rangeToDisplay = findRangeSpace(min, max, size, itemSize)
        if (vertical) {
            rangeToDisplay.forEach(transformYPoint(drawMultiline, multiline, fixedXOffset, fixedYOffset))
        } else {
            rangeToDisplay.forEach(transformXPoint(drawMultiline, multiline, fixedXOffset, fixedYOffset))
        }
    }
}
