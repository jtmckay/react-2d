export function findIndexSpace (itemsToSpace, availableSpace, itemSpaceRequired) {
    return findRangeSpace(0, itemsToSpace.length - 1, availableSpace, itemSpaceRequired, true)
}

export function findRangeSpace (min, max, availableSpace, itemSpaceRequired, index = false) {
    const range = max - min
    const res = []
    const placeCount = Math.floor(availableSpace / itemSpaceRequired)
    const ratio = range / (placeCount - 1)
    if (ratio < 1 && index) {
        for (let i = 0; i <= range; i++) {
            res.push(i)
        }
    } else {
        for (let i = 0; i < placeCount; i++) {
            res.push(Math.round(i * ratio))
        }
    }
    return res
}

export function getBounds (originalWidth, originalHeight, overlaySettings) {
    const width = originalWidth - (overlaySettings.leftPadding || 0) - (overlaySettings.rightPadding || 0)
    const height = originalHeight - (overlaySettings.topPadding || 0) - (overlaySettings.bottomPadding || 0)
    return {
        bottomEdge: originalHeight - overlaySettings.bottomPadding || 0,
        leftEdge: overlaySettings.leftPadding || 0,
        rightEdge: originalWidth - overlaySettings.rightPadding || 0,
        topEdge: overlaySettings.topPadding || 0,
        width,
        height
    }
}
