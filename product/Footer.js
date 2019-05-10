import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import '../assets/fonts/EkkamaiStandard-Light.css'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

class Footer extends Component {

    render() {
        return (
            <div className="footer-container">
                <div className="footer-top" />
                <div className="footer-center" />
                <div className="footer-content">
                    <div className="footer-content-top">
                        <div className="footer-content-top-left">
                            <div className="footer-content-header">ติดต่อเรา</div>
                            <div className="footer-space-20" />
                            <div className="footer-content-text">address: 51/29-31 Ngam Wong Wan Road Latyao, Chatuchak, Bangkok 10900</div>
                            <div className="footer-space-20" />
                            <div className="footer-content-text">email: contact@inno.co.th</div>
                            <div className="footer-space-30" />
                            <div className="footer-content-text">tel: 66(0) 29414080-1</div>
                            <div className="footer-content-text">fax: 66(0) 29414082</div>
                        </div>
                        <div className="footer-content-top-center">
                            <div className="footer-content-header">หมวดหมู่สินค้า</div>
                            <div className="footer-space-20" />
                            <div className="footer-content-text">INNOCARE</div>
                            <div className="footer-content-text">KARCHER</div>
                            <div className="footer-content-text">OTHER</div>
                        </div>
                        <div className="footer-content-top-right">
                            <div className="footer-content-header">ติดตามเรา</div>
                            <div className="footer-space-15" />
                            <div className="footer-content-group">
                                <img className="footer-logo-img" src={"../assets/images/facebook-black.png"} />
                                <div className="footer-content-text">Facebook</div>
                            </div>
                            <div className="footer-content-group">
                                <img className="footer-logo-img" src={"../assets/images/line-black.png"} />
                                <div className="footer-content-text">Line</div>
                            </div>
                            <div className="footer-content-group">
                                <img className="footer-logo-img" src={"../assets/images/website.jpg"} />
                                <div className="footer-content-text">Website</div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-content-bottom">
                        <img className="footer-img" src={"../assets/images/inno.jpg"} />
                        <div className="footer-horizontal-space-7" />
                        <img className="footer-img" src={"../assets/images/logo.png"} />
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-text">บริษัทอินโนเวชั่นเทคโนโลยีจำกัด | INNOVATION TECHNOLOGY CO,.LTD.</div>
                </div>
            </div>
        )
    }

}

export default Footer

//#8X8C8C