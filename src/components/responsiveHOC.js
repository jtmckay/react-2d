import React, { useState, useEffect, useRef } from 'react'

export default function withResponsiveSize (Component) {
    return function wrappedComponent (props) {
        const {
            width,
            height,
            minHeight = 100,
            minWidth = 200,
            maxWidth,
            maxHeight = 500,
            ratio = 1.618
        } = props
        const container = useRef()

        const [ widthState, setWidthState ] = useState(width || minWidth)
        const [ heightState, setHeightState ] = useState(1000)

        useEffect(() => {
            function handleResize () {
                let widthToUse = width || container.current.clientWidth
                if (widthToUse < minWidth) {
                    widthToUse = minWidth
                }
                if (widthToUse > maxWidth) {
                    widthToUse = maxWidth
                }
                setWidthState(widthToUse)
                let heightToUse = height
                if (!heightToUse) {
                    heightToUse = widthToUse / ratio
                }
                if (heightToUse < minHeight) {
                    heightToUse = minHeight
                }
                if (heightToUse > maxHeight) {
                    heightToUse = maxHeight
                }
                setHeightState(heightToUse)
            }

            let lastCall
            function frameResize () {
                window.cancelAnimationFrame(lastCall)
                lastCall = window.requestAnimationFrame(handleResize)
            }

            handleResize()
            if (!height || !width) {
                window.addEventListener('resize', frameResize)
            }
            return () => { window.removeEventListener('resize', frameResize) }
        }, [])

        return (
            <div ref={container} className={props.className} style={{ width: '100%', height: heightState, position: 'relative' }}>
                {widthState && <Component width={widthState} height={heightState} {...props} />}
            </div>
        )
    }
}
