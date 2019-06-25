import React, { Component } from 'react';
import '../css/Service.css'
import '../assets/fonts/fontface.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import Home from './Home'
import Booking from './Booking'

class App extends Component {

    render() {
        return (
            <div className="service-wrapper">
                <Route exact path={`${this.props.match.path}`} component={Home} />
                <Route path={`${this.props.match.path}/booking`} component={Booking}/>
            </div>
        )
    }

}

export default App
