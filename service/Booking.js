import React, { Component } from 'react';
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Booking.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setServices, setTotalServicePrice } from '../actions/service'
import list from '../list'

class Booking extends Component {

    renderItems(type) {
        return(
            list.serviceList.map((data, index) => {
                if(data.type == type)
                return (
                    <div className="service-booking-list-item">
                        <div className="service-booking-list-text-group">
                            <div className="service-booking-list-item-text">{data.name}</div>
                            <div className="service-booking-list-item-text">{data.price} บาท / เครื่อง</div>
                        </div>
                        <button className="service-booking-list-button" onClick={() => this.addService(data)}>เพิ่ม</button>
                    </div>
                )
            })
        )
    }

    renderChoosenItems() {
        return(
            this.props.serviceReducer.services.map((data,index) => {
                return(
                    <div className="service-booking-reserve-item-wrapper">
                        <div className="service-booking-reserve-item-header">{data.name}</div>
                        <div className="service-booking-reserve-item">
                            <button className="service-booking-reserve-item-minus" onClick={() => this.minus(data)}>-</button>
                            <div className="service-booking-reserve-item-amount">{data.amount}</div>
                            <button className="service-booking-reserve-item-plus" onClick={() => this.plus(data)}>+</button>
                            <button className="service-booking-reserve-item-delete" onClick={() => this.delete(data)}>ลบ</button>
                        </div>
                    </div>
                )
            })
        )
    }

    addService(data) {
        let services = this.props.serviceReducer.services
        let newobj = { name: data.name,
                    price: data.price,
                    amount: 1}
        let exist = false
        for (let i = 0; i < services.length; i++) {
            if (services[i].name == data.name) {
                services[i].amount += 1
                exist = true
            }
        }
        if (!exist)
            services.push(newobj)
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice + data.price))
        this.renderChoosenItems()
    }

    plus(data) {
        let services = this.props.serviceReducer.services
        services[services.indexOf(data)].amount += 1
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice + data.price))
    }

    minus(data) {
        let services = this.props.serviceReducer.services
        let index = services.indexOf(data)
        if (services[index].amount > 1){
            services[index].amount -= 1
            this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice - data.price))
        }
    }

    delete(data) {
        let services = this.props.serviceReducer.services
        let index = services.indexOf(data)
        services.splice(index, 1)
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice - (data.price * data.amount)))
    }

    render() {
        return (
            <div className="service-wrapper">
                <Header active="service" />
                <div className="service-booking-wrapper">
                    <div className="service-booking-img-group">
                        <img className="service-booking-img" src={"../assets/images/air_1.jpg"} />
                        <img className="service-booking-img" src={"../assets/images/air_2.jpg"} />
                    </div>
                    <div className="service-booking-header">ล้างแอร์</div>
                    <div className="service-booking-order">
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/booking">
                            <div className="service-booking-order-circle-active">1</div>
                            <div className="service-booking-order-text">รายการ</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/datetime">
                            <div className="service-booking-order-circle">2</div>
                            <div className="service-booking-order-text">วันเวลา</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/addition">
                            <div className="service-booking-order-circle">3</div>
                            <div className="service-booking-order-text">เพิ่มเติม</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/address">
                            <div className="service-booking-order-circle">4</div>
                            <div className="service-booking-order-text">ที่อยู่</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/payment">
                            <div className="service-booking-order-circle">5</div>
                            <div className="service-booking-order-text">ชำระเงิน</div>
                        </Link>
                    </div>
                    <div className="service-booking-story">
                        <div className="service-booking-story-wrapper-side">
                            <img className="service-booking-story-img-high" src={"../assets/images/service_point.png"} />
                            <div className="service-booking-story-text">สะดวก ล้างแอร์ได้ง่ายๆแค่จองผ่านเว็บไซต์ พร้อมรับสิทธิพิเศษมากมาย</div>
                        </div>
                        <div className="service-booking-story-wrapper-center">
                            <img className="service-booking-story-img" src={"../assets/images/service_time.png"} />
                            <div className="service-booking-story-text">รวดเร็ว ด้วยการให้บริการแบบมืออาชีพโดยช่างผู้เชี่ยวชาญ</div>
                        </div>
                        <div className="service-booking-story-wrapper-side">
                            <img className="service-booking-story-img" src={"../assets/images/service_approve.png"} />
                            <div className="service-booking-story-text">ปลอดภัย ผู้ให้บริการได้รับการอบรมและตรวจสอบประวัติอาชญากรรม</div>
                        </div>
                    </div>
                    <div className="service-booking-area">
                        <div className="service-booking-area-header">เขตพื้นที่ให้บริการ</div>
                        <div className="service-booking-area-content">กรุงเทพมหานคร</div>
                        <div className="service-booking-area-content">ปทุมธานี</div>
                        <div className="service-booking-area-content">ปราจีนบุรี</div>
                        <div className="service-booking-area-content">สระบุรี</div>
                    </div>
                    <div className="service-booking-sub-header">เลือกรายการบริการ</div>
                    <div className="service-booking-list">
                        <div className="service-booking-list-table">
                            ​<div className="service-booking-list-header">แบบติดผนัง</div>
                                {this.renderItems("ติดผนัง")}
                                <div className="service-booking-list-header">แบบแขวน</div>
                                {this.renderItems("แขวน")}
                                <div className="service-booking-list-header">แบบฝังฝ้า</div>
                                {this.renderItems("ฝังฝ้า")}
                                <div className="service-booking-list-header">แบบตู้ตั้ง</div>
                                {this.renderItems("ตู้ตั้ง")}
                                <div className="service-booking-list-header">แบบ 4 ทิศทาง</div>
                                {this.renderItems("4 ทิศ")}
                        </div>
                        <div className="service-booking-reserve">
                            <div className="service-booking-reserve-box">
                                <div className="service-booking-reserve-header">ล้างแอร์</div>
                                {this.renderChoosenItems()}
                                <div className="service-booking-reserve-total-wrapper">
                                    <div className="service-booking-reserve-total-header">รวมยอด</div>
                                    <div className="service-booking-reserve-total">{this.props.serviceReducer.totalprice} บาท</div>
                                </div>
                            </div>
                            <Link className="service-booking-reserve-button-wrapper" style={{ textDecoration: 'none' }} to="/service/datetime">
                                <button className="service-booking-reserve-button">ดำเนินการต่อ</button>
                            </Link>
                        </div>
                    </div>
                    <div className="service-booking-requirement">
                        <div className="service-booking-requirement-header">ข้อกำหนดการให้บริการ</div>
                        <div className="service-booking-requirement-box">
                            <div className="service-booking-requirement-text">มีประกันหลังการล้างแอร์สูงสุด 15 วัน</div>
                            <div className="service-booking-requirement-text">แนะนำให้จองบริการล่วงหน้า 6-8 ชั่วโมง หากจองในเวลากระชั้นชิด อาจจะไม่มีผู้ให้บริการรับงานของคุณ</div>
                            <div className="service-booking-requirement-text">ราคารวมค่าเดินทางของผู้ให้บริการเรียบร้อยแล้ว</div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default connect(state => state)(Booking)