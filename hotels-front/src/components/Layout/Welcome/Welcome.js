import React from 'react';

import './Welcome.css';
import bikini from "./../../../assets/icons/bikini4.png";
import ticket from "./../../../assets/icons/ticket.png";
import smile from "./../../../assets/icons/smile5.png";

const welcome = (props) => {
    return(
        <div className="container">
            <div className="card headline">
                <div className="card-body">
                    <h3 className="card-title">Let us take care of all your arrangements</h3>
                    <h5 className="card-subtitle mb-2 text-muted">All you need is to choose your destination</h5>
                </div>    
            </div>

            <div className="card headline sec">
                <div className="card-body">
                    <h5 className="card-subtitle forget">And don't forget !</h5>
                </div>    
            </div>

            <div className="row">
                <div className="col-md-2 card-wrap">
                    <div className="card adv">
                        <div className="card-body">
                            <h5 className="card-title">Swim suit to enjoy the pool</h5>
                            <img className="card-img-top icons" src={bikini} alt="bukini"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 card-wrap">
                    <div className="card adv">
                        <div className="card-body">
                            <h5 className="card-title">Plane ticket to arrive</h5>
                            <img className="card-img-top icons" src={ticket} alt="ticket"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 card-wrap">
                    <div className="card adv">
                        <div className="card-body">
                            <h5 className="card-title">And most important your smile</h5>
                            <img className="card-img-top icons" src={smile} alt="smile"/>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <div className="row">
                <div className="col-md-12 headline">
                    <h3>Let us take care of all your arrangements,</h3> <br/>
                    <h4>All you need is to choose your destination</h4>
                </div>
                <div className="col-md-1"/>
                <div className="col-md-3">

                    <img className="icons" src={bikini} alt="bikini"/>
                </div>
            </div> */}
        </div>
    )
};

export default welcome;