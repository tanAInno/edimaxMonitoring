import React, {Component} from 'react';
import axios from 'axios'
import '../css/App.css'
import '../css/Monitor.css'
import { connect } from 'react-redux'
import { setDevices } from '../actions/edimax';

class Monitor extends Component {

    componentDidMount(){
        this.getDevices()
        this.get_interval = setInterval(() => {
            this.getDevices()
        }, 10000)
        this.post_interval = setInterval(() => {
            this.postDevices()
        }, 300000)
    }

    componentWillUnmount(){
        clearInterval(this.get_interval)
        clearInterval(this.post_interval)
    }

    async getDevices(){
        await axios.get("https://airbox.edimaxcloud.com/devices?token=9af3944d-5ffa-4650-8e6a-dd7e665e0cf7")
            .then(response => {
                console.log(response.data.devices)
                const devices = response.data.devices
                this.props.dispatch(setDevices(devices))
            }).catch(error => console.log(error))
    }

    async postDevices(){
        await this.props.edimaxReducer.devices.map((data,index) => {
            axios.post("http://localhost:3000/api/edimaxs",{
                name: data.name,
                area: data.area,
                status: data.status,
                type: data.type,
                pm1: data.pm1,
                pm25: data.pm25,
                pm10: data.pm10,
                co: data.co,
                co2: data.co2,
                tvoc: data.tvoc,
                hcho: data.hcho,
                temperature: data.t,
                humidity: data.h,
                date_time: data.time
            }).catch(error => console.log(error))
        })
        console.log("post")
    }

    render(){
        return(
            <div className="tab-container">
                <div className="monitor-container">
                {this.props.edimaxReducer.devices.map((data,index) => {
                    return(
                        <div className="monitor-box">
                            <div className="header-wrapper">
                                <div className="header-name">
                                    {data.name}
                                </div>
                                <div className="header-status">
                                    Status : {data.status}
                                </div>
                                <div className="header-area">
                                    Area : {data.area}
                                </div>
                                <div className="header-type">
                                    Type : {data.type}
                                </div>
                            </div>
                            <div className="monitor-area">
                                <div className="monitor-row">
                                    <div className="monitor-item" style={{marginBottom: '7.5px'}}>PM1: {data.pm1}</div>
                                    <div className="monitor-item" style={{marginBottom: '7.5px'}}>PM2.5: {data.pm25}</div>
                                    <div className="monitor-item">PM10: {data.pm10}</div>
                                </div>
                                <div className="monitor-row">
                                    <div className="monitor-item" style={{marginBottom: '7.5px'}}>CO: {data.co}</div>
                                    <div className="monitor-item" style={{marginBottom: '7.5px'}}>CO2: {data.co2}</div>
                                    <div className="monitor-item">TVOC: {data.tvoc}</div>
                                </div>
                                <div className="monitor-row">
                                    <div className="monitor-item" style={{marginBottom: '7.5px'}}>HCHO: {data.hcho}</div>
                                    <div className="monitor-item" style={{marginBottom: '7.5px'}}>Temp: {data.t}</div>
                                    <div className="monitor-item">Humidity: {data.h}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }

}

export default connect(state => state)(Monitor)