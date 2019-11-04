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
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

library.add(faArrowCircleLeft, faArrowCircleRight, faChevronLeft, faChevronRight)

const styles = {
    fadeIn: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}


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
            <StyleRoot>
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
                                    <div className="main-content-box-img-wrapper">
                                        <div className="main-content-box-img"></div>
                                    </div>
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
                                    <div className="main-content-box-img-wrapper">
                                        <div className="main-content-box-img"></div>
                                    </div>
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
                        <Tabs className="main-content-service" activeLinkStyle={{ background: '#7FD0DA', color: 'white' }}>
                            <div className="main-content-service-nav">
                                <TabLink className="main-content-service-tab" to="1">
                                    ตรวจเช็คเครื่องปรับอากาศ
                                </TabLink>
                                <TabLink className="main-content-service-tab" to="2">
                                    ทำความสะอาดด้วยระบบ High pressure
                                </TabLink>
                                <TabLink className="main-content-service-tab" to="3">
                                    นวัตกรรมแผ่นกรองอากาศ
                                </TabLink>
                                <TabLink className="main-content-service-tab" to="4">
                                    ฆ่าเชื้อด้วยไอน้ำร้อน 180 องศา
                                </TabLink>
                                <TabLink className="main-content-service-tab" to="5">
                                    เอกสารตรวจวัดและรับประกัน
                                </TabLink>
                            </div>
                            <TabContent className="main-content-service-box" for="1">
                                <div className="main-content-service-img-wrapper" style={styles.fadeIn}>
                                    <img className="main-content-service-img" src="../assets/images/airbanner.jpg" />
                                    <div className="main-content-service-slide">
                                        <FontAwesomeIcon className="main-content-service-icon" icon="chevron-right"/>
                                    </div>
                                </div>
                            </TabContent>
                            <TabContent className="main-content-service-box" for="2">
                                <div className="main-content-service-img-wrapper" style={styles.fadeIn}>
                                    <img className="main-content-service-img" src="../assets/images/airbanner.jpg" />
                                    <div className="main-content-service-slide">
                                        <FontAwesomeIcon className="main-content-service-icon" icon="chevron-right"/>
                                    </div>
                                </div>
                            </TabContent>
                            <TabContent className="main-content-service-box" for="3">
                                <div className="main-content-service-img-wrapper" style={styles.fadeIn}>
                                    <img className="main-content-service-img" src="../assets/images/airbanner.jpg" />
                                    <div className="main-content-service-slide">
                                        <FontAwesomeIcon className="main-content-service-icon" icon="chevron-right"/>
                                    </div>
                                </div>
                            </TabContent>
                            <TabContent className="main-content-service-box" for="4">
                                <div className="main-content-service-img-wrapper" style={styles.fadeIn}>
                                    <img className="main-content-service-img" src="../assets/images/airbanner.jpg" />
                                    <div className="main-content-service-slide">
                                        <FontAwesomeIcon className="main-content-service-icon" icon="chevron-right"/>
                                    </div>
                                </div>
                            </TabContent>
                            <TabContent className="main-content-service-box" for="5">
                                <div className="main-content-service-img-wrapper" style={styles.fadeIn}>
                                    <img className="main-content-service-img" src="../assets/images/airbanner.jpg" />
                                    <div className="main-content-service-slide">
                                        <FontAwesomeIcon className="main-content-service-icon" icon="chevron-right"/>
                                    </div>
                                </div>
                            </TabContent>
                        </Tabs>
                    </div>
                    <div className="main-content-airmask">
                        <div className="main-content-airmask-header">
                            <div className="main-content-airmask-header-text-blue">AIR</div>
                            <div className="main-content-airmask-header-text-sky">MASK</div>
                        </div>
                        <div className="main-content-airmask-text">สุดยอดการทำความสะอาดที่การันตีทั้งความสะอาดและคุณภาพอากาศตลอดปี</div>
                        <div className="main-content-airmask-view">
                            <div className="main-content-airmask-detail">
                                <div className="main-content-airmask-detail-wrapper">
                                    <div className="main-content-airmask-detail-text">เคลือบเปลือกมังคุดธรรมชาติปลอดภัยไร้เชื้อ</div>
                                    <div className="main-content-airmask-detail-circle"/>
                                </div>
                                <div className="main-content-airmask-detail-wrapper-delay-2">
                                    <div className="main-content-airmask-detail-text">กันฝุ่นในขณะที่ไม่ทำให้ลมดรอป</div>
                                    <div className="main-content-airmask-detail-circle"/>
                                </div>
                            </div>
                            <img className="main-content-airmask-img" src={images.airmask}/>
                            <div className="main-content-airmask-detail">
                                <div className="main-content-airmask-detail-wrapper-delay-4">
                                    <div className="main-content-airmask-detail-text">กรองฝุ่นขนาดเล็กได้ถึง PM 10.5</div>
                                    <div className="main-content-airmask-detail-circle"/>
                                </div>
                                <div className="main-content-airmask-detail-wrapper-delay-6">
                                    <div className="main-content-airmask-detail-text">เส้นใยถักทอไม่เป็นระเบียบ กรองได้ดีกว่า</div>
                                    <div className="main-content-airmask-detail-circle"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-content-footer">
                        <div className="main-content-footer-header">
                            <div className="main-content-footer-header-text-blue">บ้านปลอดภัยไร้ฝุ่น</div>
                            <div className="main-content-footer-header-text-sky">ให้INNOCAREดูแลคุณ</div>
                        </div>
                        <div className="main-content-footer-text">คืนอากาศสดชี่นให้คุณ INNOCARE พร้อมดูแลทุกปัญหาเรื่องฝุ่นด้วยประสบการณ์ทำงานกว่า 20 ปี</div>
                        <img className="main-content-footer-img" src="../assets/images/home.jpg"/>
                    </div>
                    <Footer />
                </div>
            </StyleRoot>
        )
    }
}

export default App