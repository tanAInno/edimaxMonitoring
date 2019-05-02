import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import '../assets/fonts/EkkamaiStandard-Light.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Product from './Product'
import ShoppingCart from './Shoppingcart'
import Header from './Header'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div className="product-wrapper">
                <Header/>
                <Product/>
            </div>
        )
    }

}

export default Home