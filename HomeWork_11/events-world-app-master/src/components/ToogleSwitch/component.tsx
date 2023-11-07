import React from 'react'
import { motion } from "framer-motion"
import './styles.css'

export const ToogleSwitch = ({IsOn, Switch}: 
{IsOn: any, Switch: any}) => {

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
      }

    return (
        <div className="switch" data-darkmode={IsOn} onClick={Switch}>
          <motion.div className="handle" layout transition={spring} />
        </div>)
}
