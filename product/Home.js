import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import '../assets/fonts/fontface.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Product from './Product'
import ShoppingCart from './Shoppingcart'
import Header from '../Header'
import Footer from '../Footer'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class Home extends Component {

    render() {
        return (
            <div className="product-wrapper">
                <Header active="product"/>
                <Product/>
                <Footer/>
            </div>
        )
    }

}

export default Home