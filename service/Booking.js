import React, { Component } from 'react';
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Booking.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class Booking extends Component {

    render() {
        return(
            <div className="service-wrapper">
                <Header active="service"/>
                <div className="service-booking-wrapper">
                    <div className="service-booking-img-group">
                        <img className="service-booking-img" src={"../assets/images/air_1.jpg"}/>
                        <img className="service-booking-img" src={"../assets/images/air_2.jpg"}/>
                    </div>
                    <div className="service-booking-header">ล้างแอร์</div>
                    <div className="service-booking-order">
                        <div className="service-booking-order-wrapper">
                            <div className="service-booking-order-circle-active">1</div>
                            <div className="service-booking-order-text">รายการ</div>
                        </div>
                        <div className="service-booking-order-wrapper">
                            <div className="service-booking-order-circle">2</div>
                            <div className="service-booking-order-text">วันเวลา</div>
                        </div>
                        <div className="service-booking-order-wrapper">
                            <div className="service-booking-order-circle">3</div>
                            <div className="service-booking-order-text">เพิ่มเติม</div>
                        </div>
                        <div className="service-booking-order-wrapper">
                            <div className="service-booking-order-circle">4</div>
                            <div className="service-booking-order-text">ที่อยู่</div>
                        </div>
                        <div className="service-booking-order-wrapper">
                            <div className="service-booking-order-circle">5</div>
                            <div className="service-booking-order-text">ชำระเงิน</div>
                        </div>
                    </div>
                    <div className="service-booking-story">
                        <div className="service-booking-story-wrapper-side">
                            <img className="service-booking-story-img-high" src={"../assets/images/service_point.png"}/>
                            <div className="service-booking-story-text">สะดวก ล้างแอร์ได้ง่ายๆแค่จองผ่านเว็บไซต์ พร้อมรับสิทธิพิเศษมากมาย</div>
                        </div>
                        <div className="service-booking-story-wrapper-center">
                            <img className="service-booking-story-img" src={"../assets/images/service_time.png"}/>
                            <div className="service-booking-story-text">รวดเร็ว ด้วยการให้บริการแบบมืออาชีพโดยช่างผู้เชี่ยวชาญ</div>
                        </div>
                        <div className="service-booking-story-wrapper-side">
                            <img className="service-booking-story-img" src={"../assets/images/service_approve.png"}/>
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
                            <div className="service-booking-list-item">
                                <div className="service-booking-list-text-group">
                                    <div className="service-booking-list-item-text">9,000 - 18,000 BTU, แบบติดผนัง</div>
                                    <div className="service-booking-list-item-text">549 บาท / เครื่อง</div>
                                </div>
                                <button className="service-booking-list-button">เพิ่ม</button>
                            </div>
                            <div className="service-booking-list-item">
                                <div className="service-booking-list-text-group">
                                    <div className="service-booking-list-item-text">18,001 - 36,000 BTU, แบบติดผนัง</div>
                                    <div className="service-booking-list-item-text">749 บาท / เครื่อง</div>
                                </div>
                                <button className="service-booking-list-button">เพิ่ม</button>
                            </div>
                            <div className="service-booking-list-item">
                                <div className="service-booking-list-text-group">
                                    <div className="service-booking-list-item-text">9,000 - 18,000 BTU, แบบแขวน</div>
                                    <div className="service-booking-list-item-text">799 บาท / เครื่อง</div>
                                </div>
                                <button className="service-booking-list-button">เพิ่ม</button>
                            </div>
                            <div className="service-booking-list-item">
                                <div className="service-booking-list-text-group">
                                    <div className="service-booking-list-item-text">18,001 - 36,000 BTU, แบบแขวน</div>
                                    <div className="service-booking-list-item-text">899 บาท / เครื่อง</div>
                                </div>
                                <button className="service-booking-list-button">เพิ่ม</button>
                            </div>
                            <div className="service-booking-list-item">
                                <div className="service-booking-list-text-group">
                                    <div className="service-booking-list-item-text">9,000 - 18,000 BTU, แบบฝังฝ้า</div>
                                    <div className="service-booking-list-item-text">999 บาท / เครื่อง</div>
                                </div>
                                <button className="service-booking-list-button">เพิ่ม</button>
                            </div>
                            <div className="service-booking-list-item">
                                <div className="service-booking-list-text-group">
                                    <div className="service-booking-list-item-text">36,001 - 60,000 BTU, แบบฝังฝ้า</div>
                                    <div className="service-booking-list-item-text">1,349 บาท / เครื่อง</div>
                                </div>
                                <button className="service-booking-list-button">เพิ่ม</button>
                            </div>
                            <div className="service-booking-list-item">
                                <div className="service-booking-list-text-group">
                                    <div className="service-booking-list-item-text">9,000 - 24,000 BTU, แบบตู้ตั้ง</div>
                                    <div className="service-booking-list-item-text">1,199 บาท / เครื่อง</div>
                                </div>
                                <button className="service-booking-list-button">เพิ่ม</button>
                            </div>
                            <div className="service-booking-list-item">
                                <div className="service-booking-list-text-group">
                                    <div className="service-booking-list-item-text">9,000 - 36,000 BTU, 4 ทิศทาง</div>
                                    <div className="service-booking-list-item-text">999 บาท / เครื่อง</div>
                                </div>
                                <button className="service-booking-list-button">เพิ่ม</button>
                            </div>
                        </div>
                        <div className="service-booking-reserve">
                            <div className="service-booking-reserve-box">
                                <div className="service-booking-reserve-header">ล้างแอร์</div>
                                <div className="service-booking-reserve-total-wrapper">
                                    <div className="service-booking-reserve-total-header">รวมยอด</div>
                                    <div className="service-booking-reserve-total">0 บาท</div>
                                </div>
                            </div>
                            <button className="service-booking-reserve-button">ดำเนินการต่อ</button>
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
                <Footer/>
            </div>
        )
    }

}

export default Booking