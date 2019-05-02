import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import '../assets/fonts/EkkamaiStandard-Light.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Product from './Product'
import Home from './Home'
import ShoppingCart from './Shoppingcart'
import Checkout from './Checkout'
import Header from './Header'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <div className="product-wrapper">
                <Route exact path={this.props.match.path} component={Home} />
                <Route path={`${this.props.match.path}/shoppingcart`} component={ShoppingCart} />
                <Route path={`${this.props.match.path}/checkout`} component={Checkout} />
            </div>
        )
    }

}

export default App