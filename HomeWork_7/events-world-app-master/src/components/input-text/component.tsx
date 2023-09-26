import React from 'react'
import './styles.css'; 


export const InputText = ({type = 'text', className, placeholder, onChange, value}: 
{type: string, className: string, placeholder?: string, onChange?: any, value?: string}) => {


    return(
        <input 
            onChange={onChange} 
            className={className} 
            type={type} 
            placeholder={placeholder}
            value={value}
        />
    )
}
