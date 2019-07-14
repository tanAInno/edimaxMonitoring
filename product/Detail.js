import React, { Component } from 'react';
import axios from 'axios'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import StarRatings from 'react-star-ratings';
import { setProducts, setChoosenProduct } from '../actions/product';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import ProductModal from './ProductModal'
import Header from '../Header'
import Footer from '../Footer'

class Detail extends Component {

    render() {
        return (
            <div className="product-wrapper">
                <Header active="product"/>
                <div/>
                <Footer/>
            </div>
        )
    }
}

export default connect(state => state)(Detail)