import React, { Component } from 'react';
import axios from 'axios'
import './css/Product.css'
import './css/Service.css'
import './css/Main.css'
import './assets/fonts/fontface.css'
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
                            <div className="footer-content-header">ADDRESS</div>
                            <div className="footer-content-text">51/29-31 Ngam Wong Wan Road Latyao, Chatuchak Bangkok 10900</div>
                        </div>
                        <div className="footer-content-top-left">
                            <div className="footer-content-header">CONTACT</div>
                            <div className="footer-content-text">E-mail: contact@inno.co.th</div>
                            <div className="footer-content-text">Tel: 02-9414080-1</div>
                            <div className="footer-content-text">Fax: 02-9414082</div>
                        </div>
                        <div className="footer-content-top-center">
                            <div className="footer-content-header">MONITORING</div>
                            <div className="footer-content-text">INNOCARE_BCC_1</div>
                            <div className="footer-content-text">INNOCARE_BCC_2</div>
                            <div className="footer-content-text">Phyathai Sriracha MED9</div>
                            <div className="footer-content-text">Grand_Mercure</div>
                        </div>
                        <div className="footer-content-top-right">
                            <div className="footer-content-header">PRODUCT</div>
                            <div className="footer-content-text">INNOCARE</div>
                            <div className="footer-content-text">Karcher</div>
                        </div>
                        <div className="footer-content-top-right">
                            <div className="footer-content-header">FOLLOW US</div>
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
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-text">บริษัทอินโนเวชั่นเทคโนโลยีจำกัด | INNOVATION TECHNOLOGY CO,.LTD.</div>
                </div>
            </div>
        )
    }

}

export default Footer