export function drawLine (context) {
    return function ({ points, color, lineWidth, penType }) {
        context.beginPath()
        points.forEach(lineTo(context))
        context.moveTo(points[0][0], points[0][1])
        context.lineWidth = lineWidth || 1
        context.penType = penType || 'round'
        context.stroke()
    }
}

export function drawArea (context, settings, width, height) {
    const {
        colorStops = [
            { offset: 0, color: 'black' },
            { offset: 1, color: 'white' }
        ],
        x0 = 0,
        y0 = 0,
        x1 = 0,
        y1 = height
    } = settings || {}
    const fill = width && height
    var gradient = context.createLinearGradient(x0, y0, x1, y1)
    colorStops.forEach(colorStop => {
        gradient.addColorStop(colorStop.offset, colorStop.color)
    })

    return function ({ points, color, lineWidth, penType }) {
        context.beginPath()
        points.forEach(lineTo(context))
        if (fill) {
            context.lineTo(width, height)
            context.lineTo(0, height)
        }
        context.fillStyle = gradient
        context.fill()
    }
}

function lineTo (context) {
    return function (point, index) {
        if (index === 0) {
            context.moveTo(point[0], point[1])
        } else {
            context.lineTo(point[0], point[1])
        }
    }
}
