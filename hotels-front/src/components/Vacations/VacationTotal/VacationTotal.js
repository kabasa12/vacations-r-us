import React,{Component} from 'react';
import { withRouter} from 'react-router-dom';
import {GiPadlock} from 'react-icons/gi';
import {Form,Col} from 'react-bootstrap';

import './VacationTotal.css'

class VacationTotal extends Component  {

    state = {vacation:[{}]}
    
    componentDidMount(){
        this.setState({vacation : [...this.props.vac]})
    }

    cancleHandle = () => {
        this.props.updateGoTotal();
    }

    render(){
        let vac = []
        vac = this.state.vacation[0];
        let str = vac.description;
        if(vac.id ){
            str = str.substring(0,str.indexOf(' ',70)) + '...'
        }
        
        return(
            <div className="container">
                <div className="row totalHeader">
                    <div className="col-md-12 totalHeadWrap">
                        <span className="totalLable"><GiPadlock/></span>
                        <div className="totalHeadTbl"> 
                            <span className="totalH">Book now to get this fantastic price</span>
                            <span className="totalSubH">If you book later,ther's a chance the price will go up</span>    
                        </div>
                    </div>

                    <div className="col-md-4 totalImgWrap">
                        <img className="totalImg" src={vac.image} alt={vac.name}/>
                        <div className="totalHeadTbl desc">
                            <span className="totalH">Basic Double Room,Sleep up to 3 persons</span>
                            <span className="totalSubH">{str}</span>
                        </div>
                    </div>
                    <div className="col-md-6">
                    <Form>
                        <Form.Row>
                            <Form.Label column="sm" lg={2}>
                                Rooms
                            </Form.Label>
                            <Col>
                                <Form.Control as="select" defaultValue="Choose...">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </Form.Control>
                            </Col>
                        </Form.Row>
                    </Form>
                    
                        {/* <div className="row">
                            <div className="col-md-6">
                                <h6>Rooms</h6>
                            </div>
                            <div className="col-md-3 totalSelect">
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="btn btn-danger" onClick={this.cancleHandle}>Back</div>
            </div>
        )
    }
    
    
    
}

export default withRouter(VacationTotal);