import React from 'react';

import './NavigationItems.css';
import {IoIosHome,IoMdLogIn,IoMdLogOut} from 'react-icons/io';
import {MdNewReleases,MdEditLocation} from 'react-icons/md';
import {GoGraph} from 'react-icons/go'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    
    <ul className="NavigationItems" onClick={props.clicked}>
        <NavigationItem link="/" exact><IoIosHome size={33}/> Home</NavigationItem>
        {(props.isAdminAuth) ? 
          <NavigationItem link="/newVacation"><MdNewReleases size={33}/> New</NavigationItem>: null}
        {(props.isAdminAuth) ? 
          <NavigationItem link="/editVacations"><MdEditLocation size={33}/> Edit</NavigationItem>: null}
        {(props.isAdminAuth) ? 
          <NavigationItem link="/statistics"><GoGraph size={33}/> Graphs</NavigationItem>: null}
        {!props.isAuthenticated
            ? <NavigationItem link="/auth"><IoMdLogIn size={33}/> Login</NavigationItem>
            : <NavigationItem link="/logout"><IoMdLogOut size={33}/> Logout</NavigationItem>}
    </ul>
);

export default navigationItems;