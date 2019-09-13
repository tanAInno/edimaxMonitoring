import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import '../assets/fonts/fontface.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Home from './Home'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <div className="product-wrapper">
                <Route exact path={`${this.props.match.path}`} component={Home} />
            </div>
        )
    }

}

export default App