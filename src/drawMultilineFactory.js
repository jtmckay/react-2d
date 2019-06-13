export function drawMultilineFactory (context, settings = {}) {
    const {
        // width,
        height
    } = settings

    return function ({ points, strokeStyle, lineWidth, penType, fill }) {
        context.beginPath()
        points.forEach(lineTo(context))

        if (!fill || !fill.noStroke) {
            context.strokeStyle = strokeStyle
            context.lineWidth = lineWidth || 2
            context.penType = penType || 'round'
            context.stroke()
        }
        if (fill && fill.bottomOut) {
            context.lineTo(points[points.length - 1][0], height)
            context.lineTo(0, height)
        }
        if (fill) {
            const {
                colorStops = [
                    { offset: 0, color: 'black' },
                    { offset: 1, color: 'white' }
                ],
                x0 = 0,
                y0 = 0,
                x1 = 0,
                y1 = height
            } = fill

            var gradient = height && context.createLinearGradient(x0, y0, x1, y1)
            if (height) {
                colorStops.forEach(colorStop => {
                    gradient.addColorStop(colorStop.offset, colorStop.color)
                })
            }
            context.fillStyle = gradient
            context.fill()
        }
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
