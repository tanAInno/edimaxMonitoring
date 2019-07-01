import React, { Component } from 'react';
import '../css/Service.css'
import '../assets/fonts/fontface.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import Home from './Home'
import Booking from './Booking'
import Datetime from './Datetime'
import Addition from './Addition'

class App extends Component {

    render() {
        return (
            <div className="service-wrapper">
                <Route exact path={`${this.props.match.path}`} component={Home} />
                <Route path={`${this.props.match.path}/booking`} component={Booking}/>
                <Route path={`${this.props.match.path}/datetime`} component={Datetime}/>
                <Route path={`${this.props.match.path}/addition`} component={Addition}/>
            </div>
        )
    }

}

export default App
