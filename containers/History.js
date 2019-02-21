import React, {Component} from 'react';
import axios from 'axios'
import '../css/App.css'
import '../css/History.css'
import { connect } from 'react-redux'
import { setDevices, setHistories } from '../actions/edimax';

class History extends Component {

    componentDidMount(){
        this.getHistories()
    }

    async getHistories(){
        await axios.get("http://localhost:3000/api/edimaxs")
            .then(response => {
                console.log(response.data.data)
                const histories = response.data.data
                this.props.dispatch(setHistories(histories))
            }).catch(error => console.log(error))
    }

    render(){
        return(
            <div className="tab-container">
                <div className="history-container">
                <div className="table-container">
                    <div className="table-header">
                        <div className="table-header-name">Name</div>
                        <div className="table-header-area">Area</div>
                        <div className="table-header-data">PM1</div>
                        <div className="table-header-data">PM2.5</div> 
                        <div className="table-header-data">PM10</div> 
                        <div className="table-header-data">CO</div> 
                        <div className="table-header-data">CO2</div>
                        <div className="table-header-data">TVOC</div>  
                        <div className="table-header-data">HCHO</div>  
                        <div className="table-header-data">Temp</div>
                        <div className="table-header-data">Humid</div>
                        <div className="table-header-date">Date</div>                
                    </div>
                    {this.props.edimaxReducer.histories.map((data,index) => {
                        return(
                            <div className="table-row">
                                <div className="table-row-name">{data.name}</div>
                                <div className="table-row-area">{data.area}</div>
                                <div className="table-row-data">{data.pm1}</div>
                                <div className="table-row-data">{data.pm25}</div> 
                                <div className="table-row-data">{data.pm10}</div> 
                                <div className="table-row-data">{data.co}</div> 
                                <div className="table-row-data">{data.co2}</div>
                                <div className="table-row-data">{data.tvoc}</div>  
                                <div className="table-row-data">{data.hcho}</div>  
                                <div className="table-row-data">{data.temperature}</div>
                                <div className="table-row-data">{data.humidity}</div>
                                <div className="table-row-date">{data.date_time}</div>   
                            </div>
                        )
                    })}
                </div>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(History)