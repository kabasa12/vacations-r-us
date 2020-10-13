import React,{Component} from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';

import Aux from '../../../components/Layout/hoc/_Aux';
import CreateVacation from '../CreateVacation/CreateVacation';
import Modal from '../../../components/Layout/Modal/Modal';
import * as axios from 'axios';
import './EditVacations.css';

class EditVacations extends Component {
    
    state= {
        vacations:[{}],
        updatedVacation:{},
        showVacationEditor:false
    }
    

    componentDidMount() {
        this.getAllVacations();
    }

    getVacationById = (id) => {
        let index = null;
        if(id){
            index = this.state.vacations.findIndex(vac => vac.id === id);
        }
        
        if(index!== -1) {
            let _vacations = [...this.state.vacations ];
            let _updatedVacation = {...this.state.updatedVacation};
            _updatedVacation = {..._vacations[index]}

            this.setState({
                showVacationEditor:true,
                updatedVacation:_updatedVacation
            });
        }
    }

    closeModalHandler = () => {
        this.setState({showVacationEditor:false});
    }

    async getAllVacations() {    
        try {
            await axios.get(`http://www.localhost:4000/getAllVacations`,
                {headers: {"Authorization" : `Bearer ${this.props.token}`}}).then(response => {
                this.setState({ vacations: response.data })
            })
        } catch (e) {
            console.log(e);
        }
    }

    deleteVacation = async (vacation_id) => {
        try {
            await axios.delete(`http://www.localhost:4000/deleteVacation/${vacation_id}`, {
                headers: {"Authorization" : `Bearer ${this.props.token}`}})
                .then(response => {
                        let _vacations = [...this.state.vacations ];
                        _vacations = _vacations.filter( vac => vac.id !== vacation_id)
            
                        this.setState({vacations:_vacations});
            })
        } catch (e) {
            console.log(e);
        }
    }

    cancelledUpdate = () => {
        this.props.history.push('/editVacations');
    }

    updateVacationById = async (vacation) => {
        const formData = new FormData();
        const vacationEntries = Object.entries(vacation)
        let id = vacation.id;

        vacationEntries.forEach(entry => {
            formData.append(entry[0], entry[1]);
            });    
            
        // for(var pair of formData.entries()) {
        //     console.log(pair[0]+ ', '+ pair[1]); 
        //     }
        try {
            await axios.put(`http://www.localhost:4000/updateVacationByid/${id}`,formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Authorization" : `Bearer ${this.props.token}`
                }}).then(response => {

                this.closeModalHandler();
            })
        } catch (e) {
            console.log(e);
        }
    }

    updateStateAfterEdit = (vacation) => {
        let index = null;
        let id = vacation.id;
        if(id)  index = this.state.vacations.findIndex(vac => vac.id === id);
        

        if(index!== -1) {
            let _vacations = [...this.state.vacations ];
            let vacationElm = {..._vacations[index]};
            vacationElm = vacation;
            _vacations[index] = vacationElm;
            this.setState({vacations:_vacations});
        }
    }

    render(){

        let vacationTbl = this.state.vacations.map((vacation,index) => {
            let fromDate = new Date(Date.parse(vacation.from_date))
            fromDate = fromDate.toLocaleString('default', { month: 'long', 
                                                            day: 'numeric', 
                                                            year: 'numeric' });
            
            let toDate = new Date(Date.parse(vacation.to_date))
            toDate = toDate.toLocaleString('default', { month: 'long', 
                                                        day: 'numeric', 
                                                        year: 'numeric' });

            let lastDate = new Date(Date.parse(vacation.last_updated_date))
            lastDate = lastDate.toLocaleString('default', { month: 'long', 
                                                            day: 'numeric', 
                                                            year: 'numeric' });

            return(
                <tr key={index}>
                    <th scope="row">{vacation.id}</th>
                    <td>{vacation.name}</td>
                    <td>{vacation.destination}</td>
                    <td>{fromDate}</td>
                    <td>{toDate}</td>
                    <td>{vacation.price} $</td>
                    <td>{lastDate}</td>
                    <td className="TblTdBtn">
                        <div className="btn edit btn-sm" onClick={() => this.getVacationById(vacation.id)}>Edit</div>
                    </td>
                    <td className="TblTdBtn">
                        <div className="btn delete btn-sm" onClick={() => this.deleteVacation(vacation.id)}>Delete</div>
                    </td>
                </tr>
            )
        });

        let editForm;
        if(this.state.showVacationEditor) {
            editForm = <Modal show={this.state.showVacationEditor} 
                              modalClosed={this.closeModalHandler} 
                              edit={this.state.showVacationEditor}>
                            <CreateVacation vacation={this.state.updatedVacation}
                                            updateVacationById={this.updateVacationById}
                                            cancelledUpdate={this.cancelledUpdate}
                                            closed={this.closeModalHandler}
                                            afterUpdateHandler={this.updateStateAfterEdit}/>
                       </Modal>         
        }
        return(
            <Aux>
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-hover table-sm Tbl">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Destination</th>
                                <th scope="col">From Date</th>
                                <th scope="col">To Date</th>
                                <th scope="col">Price</th>
                                <th scope="col">Last Updated</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vacationTbl}
                        </tbody>
                    </table>
                </div>
                {editForm}
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
        authRedirectPath: state.auth.authRedirectPath
    };
};

export default withRouter(connect( mapStateToProps)(EditVacations));
