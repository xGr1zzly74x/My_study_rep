import React from 'react'

export const IButton = ({children, className, onClick, id}: 
{children: string, className?: string, onClick?: any, id?: string}) => {

    return(
        <button
            children={children} 
            className={className} 
            onClick={onClick} 
            id={id}
        />
    )
}
