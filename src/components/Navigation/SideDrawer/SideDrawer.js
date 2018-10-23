import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'

// this component uses a function body with the return () statement inside
// this component includes an example of animation for the drawer menu

const sideDrawer = (props) => {
    // ...
    return (
        <div className={classes.SideDrawer}>
            <Logo />
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
}

export default sideDrawer