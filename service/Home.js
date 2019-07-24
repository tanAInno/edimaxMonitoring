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

    renderModalButton() {
        if (this.props.userReducer.user.name != undefined) {
            return (
                <Link className="service-home-button-wrapper" style={{ textDecoration: 'none' }} to="/service/booking">
                    <button className="service-home-button">จองบริการ</button>
                </Link>
            )
        }
        if (this.props.userReducer.user.name == undefined) {
            return (
                <div className="shopping-home-button-wrapper">
                    <button className="service-home-button" onClick={() => this.openloginModal()}>จองบริการ</button>
                </div>
            )
        }
    }
    
    render() {
        return(
            <div className="service-wrapper">
                <Header active="service" />
                <div className="service-home-wrapper">
                    <div className="service-home-header">บริการล้างแอร์</div>
                    <img className="service-home-img" src={"../assets/images/serviceair.jpg"} />
                    <div className="service-home-content">
                        <div className="service-home-content-text">ล้างแอร์ ทำความสะอาดเครื่องปรับอากาศ เหมาะสำหรับแอร์ที่ไม่ได้ทำการล้างมามากกว่า 6 เดือน เพื่อประหยัดไฟและรักษาสุขภาพ</div>
                        <div className="service-home-content-header-red">เงื่อนไขการให้บริการ</div>
                        <div className="service-home-content-subtext">1.    ตรวจสอบการทำงานของเครื่องปรับอากาศโดยรวมว่าทำงานปกติหรือไม่ เช่น ความเร็วลม เสียงการทำงาน อุณหภูมิ ปริมาณน้ำยา การทำงานตัวเครื่องภายใน (คอยล์เย็น) และการทำงานตัวเครื่องภายนอก (คอยล์ร้อน) พร้อมออกใบรายงานการทดสอบในแต่ละครั้ง</div>
                        <div className="service-home-content-subtext">2.    ทำความสะอาดพัดลมกรงกระรอก และฟิลคอยล์ (Evaporator) ด้วยปั้มน้ำแรงดันสูง / เป่าทำความสะอาดด้วย Blower / ล้างทำความสะอาดแผ่นกรองอากาศ (Filter) / ฆ่าเชื้อด้วยไอน้ำอุณหภูมิสูง / ตรวจเช็คจุดต่อสายไฟภายในระบบ และยึดสะกรูไฟให้แน่น / ติดตั้ง Airmask บริเวณ Return ของเครื่องปรับอากาศ</div>
                        <div className="service-home-content-subtext">3.    ค่าใช้จ่ายในการให้บริการ ไม่รวมถึงวัสดุอุปกรณ์และอะไหล่ที่ชำรุดเสียหายและน้ำยาสารทำความเย็น</div>
                        <div className="service-home-content-subtext">4.    หากเครื่องปรับอากาศ เกิดการชำรุดและจำเป็นต้องซ่อมแก้ไข เปลี่ยนอุปกรณ์หรืออะไหล่ เจ้าหน้าที่จะแจ้งให้ผู้ว่าจ้างทราบโดยการ เสนอราคาค่าใช้จ่ายอุปกรณ์ อะไหล่ ค่าแรงและสารทำความเย็นโดยไม่คิดค่าเดินทาง</div>
                        <div className="service-home-content-subtext">5.    อุปกรณ์และอะไหล่ที่เปลี่ยน ทางผู้รับจ้างจะจัดหาอุปกรณ์และอะไหล่ที่เป็นผลิตภัณฑ์เดียวกับที่ชำรุด หรือมีคุณภาพเทียบเท่า</div>
                        <div className="service-home-content-subtext">6.    ชิ้นส่วนอุปกรณ์ อะไหล่ที่ชำรุด และที่ไม่สามารถซ่อมได้ เมื่อมีการเปลี่ยนใหม่จะคืนชิ้นส่วนที่ชำรุดนั้น ให้ผู้ว่าจ้างเก็บไว้เป็นหลักฐาน</div>
                        <div className="service-home-content-subtext">7.    การดำเนินการบริการตรวจเช็ค ซ่อมแก้ไข เปลี่ยนอุปกรณ์หรืออะไหล่ ทางผู้รับจ้างจะทำรายงานสรุปผลการดำเนินงาน พร้อมทั้งระบุหัวหน้าและจำนวนคนที่ไปดำเนินการให้ผู้ว่าจ้างทราบทุกครั้ง</div>
                        <div className="service-home-content-subtext">8.    ทางผู้รับจ้างจะรับประกันการซ่อม เฉพาะจุดที่ทำการซ่อมเป็นระยะเวลา 60 วัน นับจากวันที่ทำการซ่อมแล้วเสร็จ</div>
                        <div className="service-home-content-subtext">9.    ผู้รับจ้างจะเข้าไปดำเนินการตรวจเช็คภายใน 24 ชั่วโมงอย่างเร็วสุดหรือช้าสุดภายใน 48 ชั่วโมงหลังจากได้รับแจ้งจากผู้ว่าจ้าง</div>
                        <div className="service-home-content-subtext">10.   ทางผู้รับจ้างจะจัดส่งช่างไปตรวจซ่อม หลังจากได้รับการแจ้งปัญหาจากผู้ว่าจ้างและดำเนินการอย่างต่อเนื่องจนกว่าจะใช้งานได้ตามปกติ</div>
                        <div className="service-home-content-subtext">11.   ในกรณีที่จำเป็นต้องใช้นั่งร้านหรือใช้อุปกรณ์พิเศษในการให้บริการ ทางผู้ว่าจ้างต้องจัดหาและรับผิดชอบค่าใช้จ่ายที่เกิดขึ้น</div>
                    </div>
                    {this.renderModalButton()}
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