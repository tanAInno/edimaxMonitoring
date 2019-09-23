import React, { Component } from 'react';
import axios from 'axios'
import '../css/Thanks.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import Header from '../Header'
import Footer from '../Footer'
import { Link } from 'react-router-dom';

class Thanks extends Component {

    render() {
        return (
            <div className="service-wrapper">
                <Header active="service"/>
                <div className="service-thank-wrapper">
                    <div className="service-thank-text-header">ทำการจองบริการเรียบร้อยแล้ว</div>
                    <img className="service-thank-img" src={images.check} />
                    <div className="service-thank-text">ระบบจะทำการดำเนินการตรวจสอบบริการของท่านและยืนยันภายใน 1 วันทำการ</div>
                    <Link className="service-thank-button-wrapper" to="/service">
                        <button className="service-thank-button">กลับเข้าสู่หน้าแรก</button>
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

}

export default Thanks