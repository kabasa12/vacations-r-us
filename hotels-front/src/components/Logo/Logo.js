import React from 'react';

import burgerLogo from '../../assets/logo.png';
import './Logo.css';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={burgerLogo} alt="site logo" />
    </div>
);

export default logo;