import React, { Component } from 'react';
import axios from 'axios'
import '../css/Thanks.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import Header from '../Header'
import Footer from '../Footer'
import { Link } from 'react-router-dom';

class RegisterConfirm extends Component {

    render() {
        return (
            <div className="service-wrapper">
                <Header active="main"/>
                <div className="service-thank-wrapper">
                    <div className="service-thank-text-header">ทำการสมัครสมาชิกเรียบร้อยแล้ว</div>
                    <img className="service-thank-img" src="../assets/images/check.png" />
                    <div className="service-thank-text">ขอบคุณที่ร่วมสมัครสมาชิกกับ INNOCARE</div>
                    <Link className="service-thank-button-wrapper" to="/">
                        <button className="service-thank-button">กลับเข้าสู่หน้าแรก</button>
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

}

export default RegisterConfirm