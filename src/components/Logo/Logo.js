// Another example of a 'functional' component

import React from 'react'

// Make webpack aware that we are using the image:

import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.css'

 //  Set the image source as burgerLogo which refers to the string above in webpack friendly syntax

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt='My Burger Logo'/>
    </div>
)

export default logo