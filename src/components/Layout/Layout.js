import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

// Turn const layout into class Layout, which also means importing component from react
// and Layout extends component with render method and return jsx

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        } )
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>
        )
    }
}

// const layout = (props) => (
//     <Aux>
//         <Toolbar />
//         <SideDrawer />
//             <main className={classes.Content}>
//                 {props.children}
//             </main>
//     </Aux>
// )

export default Layout