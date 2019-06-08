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
