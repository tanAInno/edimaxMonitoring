import React, { Component } from 'react';
import axios from 'axios'
import '../css/Admin.css'
import '../css/ProductCreate.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'

class ProductCreate extends Component {

    render() {
        return(
            <div className="product-create-wrapper">
                <div className="product-create-content">
                    <div className="product-create-header">เพิ่ม Product ใหม่ลงไปในเว็บไซต์</div>
                </div>
            </div>
        )
    }

}

export default ProductCreate