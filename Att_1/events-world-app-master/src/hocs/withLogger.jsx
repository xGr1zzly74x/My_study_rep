import React, {useEffect} from "react"

const withLogger = (WrappedComponent) => {
    const WithLogger = (props) => {
        useEffect(() => {
            //console.log(`Компонент ${WrappedComponent.name} примонтировался`)
            
            return () => {
            //console.log(`Компонент ${WrappedComponent.name} размонтировался`)
            }
        }, [])

        useEffect(() => {
            //console.log(`Компонент ${WrappedComponent.name} обновился`)
        })

        return <WrappedComponent {...props} />
    }

    WithLogger.displayName = `withLogger(${WrappedComponent.displayName || WrappedComponent.name})`
    return WithLogger
}

export default withLogger