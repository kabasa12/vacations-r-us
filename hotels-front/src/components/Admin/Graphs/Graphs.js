import React, { Component } from 'react';
import { connect } from 'react-redux';

import CanvasJSReact from './canvasjs.react';
import axios from 'axios'
import { Container, CssBaseline } from '@material-ui/core'


const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graphs extends Component {
    
    state = {
        error: false,
        data: []
    };

    componentDidMount(){
        this.getStatistics();
    }   
    
    async getStatistics() {
        try {
            await axios.get(`http://www.localhost:4000/getStatistics`,
                {headers: {"Authorization" : `Bearer ${this.props.token}`}}).then(response => {
                this.setState({ data: response.data });
            })
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        
        let statistics = [];
        let dataPoint;
        
        if (this.state.data.data ) {
            statistics = [...this.state.data.data];
            dataPoint = statistics.map(data => {
                if (this.props.type === "bubble") {
                    let size = Math.floor(3 * data.OrderCount)
                    return { label: data.VacationName, y: data.OrderCount, z:size };
                } else {
                    return { label: data.VacationName, y: data.OrderCount };
                }
            });
        };
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark2",
            axisX:{labelFontColor:"gold"},
            title: {
                text: "Vacations Statistics",
                fontColor:"gold"
            },
            
            data: [{
                type: this.props.type,
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: dataPoint
            }]
        }
        return(
            <Container component="div" maxWidth="lg" style={{marginBottom: '3rem', marginTop: '2rem' ,color:'gold'}}>
                <CssBaseline />
                <CanvasJSChart options={options}/>
            </Container>
        )
    };
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
export default connect( mapStateToProps)(Graphs);