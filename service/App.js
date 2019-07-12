import React, { Component } from 'react';
import '../css/Service.css'
import '../assets/fonts/fontface.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import Home from './Home'
import Booking from './Booking'
import Datetime from './Datetime'
import Addition from './Addition'
import Address from './Address'
import Payment from './Payment'
import Thanks from './Thanks'

class App extends Component {

    render() {
        return (
            <div className="service-wrapper">
                <Route exact path={`${this.props.match.path}`} component={Home} />
                <Route path={`${this.props.match.path}/booking`} component={Booking}/>
                <Route path={`${this.props.match.path}/datetime`} component={Datetime}/>
                <Route path={`${this.props.match.path}/addition`} component={Addition}/>
                <Route path={`${this.props.match.path}/address`} component={Address}/>
                <Route path={`${this.props.match.path}/payment`} component={Payment}/>
                <Route path={`${this.props.match.path}/thanks`} component={Thanks}/>
            </div>
        )
    }

}

export default App
