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
                        <img className="service-home-button-img" src="../assets/images/air_img.jpg"/>
                    </Link>
                    <div className="service-home-button-text">บริการล้างแอร์</div>
                </div>
            )
        }
        if (this.props.userReducer.user.name == undefined) {
            return (
                <div className="service-home-button-box">
                    <img className="service-home-button-img" src="../assets/images/air_img.jpg" onClick={() => this.openloginModal()}/>
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
                        <img className="service-home-button-img" src="../assets/images/airmask_img.jpg"/>
                    </Link>
                    <div className="service-home-button-text">บริการล้างแอร์+airmask</div>
                </div>
            )
        }
        if (this.props.userReducer.user.name == undefined) {
            return (
                <div className="service-home-button-box">
                    <img className="service-home-button-img" src="../assets/images/airmask_img.jpg" onClick={() => this.openloginModal()}/>
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
                    <img className="service-home-img" src="../assets/images/air_banner.jpg"/>
                    <div className="service-home-header">
                        <img className="service-home-header-img" src="../assets/images/LogoWhite.png"/>
                        <div className="service-home-header-innocare">
                            <div className="service-home-header-inno">INNO</div>
                            <div className="service-home-header-care">CARE</div>
                        </div>
                        <div className="service-home-header-text">ให้บริการด้วยทีมงานมืออาชีพ</div>
                    </div>
                    <div className="service-home-story">
                        <div className="service-home-story-box">
                            <img className="service-home-story-img" src="../assets/images/air_story1.png"/>
                            <div className="service-home-story-text">ล้างแอร์โดยช่างผู้เชี่ยวชาญ</div>
                        </div>
                        <div className="service-home-story-box">
                            <img className="service-home-story-img" src="../assets/images/air_story2.png"/>
                            <div className="service-home-story-text">ฆ่าเชื้อด้วยไอน้ำร้อนแรงดันสูง</div>
                        </div>
                        <div className="service-home-story-box">
                            <img className="service-home-story-img" src="../assets/images/air_story3.png"/>
                            <div className="service-home-story-text">รับประกันนาน 60 วัน</div>
                        </div>
                    </div>
                    <div className="service-home-text-header">บริการที่เราแนะนำ</div>
                    <div className="service-home-button-group">
                        {this.renderAirButton()}
                        {this.renderAirMaskButton()}
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