import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import '../assets/fonts/fontface.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Product from './Product'
import Home from './Home'
import ShoppingCart from './Shoppingcart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import Detail from './Detail'
import Header from '../Header'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <div className="product-wrapper">
                <Route exact path={`${this.props.match.path}`} component={Home} />
                <Route path={`${this.props.match.path}/shoppingcart`} component={ShoppingCart} />
                <Route path={`${this.props.match.path}/checkout`} component={Checkout} />
                <Route path={`${this.props.match.path}/confirmation`} component={Confirmation} />
                <Route path={`${this.props.match.path}/detail/:productId`} component={Detail} />
            </div>
        )
    }

}

export default App