import React from 'react';

import burgerLogo from '../../assets/logo2.png';
import './Logo.css';

const cardLogo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={burgerLogo} alt="card logo" />
    </div>
);

export default cardLogo;