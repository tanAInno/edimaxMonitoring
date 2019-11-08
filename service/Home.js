import React, { Component } from 'react';
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import { connect } from 'react-redux'
import '../assets/fonts/fontface.css'
import '../css/Service.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import Modal from 'react-modal';
import LoginModal from '../Register/LoginModal'
import images from '../ImageStorage'

const loginStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('body')

class Home extends Component {

    state = {
        loginmodalIsOpen: false,
    }

    openloginModal() {
        this.setState({ loginmodalIsOpen: true })
    }

    afterOpenloginModal() {
    }

    closeloginModal() {
        this.setState({ loginmodalIsOpen: false })
    }

    renderAirButton() {
        if (this.props.userReducer.user.name != undefined) {
            return (
                <div className="service-home-button-box">
                    <Link className="service-home-button-wrapper" style={{ textDecoration: 'none' }} to="/service/airservice">
                        <img className="service-home-button-img" src={images.air_1}/>
                    </Link>
                    <div className="service-home-button-text">บริการล้างแอร์</div>
                </div>
            )
        }
        if (this.props.userReducer.user.name == undefined) {
            return (
                <div className="service-home-button-box">
                    <img className="service-home-button-img" src={images.air_1} onClick={() => this.openloginModal()}/>
                    <div className="service-home-button-text">บริการล้างแอร์</div>
                </div>
            )
        }
    }

    renderAirMaskButton() {
        if (this.props.userReducer.user.name != undefined) {
            return (
                <div className="service-home-button-box">
                    <Link className="service-home-button-wrapper" style={{ textDecoration: 'none' }} to="/service/airmaskservice">
                        <img className="service-home-button-img" src={images.air_2}/>
                    </Link>
                    <div className="service-home-button-text">บริการล้างแอร์+airmask</div>
                </div>
            )
        }
        if (this.props.userReducer.user.name == undefined) {
            return (
                <div className="service-home-button-box">
                    <img className="service-home-button-img" src={images.air_2} onClick={() => this.openloginModal()}/>
                    <div className="service-home-button-text">บริการล้างแอร์+airmask</div>
                </div>
            )
        }
    }
    
    render() {
        return(
            <div className="service-wrapper">
                <Header active="service" />
                <div className="service-home-wrapper">
                    <div className="service-home-banner-wrapper">
                        <img className="service-home-banner-img" src="../assets/images/service_banner.jpg"/>
                        <div className="service-home-banner-detail-wrapper">
                            <div className="service-home-banner-detail-header">INNOCARE SERVICE</div>
                            <div className="service-home-banner-detail-text">บริการล้างแอร์แบบมืออาชีพ</div>
                            <Link className="service-home-banner-detail-button-wrapper" to="/service/booking"><button className="service-home-banner-detail-button">ตรวจสอบบริการ</button></Link>
                        </div>
                    </div>
                    <div className="service-home-story-wrapper">
                        <div className="service-home-story-box">
                            <img className="service-home-story-img" src="../assets/images/service_story1.jpg"/>
                            <div className="service-home-story-text">ตรวจเช็คเครื่องปรับอากาศ</div>
                        </div>
                        <div className="service-home-story-box">
                            <img className="service-home-story-img" src="../assets/images/service_story2.jpg"/>
                            <div className="service-home-story-text">ทำความสะอาดระบบ High Pressure</div>
                        </div>
                        <div className="service-home-story-box">
                            <img className="service-home-story-img" src="../assets/images/service_story3.jpg"/>
                            <div className="service-home-story-text">นวัตกรรมแผ่นกรองอากาศ</div>
                        </div>
                        <div className="service-home-story-box">
                            <img className="service-home-story-img" src="../assets/images/service_story4.jpg"/>
                            <div className="service-home-story-text">ฆ่าเชื้อโรคด้วยไอน้ำร้อน 180 องศา</div>
                        </div>
                        <div className="service-home-story-box">
                            <img className="service-home-story-img" src="../assets/images/service_story5.jpg"/>
                            <div className="service-home-story-text">เอกสารตรวจวัดและรับประกัน</div>
                        </div>
                    </div>
                    <div className="service-home-detail-wrapper">
                        <div className="service-home-detail-header">
                            <div className="service-home-detail-header-blue">AIR CLEANING</div>
                            <div className="service-home-detail-header-sky">SERVICE</div>
                        </div>
                        <div className="service-home-detail-subheader">สุดยอดการทำความสะอาดที่ได้มาตรฐานรับประกันจากประสบการณ์ทำงานกว่า 20 ปี</div>
                        <div className="service-home-detail-text">ช่างมืออาชีพที่พร้อมบริการท่านด้วย ความรู้ความชำนาญอย่างแท้จริงเกี่ยวกับเครื่องปรับอากาศ มายาวนานกว่า 20 ปี ด้วยเครื่องมือที่ทันสมัย การฆ่าเชื้อโรคหลังทำความสะอาดด้วยไอน้ำร้อนถึง 180 องศาเซลเซียส และนวัตกรรมแผ่นกรองอากาศสำหรับเครื่องปรับอากาศ ที่จะช่วยอากาศที่ท่านหายใจเข้าไปทุกวัน สะอาดมากยิ่งขึ้น เพียงเปลี่ยน เดือนละ 1 ครั้งทำให้ไม่ต้องทำความสะอาดเครื่องปรับอากาศเลย ถึง 2 ปี</div>
                    </div>
                    <div className="service-home-button-wrapper">
                        <div className="service-home-button-group">
                            <img className="service-home-button-img" src="../assets/images/service_airmask.jpg"/>
                            <div className="service-home-button-detail-right">
                                <div className="service-home-button-text-wrapper">
                                    <div className="service-home-button-text-blue">ล้างแอร์ + </div>
                                    <div className="service-home-button-text-sky">AIRMASK </div>
                                </div>
                                <div className="service-home-button-text-wrapper">
                                    <div className="service-home-button-text-blue">ดีกว่ายังไง?</div>
                                </div>
                                <Link className="service-home-button-button-wrapper" to="/service/booking"><button className="service-home-button-button" to="/booking">ดูเพิ่มเติม</button></Link>
                            </div>
                        </div>
                        <div className="service-home-button-group">
                            <div className="service-home-button-detail-left">
                                <div className="service-home-button-text-wrapper">
                                    <div className="service-home-button-text-blue">จองบริการล้างแอร์</div>
                                </div>
                                <Link className="service-home-button-button-wrapper" to="/service/booking"><button className="service-home-button-button" to="/booking">ดูเพิ่มเติม</button></Link>
                            </div>
                            <img className="service-home-button-img" src="../assets/images/service_air.jpg"/>
                        </div>
                    </div>
                </div>
                <Modal
                        isOpen={this.state.loginmodalIsOpen}
                        onAfterOpen={() => this.afterOpenloginModal()}
                        onRequestClose={() => this.closeloginModal()}
                        contentLabel="Login"
                        style={loginStyles}
                    >
                        <LoginModal />
                </Modal>
                <Footer/>
            </div>
        )
    }

}

export default connect(state => state)(Home)