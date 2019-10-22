import React, { Component } from 'react';
import axios from 'axios'
import './css/Main.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Monitor from './containers/Monitor'
import History from './containers/History'
import Header from './Header'
import Footer from './Footer'
import { Link, Redirect } from 'react-router-dom';
import './assets/fonts/fontface.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faArrowCircleRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Player } from 'video-react';
import "./node_modules/video-react/dist/video-react.css";
import images from './ImageStorage'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

library.add(faArrowCircleLeft, faArrowCircleRight, faChevronLeft, faChevronRight)

class App extends Component {

    state = {
        banner: 1,
        interval: 3000,
        arrow: true
    }

    componentDidMount() {
        this.setState({ interval: 3000 })
    }

    render() {
        return (
            <div className="main-container">
                <Header active="main" />
                <div className="main-all-banner-wrapper">
                    <div className="main-all-banner-wrapper">
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            autoPlay={true}
                            infiniteLoop={true}
                        >
                            <div>
                                <img className="main-banner-img" src={images.banner1} />
                                <p className="main-banner-opacity" />
                            </div>
                            <div>
                                <img className="main-banner-img" src={images.banner2} />
                                <p className="main-banner-opacity" />
                            </div>
                            <div>
                                <img className="main-banner-img" src={images.banner3} />
                                <p className="main-banner-opacity" />
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div className="triangle-left" />
                <div className="triangle-right" />
                <div className="triangle-out-left" />
                <div className="triangle-out-right" />
                <div className="main-header-text-container">
                    <div className="main-header-text-wrapper">
                        <div className="main-header-text-first">คุณหลับ</div>
                        <div className="main-header-text-second"> แต่เชื้อโรคไม่เคยหลับ</div>
                    </div>
                    <div className="main-header-text-content">เครื่องปรับอากาศของคุณจะกลายเป็นฝันร้ายยามค่ำคืน หากไม่ได้ล้างเป็นเวลานาน</div>
                    <div className="main-header-text-content">ฝุ่นและเชื้อราที่เกิดจากเครื่องปรับอากาศเป็นต้นเหตุการเกิดโรคต่างๆ</div>
                </div>
                <div className="main-content-blog">
                    <div className="main-content-blog-container">
                        <div className="main-content-blog-left">
                            <div className="main-content-box-first">
                                <img className="main-content-box-img" src="../assets/images/building.jpg" />
                                <div className="main-content-box-wrapper">
                                    <div className="main-content-box-header">แอร์ของคุณกำลังมีปัญหาหรือไม่?</div>
                                    <div className="main-content-box-text">ผู้คนส่วนใหญ่มักเข้าใจว่าภายในอาคารนั้นปลอดภัย เพราะมีการควบคุมอากาศด้วยระบบปรับอากาศที่มีการทำความสะอาดอยู่เสมอ แต่รู้หรือไม่ว่า? คุณภาพอากาศภายในอาคารนั้นไม่ได้ปลอดภัยอย่างแท้จริง</div>
                                    <div className="main-content-box-nav-right">เพิ่มเติม</div>
                                </div>
                            </div>
                            <div className="main-content-box">
                                <div className="main-content-box-wrapper">
                                    <div className="main-content-box-header">กำจัดฝุ่นอย่างไรให้ได้ผล</div>
                                    <div className="main-content-box-text">จากการวิจัยของ องค์กรอนามัยโลก (WHO) พบว่า 30% ของอาคารที่มนุษย์อาศัยอยู่นั้นมีปัญหามลพิษทางอากาศสูงกว่าภายนอกถึง 30 เท่า</div>
                                    <div className="main-content-box-nav-left">เพิ่มเติม</div>
                                </div>
                                <img className="main-content-box-img" src="../assets/images/building.jpg" />
                            </div>
                        </div>
                        <div className="main-content-blog-right">
                            <div className="main-content-question-header">ห้องที่คุณอยู่ปลอดภัยแค่ไหน</div>
                            <div className="main-content-question-text">ขนาดของห้อง</div>
                            <input className="main-content-question-input" />
                            <div className="main-content-question-text">จำนวนคน/วัน</div>
                            <input className="main-content-question-input" />
                            <div className="main-content-question-text">จำนวนแอร์</div>
                            <input className="main-content-question-input" />
                            <div className="main-content-result-container">
                                <div className="main-content-result-text">เชื้อโรค 5 ชนิด</div>
                                <div className="main-content-result-text">อัตราการเกิดโรค 40%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-content-service">
                    <div className="main-content-service-header">
                        <div className="main-content-service-header-text-blue">AIR</div>
                        <div className="main-content-service-header-text-blue">CLEANING</div>
                        <div className="main-content-service-header-text-sky">SERVICE</div>
                    </div>
                    <div className="main-content-service-text">สุดยอดการทำความสะอาดที่ได้มาตรฐานประสบการณ์ทำงานกว่า 20 ปี</div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default App