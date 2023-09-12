import React, { useEffect } from 'react'
import './style.css'

const About = () => {

    useEffect(() => {
        document.body.classList.remove('body_login')
        document.body.classList.remove('body_catalog_places')
        document.body.classList.add('body_about')
    })

    return (
        <>
        <p style={{textAlign:"center", fontSize: 23, fontWeight: "bold"}}>Данный сервис был 
        разработан в рамках образовательной программы Иннополис JavaScript 2023</p>
        <p style={{textAlign:"center", fontSize: 23, fontWeight: "bold"}}>С помощью данного сервиса можно получить показатели загрязнения воздуха</p>
        <p style={{textAlign:"center", fontSize: 23, fontWeight: "bold"}}>Разработчик Шабалин И.А. Преподаватель Ковалев Станислав</p>
        </>
    )
}

export default About