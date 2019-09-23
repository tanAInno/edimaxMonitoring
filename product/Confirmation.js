import React, { Component } from 'react';
import axios from 'axios'
import '../css/Thanks.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import Header from '../Header'
import Footer from '../Footer'
import { Link } from 'react-router-dom';
import images from '../ImageStorage'

class Confirmation extends Component {

    render() {
        return (
            <div className="service-wrapper">
                <Header active="product"/>
                <div className="service-thank-wrapper">
                    <div className="service-thank-text-header">สั่งซื้อสินค้าเรียบร้อยแล้ว</div>
                    <img className="service-thank-img" src={images.check} />
                    <div className="service-thank-text">ระบบจะทำการดำเนินการตรวจสอบการสั่งซื้อของท่านและยืนยันภายใน 1 วันทำการ</div>
                    <Link className="service-thank-button-wrapper" to="/">
                        <button className="service-thank-button">กลับเข้าสู่หน้าแรก</button>
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

}

export default Confirmation