import React, { Component } from 'react';
import axios from 'axios'
import './css/Product.css'
import './css/Service.css'
import './css/Main.css'
import './css/Footer.css'
import './assets/fonts/fontface.css'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

class Footer extends Component {

    render() {
        return (
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-triangle-container">
                        <div className="footer-triangle-left"/>
                        <div className="footer-triangle-right"/>
                    </div>
                    <div className="footer-content-top">
                        <div className="footer-content-top-left">
                            <div className="footer-content-header">อินโนสำนักงานใหญ่</div>
                            <div className="footer-content-text">51/29-31 ถนนงามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900</div>
                        </div>
                        <div className="footer-content-top-left">
                            <div className="footer-content-header">ติดต่ออินโน</div>
                            <div className="footer-content-text">E-mail: contact@inno.co.th</div>
                            <div className="footer-content-text">Tel: 02-9414080-1</div>
                            <div className="footer-content-text">Fax: 02-9414082</div>
                        </div>
                        <div className="footer-content-top-center">
                            <div className="footer-content-header">ผลิตภัณฑ์และบริการ</div>
                            <div className="footer-content-text">บริการบริหารจัดการวิศวกรรมอาคาร</div>
                            <div className="footer-content-text">ที่ปรึกษาด้านบริหารจัดการพลังงาน</div>
                            <div className="footer-content-text">ระบบบริหารข้อมูลพลังงานทางไกล</div>
                            <div className="footer-content-text">บริการอบรมด้านการอนุรักษ์พลังงาน</div>
                            <div className="footer-content-text">งานปรับปรุงระบบวิศวกรรมอาคาร</div>
                        </div>
                        <div className="footer-content-top-right">
                            <div className="footer-content-header">INNOCARE</div>
                            <Link className="footer-content-text" style={{ textDecoration: 'none' }} to="/product"><div>PRODUCT</div></Link>
                            <Link className="footer-content-text" style={{ textDecoration: 'none' }} to="/service"><div>SERVICE</div></Link>
                            <Link className="footer-content-text" style={{ textDecoration: 'none' }} to="/blog"><div>BLOG</div></Link>
                        </div>
                        <div className="footer-content-top-right">
                            <div className="footer-content-header">ติดตามอินโน</div>
                            <div className="footer-content-text">Facebook</div>
                            <div className="footer-content-text">Line</div>
                            <div className="footer-content-text">Website</div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-text">บริษัท อินโนเวชั่น เทคโนโลยี จำกัด | INNOVATION TECHNOLOGY CO.,LTD.</div>
                </div>
            </div>
        )
    }

}

export default Footer