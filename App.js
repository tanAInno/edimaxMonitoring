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
import { faArrowCircleLeft, faArrowCircleRight, faChevronLeft, faChevronRight, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Player } from 'video-react';
import "./node_modules/video-react/dist/video-react.css";
import images from './ImageStorage'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

library.add(faArrowCircleLeft, faArrowCircleRight, faChevronLeft, faChevronRight, faArrowLeft, faArrowRight)

const styles = {
    fadeIn: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}

const detail = [
    {header: "ตรวจเช็คเครื่องปรับอากาศ ด้วยเครื่องมือที่ทันสมัย", detail: "- ปริมาณ และชนิด น้ำยาแอร์ ก่อนล้าง\n- อุณหภูมิ ก่อน/หลัง ทำความสะอาดเครื่องปรับอากาศ\n- กระแสคอมเพรสเซอร์ (เช็คความผิดปกติของเครื่องปรับอากาศ)\n- ความเร็วลมจ่าย ก่อน/หลัง ทำความสะอาดเครื่องปรับอากาศ"},
    {header: "ทำความสะอาดเครื่องปรับอากาศด้วย High pressure", detail: "ที่ปรับระดับแรงดันได้ มั่นใจได้ว่า เครื่องปรับอากาศของท่านจะ\nไม่เสียหายเนื่องจากแรงดันน้ำที่สูงไปอย่างแน่นอน"},
    {header: "ทำการฆ่าเชื้อโรคด้วย ไอน้ำร้อน 180 องศาเซลเซียส", detail: "หลังทำความสะอาดเครื่องปรับอากาศ เพื่อให้ท่านได้มั่นใจ\nทุกครั้งเมื่อเปิดใช้"},
    {header: "Airmask นวัตกรรมแผ่นกรองอากาศสำหรับเครื่องปรับอากาศ", detail: "เพื่อให้อากาศที่ท่านใช้ในทุกวัน สะอาดเหมือนใหม่ ด้วยความพิเศษ\nของเส้นใยที่เป็นแบบ Nonwoven ทำให้เส้นใยเกิดคุณสมบัติพิเศษ\nซึ่งสามารถกรองฝุ่นละเอียดที่ผลต่อร่างกายมนุษย์ ทำให้อากาศ\nของโรคที่เกิดจากฝุ่นนั้นลดลง"},
    {header: "เอกสารตรวจวัด", detail: "รับประกันการทำความสะอาดนานถึง 60 วันนับตั้งแต่วันที่\nให้บริการ"},
]


class App extends Component {

    state = {
        banner: 1,
        interval: 3000,
        arrow: true,
        toggleOn: false,
    }

    componentDidMount() {
        this.setState({ interval: 3000 })
    }

    renderToggle(index) {
        if (this.state.toggleOn == false)
            return (
                <div className="main-content-service-slide" onClick={() => { this.setState({ toggleOn: true }) }}>
                    <FontAwesomeIcon className="main-content-service-icon" icon="chevron-right" />
                    <div className="main-content-service-slide-text">รายละเอียด</div>
                </div>
            )
        else
            return (
                <div className="main-content-service-slide-toggle">
                    <div className="main-content-service-slide-wrapper" onClick={() => { this.setState({ toggleOn: false }) }}>
                        <FontAwesomeIcon className="main-content-service-icon" icon="chevron-left" />
                        <div className="main-content-service-slide-text">รายละเอียด</div>
                    </div>
                    <div className="main-content-service-detail">
                        <div className="main-content-service-detail-header">{detail[index].header}</div>
                        <div className="main-content-service-detail-text">{detail[index].detail}</div>
                        <Link className="main-content-service-detail-button-wrapper" to="/service"><button className="main-content-service-detail-button">รายละเอียด</button></Link>
                    </div>
                </div>
            )
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
                                                <div className="main-content-box-img">
                                                    <img className="main-content-box-img" src="../assets/images/IAQHead.jpg"/>
                                                </div>
                                            </div>
                                            <div className="main-content-box-wrapper">
                                                <div className="main-content-box-header">(IAQ) Indoor Air Quality Solution</div>
                                                <div className="main-content-box-text">ในปัจจุบัน ผู้คนส่วนใหญ่มักเข้าใจว่าภายในอาคารนั้นปลอดภัย เพราะมีการควบคุมอากาศด้วยระบบปรับอากาศที่มีการทำความสะอาดอยู่เสมอ แต่รู้หรือไม่ว่า ? คุณภาพอากาศภายในนั้นอาคารนั้นไม่ได้ปลอดภัยอย่างแท้จริง</div>
                                                <div className="main-content-box-nav-wrapper-right">
                                                    <Link className="main-content-box-nav-right" to="/blog/iaq">เพิ่มเติม</Link>
                                                    <FontAwesomeIcon className="main-content-box-nav-icon" icon="arrow-right" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-content-box">
                                            <div className="main-content-box-wrapper">
                                                <div className="main-content-box-header">เลือกเครื่องปรับอากาศให้ประหยัดพลังงาน และประหยัดเงิน</div>
                                                <div className="main-content-box-text">หลายคนกำลังเลือกซื้อเครื่องปรับอากาศที่ประหยัดพลังงาน และประหยัดเงิน แต่ก็ไม่รู้จะเลือกซื้อเครื่องปรับอากาศอย่างไรดีให้ได้ประสิทธิภาพที่สูงสุด อินโนแคร์จึงขอนำความรู้เบื้องต้นในการเลือกซื้อเครื่องปรับอากาศมาฝาก</div>
                                                <div className="main-content-box-nav-wrapper-left">
                                                    <FontAwesomeIcon className="main-content-box-nav-icon" icon="arrow-left" />
                                                    <Link className="main-content-box-nav-left" to="/blog/air">เพิ่มเติม</Link>
                                                </div>
                                            </div>
                                            <div className="main-content-box-img-wrapper">
                                                <div className="main-content-box-img">
                                                    <img className="main-content-box-img" src="../assets/images/AirHeader.jpg"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="main-content-box-first" style={{marginTop: '20px'}}>
                                            <div className="main-content-box-img-wrapper">
                                                <div className="main-content-box-img">
                                                    <img className="main-content-box-img" src="../assets/images/FilterHeader.jpg"/>
                                                </div>
                                            </div>
                                            <div className="main-content-box-wrapper">
                                                <div className="main-content-box-header">เครื่องปรับอากาศ อาจเป็นแหล่งเพาะเชื้อโรค….</div>
                                                <div className="main-content-box-text">เพราะเครื่องปรับอากาศหากยิ่งเปิดใช้งานบ่อยและนานเท่าไหร่ ก็จะยิ่งมีฝุ่นเข้าไปสะสมภายในเครื่องปรับอากาศมากขึ้นเท่านั้น ทำให้เครื่องปรับอากาศกลายเป็นแหล่งสะสมของฝุ่นและแบคทีเรีย ซึ่งความชื้นภายในเครื่องปรับอากาศจะทำให้แบคทีเรียที่สะสมอยู่นั้นกลายเป็นแหล่งเชื้อโรคในทันที</div>
                                                <div className="main-content-box-nav-wrapper-right">
                                                    <Link className="main-content-box-nav-right" to="/blog/filter">เพิ่มเติม</Link>
                                                    <FontAwesomeIcon className="main-content-box-nav-icon" icon="arrow-right" />
                                                </div>
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
                                            <img className="main-content-service-img" src="../assets/images/service1.jpg" />
                                            {this.renderToggle(0)}
                                        </div>
                                    </TabContent>
                                    <TabContent className="main-content-service-box" for="2">
                                        <div className="main-content-service-img-wrapper" style={styles.fadeIn}>
                                            <img className="main-content-service-img" src="../assets/images/service2.jpg" />
                                            {this.renderToggle(1)}
                                        </div>
                                    </TabContent>
                                    <TabContent className="main-content-service-box" for="3">
                                        <div className="main-content-service-img-wrapper" style={styles.fadeIn}>
                                            <img className="main-content-service-img" src="../assets/images/service3.jpg" />
                                            {this.renderToggle(2)}
                                        </div>
                                    </TabContent>
                                    <TabContent className="main-content-service-box" for="4">
                                        <div className="main-content-service-img-wrapper" style={styles.fadeIn}>
                                            <img className="main-content-service-img" src="../assets/images/service4.jpg" />
                                            {this.renderToggle(3)}
                                        </div>
                                    </TabContent>
                                    <TabContent className="main-content-service-box" for="5">
                                        <div className="main-content-service-img-wrapper" style={styles.fadeIn}>
                                            <img className="main-content-service-img" src="../assets/images/service5.jpg" />
                                            {this.renderToggle(4)}
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
                                            <div className="main-content-airmask-detail-text">ใช้ได้กับเครื่องปรับอากาศทุกยี่ห้อ</div>
                                            <div className="main-content-airmask-detail-circle" />
                                        </div>
                                        <div className="main-content-airmask-detail-wrapper-delay-2">
                                            <div className="main-content-airmask-detail-text">กันฝุ่นในขณะที่ไม่ทำให้ลมดรอป</div>
                                            <div className="main-content-airmask-detail-circle" />
                                        </div>
                                    </div>
                                    <img className="main-content-airmask-img" src={images.airmask} />
                                    <div className="main-content-airmask-detail">
                                        <div className="main-content-airmask-detail-wrapper-delay-4">
                                            <div className="main-content-airmask-detail-text">กรองฝุ่นขนาดเล็กได้ถึง PM 10.5</div>
                                            <div className="main-content-airmask-detail-circle" />
                                        </div>
                                        <div className="main-content-airmask-detail-wrapper-delay-6">
                                            <div className="main-content-airmask-detail-text">เส้นใยถักทอไม่เป็นระเบียบ กรองได้ดีกว่า</div>
                                            <div className="main-content-airmask-detail-circle" />
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
                                <img className="main-content-footer-img" src="../assets/images/home.jpg" />
                            </div>
                            <Footer />
                        </div>
                    </StyleRoot>
                    )
                }
            }
            
export default App