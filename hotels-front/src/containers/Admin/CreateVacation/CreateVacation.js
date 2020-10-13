import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import './CreateVacation.css';
import {GiMoneyStack,GiVikingLonghouse} from 'react-icons/gi';
import {IoMdImages,IoMdGlobe,IoMdCheckmarkCircleOutline} from 'react-icons/io';
import {GoCalendar,GoCommentDiscussion} from 'react-icons/go';
import Modal from '../../../components/Layout/Modal/Modal';
import Aux from '../../../components/Layout/hoc/_Aux';
import FormErrors from '../../../components/Admin/Forms/FormErrors/FormErrors';
import * as axios from 'axios';

class CreateVacation extends Component{
    
    state = {
        vacation : {name:"",
                    destination:"",
                    description:"",
                    image:"",
                    from_date:"",
                    to_date:"",
                    price:"",
                    num_of_followers:"",
                    show_vacation:0
        },
        validationCheck:[],
        showModal:false,
        fromDateProp:"",
        toDateProp:"",
        showVacationProp:false,
        editVacation:false
    }
    

    componentDidMount(){
        if (this.props.vacation !== undefined) {
            let _vacation = {...this.props.vacation};

            this.setState({vacation:_vacation,
                           editVacation:true
                        });
        }
    }

    onChangeHandler = (event,inputID) => {
        const updatedForm = {...this.state.vacation};
        let updatedFormElm = {...updatedForm[inputID]}

        switch(event.target.type){
            case "checkbox" : let checkedInput = event.target.checked ? 1 : 0;
                               updatedFormElm = checkedInput;
                               break;
            case "file" : let fileInput = event.target.files[0];
                          updatedFormElm = fileInput;
                          break;
            default : updatedFormElm = event.currentTarget.value;
        }  
       
        
        updatedForm[inputID] = updatedFormElm
        this.setState({vacation:updatedForm})
    }

    addVacationHandler = (event) => {
        event.preventDefault();
        
        let validation = this.validForm();
        if(!validation) {
            this.setState({showModal:true});
        } 
        else{
            if(!this.state.editVacation)
                this.insertVacationHandler() ;
            else{
                this.props.updateVacationById(this.state.vacation);
                this.props.afterUpdateHandler(this.state.vacation);
            }
                
        };
    }

    validForm = () => {
        let errName = false;
        let errDest = false;
        let errDesc = false;
        let errDate = false;
        let errPrice = false;
        
        if(this.state.vacation.name.length < 5) {
            this.state.validationCheck.push({errField:"Hotel Name",errMsg:"Please Enter More Then 5 Charecters"})
            errName = true;
        }
        
        let destLength = this.state.vacation.destination.match(/\S+/g).length
        if(destLength < 2) {
            this.state.validationCheck.push({errField:"Vacation Location",errMsg:"The Location Should Contain City And Country"})
            errDest = true;
        }
        
        let descLength = this.state.vacation.description.match(/\S+/g).length
        if(descLength < 5) {
            this.state.validationCheck.push({errField:"Vacation Description",errMsg:"Please Enter More Then 5 Words"})
            errDesc = true;
        }

        let fromDate = new Date(Date.parse(this.state.vacation.from_date));
        let toDate = new Date(Date.parse(this.state.vacation.to_date));
        
        if (toDate - fromDate < 0 ) {
            this.state.validationCheck.push({errField:"Vacation Duration",errMsg:"The End Date Vacation Need To Be Higher Then The Start Date"})
            errDate = true;
        }
        
        let diffTime = Math.abs(toDate - fromDate);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 2 ){
            this.state.validationCheck.push({errField:"Vacation Duration",errMsg:"The Minimum Duration Time Must Be At Least 2 Days"})
            errDate = true;
        }

        if(Number(this.state.vacation.price) < 100) {
            this.state.validationCheck.push({errField:"Vacation Cost",errMsg:"The Minimum Vacation Cost Must Be More Then 100"})
            errPrice = true;
        }
        if(errName || errDest || errDesc ||errDate || errPrice) return false
        else return true;
    }

    insertVacationHandler = async () => {    
        const formData = new FormData();
        const vacationEntries = Object.entries(this.state.vacation)
        
        vacationEntries.forEach(entry => {
            formData.append(entry[0], entry[1]);
            });    

        try {
            await axios.post(`http://www.localhost:4000/insertVacation`,formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Authorization" : `Bearer ${this.props.token}`
                }}).then(response => {
                this.props.history.push('/');
            })
        } catch (e) {
            console.log(e);
        }
    }

    closeModalHandler = () => {
        this.setState({showModal:false,validationCheck:[]});
    }

    cancelHandler = () => {
        if (this.state.editVacation) {
            this.props.cancelledUpdate();
            this.props.closed();
        } else this.props.history.push('/');
        
    }

    render(){
        let classMd3 = "col-md-3";
        let classMd6 = "col-md-6 form-container";
        let header = <h3>Add New Vacation</h3>;

        if (this.state.editVacation) {
            classMd3 = "col-md-1";
            classMd6 = "col-md-10 form-container";
            header  = <h3>Update Vacation</h3>;
        }

        let buttons = <div className="buttons">
                        <button type="button" className="btn Cancelled" onClick={this.cancelHandler}>Cancel</button>
                        <button className="btn Success">{this.state.editVacation ? "Update" : "Add"}</button>
                     </div>
        
        if(this.state.showModal) {
            buttons = <Modal show={this.state.showModal} modalClosed={this.closeModalHandler}>
                        <FormErrors validationCheck={this.state.validationCheck}/>
                      </Modal>         
        }

        let inputs = <Aux>
                        <div className="input-container">
                            <label className="InputLable" 
                                htmlFor="name"
                                title="Hotel Name"><GiVikingLonghouse/></label>
                            <input type="text" 
                                id="name" 
                                required
                                value={this.state.vacation.name}
                                placeholder="Insert Hotel Name ..."
                                onChange={(event) => this.onChangeHandler(event,"name")}/>
                        </div>
                        <div className="input-container">
                            <label className="InputLable" 
                                htmlFor="destination"
                                title="Vacation Location"><IoMdGlobe/></label>
                            <input type="text" 
                                id="destination"
                                required
                                value={this.state.vacation.destination}
                                placeholder="Insert Vacation Location ..." 
                                onChange={(event) => this.onChangeHandler(event,"destination")}/>
                        </div>
                        <div className="input-container">
                            <label className="InputLable" 
                                htmlFor="description"
                                title="Vacation Description"><GoCommentDiscussion/></label>
                            <input type="text" 
                                id="description" 
                                required
                                value={this.state.vacation.description}
                                placeholder="Insert Vacation Description ..."
                                onChange={(event) => this.onChangeHandler(event,"description")}/>
                        </div>
                        <div className="input-container">
                            <label className="InputLable" 
                                htmlFor="image"
                                title="Vacation Image"><IoMdImages/></label>
                            <input type="file" 
                                id="image"
                                required
                                onChange={(event) => this.onChangeHandler(event,"image")}/>
                        </div>
                        <div className="input-container">
                            <label className="InputLable" 
                                htmlFor="from_date"
                                title="From Date"><GoCalendar/></label>
                            <input type="date" 
                                id="from_date" 
                                required
                                value={this.state.vacation.from_date}
                                onChange={(event) => this.onChangeHandler(event,"from_date")}/>
                        </div>
                        <div className="input-container">
                            <label className="InputLable" 
                                htmlFor="to_date"
                                title="To Date"><GoCalendar/></label>
                            <input type="date" 
                                id="to_date"
                                required
                                value={this.state.vacation.to_date}
                                onChange={(event) => this.onChangeHandler(event,"to_date")}/>
                        </div>
                        <div className="input-container">
                            <label className="InputLable" 
                                htmlFor="price"
                                title="Vacation Cost"><GiMoneyStack/></label>
                            <input type="number" 
                                id="price"
                                placeholder="Insert Vacation Cost ..." 
                                required
                                value={this.state.vacation.price}
                                onChange={(event) => this.onChangeHandler(event,"price")}/>
                        </div>
                        <div className="check-container">
                            <label className="InputLable" 
                                htmlFor="show_vacation"
                                title="Expose To Users"><IoMdCheckmarkCircleOutline/></label>
                            <input type="checkbox" 
                                id="show_vacation"
                                checked={this.state.vacation.show_vacation}
                                onChange={(event) => this.onChangeHandler(event,"show_vacation")}/>
                        </div>
                    </Aux>
    

        return(
            <div className="container">
                <div className="row topForm">
                     <div className={classMd3} />
                     <div className= {classMd6}>
                         <div className="Header">
                           {header}  
                         </div>
                         <form onSubmit={this.addVacationHandler}>
                            {inputs}
                            {buttons}
                         </form>
                     </div>
                 </div> 
            </div>
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

export default withRouter(connect( mapStateToProps)(CreateVacation));