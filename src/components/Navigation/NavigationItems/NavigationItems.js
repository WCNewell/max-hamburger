import React from 'react'

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        { props.isAuthenticated
            ? <NavigationItem link='/orders'>Orders</NavigationItem>
            : null }
        { !props.isAuthenticated
            ? <NavigationItem link='/auth'>Log In</NavigationItem>
            : <NavigationItem link='/logout'>Log Out</NavigationItem>}
    </ul>
)

export default navigationItems