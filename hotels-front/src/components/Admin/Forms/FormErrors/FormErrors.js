import React from 'react';
import './FormErrors.css'

const formErrors = (props) => {
    return(
        <div>
            <h4 className="FormHeader">Please Fix The Following Issues</h4>
            <table className="FormTable">
                <thead>
                    <tr>
                        <th>Error Field</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                {props.validationCheck.map((err,index) => {
                        return (
                            <tr key={index}>
                                <td>{err.errField}</td>
                                <td>{err.errMsg}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>  
    );
}

export default formErrors;