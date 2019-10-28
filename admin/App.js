import React, { Component } from 'react';
import axios from 'axios'
import '../css/Admin.css'
import '../assets/fonts/fontface.css'
import Adminmain from './Admin'
import Admin from './AdminLogin'
import Coupon from './Coupon'
import ProductCreate from './ProductCreate'
import Random from './Random'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <div className="admin-wrapper">
                <Route exact path={`${this.props.match.path}`} component={Admin} />
                <Route path={`${this.props.match.path}/adminmain`} component={Adminmain} />
                <Route path={`${this.props.match.path}/coupon`} component={Coupon} />
                <Route path={`${this.props.match.path}/productcreate`} component={ProductCreate} />
                <Route path={`${this.props.match.path}/random`} component={Random} />
            </div>
        )
    }

}

export default App