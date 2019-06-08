export function getFormatter (max) {
    const absoluteValue = Math.abs(max)
    if (absoluteValue > 10000000000) {
        return numberB
    } else if (absoluteValue > 10000000) {
        return numberM
    } else if (absoluteValue > 10000) {
        return numberK
    } else {
        return number
    }
}

export function numberWithCommas (number) {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function number (number, { decimalPlaces = 2, noComma, prefix = '' } = {}) {
    if (noComma) {
        return `${prefix}${numberWithCommas(number.toFixed(decimalPlaces))}`
    } else {
        return `${prefix}${numberWithCommas(number.toFixed(decimalPlaces))}`
    }
}

export function numberK (number, { decimalPlaces = 2, noComma, prefix = '' } = {}) {
    if (noComma) {
        return `${prefix}${numberWithCommas((number / 1000).toFixed(decimalPlaces))}`
    } else {
        return `${prefix}${numberWithCommas((number / 1000).toFixed(decimalPlaces))}`
    }
}

export function numberM (number, { decimalPlaces = 2, noComma, prefix = '' } = {}) {
    if (noComma) {
        return `${prefix}${numberWithCommas((number / 1000000).toFixed(decimalPlaces))}`
    } else {
        return `${prefix}${numberWithCommas((number / 1000000).toFixed(decimalPlaces))}`
    }
}

export function numberB (number, { decimalPlaces = 2, noComma, prefix = '' } = {}) {
    if (noComma) {
        return `${prefix}${numberWithCommas((number / 1000000000).toFixed(decimalPlaces))}`
    } else {
        return `${prefix}${numberWithCommas((number / 1000000000).toFixed(decimalPlaces))}`
    }
}
