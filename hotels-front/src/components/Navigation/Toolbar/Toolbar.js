import React from 'react';
import  './Toolbar.css';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';

const toolbar = ( props ) => (
    <div>
    <header className="Toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className="ToolLogo">
            <Logo />
        </div>
    </header>
        <div className="deco"></div>
    </div>
);

export default toolbar;