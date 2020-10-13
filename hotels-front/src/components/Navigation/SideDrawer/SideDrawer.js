import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../Layout/Backdrop/Backdrop'
import Aux from '../../Layout/hoc/_Aux';

const sideDrawer = ( props ) => {
    let attachedClasses = ["SideDrawer", "Close"];
    if (props.open) {
        attachedClasses = ["SideDrawer", "Open"];
    }
    
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className="SideLogo">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems show={props.open} 
                                     clicked={props.closed} 
                                     isAuthenticated={props.isAuth}
                                     isAdminAuth={props.isAdminAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;