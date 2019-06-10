import withResponsiveSize from './components/responsiveHOC'
import { Canvas } from './components/Canvas'
import { ComponentOverlay } from './components/ComponentOverlay'
import { drawMultilineFactory } from './drawMultilineFactory'
import { findIndexSpace, findRangeSpace } from './space'
import { getFormatter, numberWithCommas } from './round'
import { LineChart } from './components/LineChart'

export const RLineChart = withResponsiveSize(LineChart)

export const RCanvas = withResponsiveSize(Canvas)

export {
    ComponentOverlay,
    drawMultilineFactory,
    findIndexSpace,
    findRangeSpace,
    getFormatter,
    numberWithCommas
}
