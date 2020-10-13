import React, { Component } from 'react';
import { connect } from 'react-redux';

import {withRouter} from 'react-router-dom';
import Aux from '../../components/Layout/hoc/_Aux';
import VacationCard from '../../components/Vacations/VacationCard/VacationCard';
import VacationTotal from './../../components/Vacations/VacationTotal/VacationTotal';
import Welcome from './../../components/Layout/Welcome/Welcome';
import * as axios from 'axios';
import './VacationSelector.css';

class VacationSelector extends Component {

    state = {
        vacations: [{}],
        userId:null,
        token:null,
        role_id:null,
        goTotal:false,
        totalVacation:[]
    };
    
    componentDidMount() {
        this.getVacations();
    }

    async getVacations() {
        try {
            await axios.get(`http://www.localhost:4000/getVacations/?id=${this.props.userId}`,{headers: {"Authorization" : `Bearer ${this.props.token}`}})
            .then(response => {
                this.setState({ vacations: response.data })
            })
        } catch (e) {
            console.log(e);
        }
    }

    addUserVacation = async (vacation_id) => {

        let index = this.state.vacations.findIndex(vac => vac.id === vacation_id);

        try {
            await axios.post(`http://www.localhost:4000/insertUserVacation/?user_id=${this.props.userId}&vacation_id=${vacation_id}`).then(response => {
                let _vacations = [ ...this.state.vacations ];
                _vacations[index].follow = 1;
                ++_vacations[index].num_of_followers;
                this.setState({ vacations: _vacations });
            })
        } catch (e) {
            console.log(e);
        }
    }

    removeUserVacation = async (vacation_id) => {
        let index = this.state.vacations.findIndex(vac => vac.id === vacation_id);

        try {
            await axios.delete(`http://www.localhost:4000/deleteUserVacation/?user_id=${this.props.userId}&vacation_id=${vacation_id}`).then(response => {
                let _vacations = [ ...this.state.vacations ];
                _vacations[index].follow = 0;
                --_vacations[index].num_of_followers;
                this.setState({ vacations: _vacations });
            })
        } catch (e) {
            console.log(e);
        }

    }

    async getVacationById(id) {
        try {
            await axios.get(`http://www.localhost:4000/getVacationById/?id=${id}`).then(response => {
                this.setState({ vacations: response.data })
            })
        } catch (e) {
            console.log(e);
        }
    }

    updateFollowers = async (id, numOfFollowers) => {
        if(!this.props.isAuthenticated || this.props.isAdminAuth){
            return;
        }
        let updatedNumOfFollow = numOfFollowers;
        let index = this.state.vacations.findIndex(vac => vac.id === id);
        //if follow is true then call remove method
        this.state.vacations[index].follow ? --updatedNumOfFollow : ++updatedNumOfFollow;

        try {
            await axios.put(`http://www.localhost:4000/updateFolowersVacationByid/?id=${id}&num_of_followers=${updatedNumOfFollow}`).then(response => {
                if (response.data.affectedRows && index !== -1) {
                    if (this.state.vacations[index].follow) {
                        this.removeUserVacation(id);
                    } else {
                        this.addUserVacation(id);
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    }

    goToTotal = async (vacationId) => {
        // if(!this.props.isAuthenticated || this.props.isAdminAuth){
        //     return;
        // }

        try {
            await axios.get(`http://www.localhost:4000/getVacationById/?id=${vacationId}`).then(response => {
                this.setState({ goTotal:true,totalVacation: response.data})
            })
        } catch (e) {
            console.log(e);
        }
        //this.setState({goTotal:true,totalVacationId:vacationId})
    }

    updateGoTotal = () => {
        this.setState({goTotal:false});
    }

    render() {
        let vacationsArr = [ ...this.state.vacations ];
        let vacationComponents;

        if (vacationsArr.length > 0) {
            vacationComponents = vacationsArr.map((vac, index) => {
                return <VacationCard vacations={vac}
                    key={index}
                    updateFollowers={this.updateFollowers}
                    goToTotal={this.goToTotal}/>
                }
            )
        }

        let layout;
        if (this.state.goTotal){
            layout = <Aux>
                        <div>
                            <VacationTotal vac={this.state.totalVacation}
                                           updateGoTotal ={this.updateGoTotal}/>
                        </div>
                    </Aux>
        } else {
            layout = <Aux>
                        <div className="paral">
                            <div>
                                <Welcome />
                            </div>
                        </div>
                        <div className="paral paralsec">
                            <div className="row">
                                {vacationComponents}
                            </div>
                        </div>
                        <footer className="wn-footer">
                            <small><p><i className="fa fa-copyright" aria-hidden="true"></i> All rights preserve to kabesa group</p></small>
                        </footer>    
                    </Aux>
        }
        return (<Aux>
                    {layout}
                </Aux>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        userId : state.auth.userId,
        token : state.auth.token,
        isAdminAuth: (state.auth.token !== null) && (state.auth.role_id === 1),
        authRedirectPath: state.auth.authRedirectPath
    };
};
export default withRouter(connect( mapStateToProps)(VacationSelector));