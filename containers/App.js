import React, {Component} from 'react';
import axios from 'axios'
import '../css/App.css'
import { Tabs,TabLink,TabContent } from 'react-tabs-redux'

class App extends Component {
    
    componentDidMount(){
        this.getDevices()
    }

    async getDevices(){
        await axios.get("https://airbox.edimaxcloud.com/devices?token=9af3944d-5ffa-4650-8e6a-dd7e665e0cf7")
            .then(response => {
                const devices = response.data.devices.map(c => {
                    return({
                        id: c.id,
                        name: c.name,
                        status: c.status,
                        pm1: c.pm1,
                        pm10: c.pm10,
                        pm25: c.pm25,
                    })
                })
            }).catch(error => console.log(error))
    }
    
    render () {
        return (
            <div className="app-container">
                <div className="app-wrapper">
                    <div className="app-banner-wrapper">
                    <div className="app-banner">
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App