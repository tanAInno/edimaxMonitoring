import React, { Component } from 'react';
import axios from 'axios'
import '../css/Confirmation.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import { setProducts } from '../actions/product';
import Header from '../Header'
import Footer from '../Footer'
import {Link} from 'react-router-dom';

class Confirmation extends Component {

    render() {
        return(
            <div className="product-wrapper">
                <Header/>
                <div className="tab-container">
                    <div className="confirmation-container">
                        <div className="confirmation-box">
                            <div className="confirmation-text-header">สั่งสินค้าเรียบร้อยแล้ว</div>
                            <div className="confirmation-text">ระบบจะทำการส่งใบประเมินราคาสินค้าผ่านทาง E-mail ในภายหลัง</div>
                            <Link to="/product">
                                <button className="back-button">กลับเข้าสู่หน้าแรก</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default Confirmation