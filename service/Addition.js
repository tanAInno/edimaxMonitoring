import React, { Component } from 'react';
import dateFns from "date-fns";
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Addition.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setServices, setTotalPrice } from '../actions/service'

class Addition extends Component {

    renderChoosenItems() {
        return (
            this.props.serviceReducer.services.map((data, index) => {
                return (
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

    render() {
        const format = "D MMMM YYYY"
        let th = require('date-fns/locale/th')
        return (
            <div className="service-wrapper">
                <Header active="service" />
                <div className="service-addition-wrapper">
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
                            <div className="service-booking-order-circle-active">2</div>
                            <div className="service-booking-order-text">วันเวลา</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/addition">
                            <div className="service-booking-order-circle-active">3</div>
                            <div className="service-booking-order-text">เพิ่มเติม</div>
                        </Link>
                        <div className="service-booking-order-wrapper">
                            <div className="service-booking-order-circle">4</div>
                            <div className="service-booking-order-text">ที่อยู่</div>
                        </div>
                        <div className="service-booking-order-wrapper">
                            <div className="service-booking-order-circle">5</div>
                            <div className="service-booking-order-text">ชำระเงิน</div>
                        </div>
                    </div>
                    <div className="service-addition-header">ใส่รายละเอียดเพิ่มเติม</div>
                    <div className="service-addition-content">
                        <div className="service-addition-input-area">
                            <div className="service-addition-type-box">
                                <div className="service-addition-type-header">
                                    ลักษณะพื้นที่
                                </div>
                                <div className="service-addition-radio-group">
                                    <form>
                                        <div className="service-addition-radio-row">
                                            <div className="service-addition-radio"><input type="radio" name="type" value="บ้านเดี่ยว" /> บ้านเดี่ยว</div>
                                            <div className="service-addition-radio"><input type="radio" name="type" value="ตึกแถว/ทาวน์โฮม" /> ตึกแถว/ทาวน์โฮม</div>
                                        </div>
                                        <div className="service-addition-radio-row">
                                            <div className="service-addition-radio"><input type="radio" name="type" value="อพาร์ทเม้น/คอนโด" /> อพาร์ทเม้น/คอนโด</div>
                                            <div className="service-addition-radio"><input type="radio" name="type" value="สำนักงาน" /> สำนักงาน</div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="service-booking-reserve">
                            <div className="service-booking-reserve-box">
                                <div className="service-booking-reserve-header">ล้างแอร์</div>
                                {this.renderChoosenItems()}
                                <div className="service-booking-reserve-date-wrapper">
                                    <div className="service-booking-reserve-date-header">วันที่</div>
                                    <div className="service-booking-reserve-date">{dateFns.format(this.props.serviceReducer.selectedDate, format, { locale: th })}</div>
                                </div>
                                <div className="service-booking-reserve-date-wrapper">
                                    <div className="service-booking-reserve-date-header">เวลา</div>
                                    <div className="service-booking-reserve-date">{this.props.serviceReducer.selectedTime}</div>
                                </div>
                                <div className="service-booking-reserve-total-wrapper">
                                    <div className="service-booking-reserve-total-header">รวมยอด</div>
                                    <div className="service-booking-reserve-total">{this.props.serviceReducer.totalprice} บาท</div>
                                </div>
                            </div>
                            <Link className="service-booking-reserve-button-wrapper" style={{ textDecoration: 'none' }} to="/service/addition">
                                <button className="service-booking-reserve-button">ดำเนินการต่อ</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default connect(state => state)(Addition)