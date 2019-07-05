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

        const [ size, setSize ] = useState({ height: maxHeight, width: width || minWidth })

        useEffect(() => {
            function handleResize () {
                let widthToUse = width || container.current.clientWidth
                if (widthToUse < minWidth) {
                    widthToUse = minWidth
                }
                if (widthToUse > maxWidth) {
                    widthToUse = maxWidth
                }
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
                setSize({ height: heightToUse, width: widthToUse })
            }

            handleResize()

            if (!height || !width) {
                window.addEventListener('resize', handleResize)
            }
            return () => { window.removeEventListener('resize', handleResize) }
        }, [])

        return (
            <div ref={container} className={props.className} style={{ width: '100%', height: size.height, position: 'relative', overflow: 'hidden' }}>
                {<Component width={size.width} height={size.height} {...props} />}
            </div>
        )
    }
}
