import React, { Component } from 'react';
import axios from 'axios'
import '../css/Checkout.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import { setProducts } from '../actions/product';
import Header from './Header'

class Checkout extends Component {

    render() {
        return(
            <div className="product-wrapper">
                <Header/>
            </div>
        )
    }

}

export default Checkout