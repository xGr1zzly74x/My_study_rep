import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import './style.css'
import NotFound from '../../NotFound.jpg';

const NotFoundPage = () => {

    useEffect(() => {
        document.body.classList.remove('body_login')
        document.body.classList.remove('body_about')
        document.body.classList.remove('body_catalog_places')
    
    })

    const linkStyle:(any) = {
        textAlign:"center",
        textDecoration: "none",
        color: 'blue',
        fontSize: 24,
        fontWeight: "bold",
        display: "flow"
      }

    return (
        <>
        <Link to='/' style={linkStyle}>Вернуться на главную
        </Link >
        <img src={NotFound} width="500" height="500" className="img"></img>
        </>
    )
}

export default NotFoundPage