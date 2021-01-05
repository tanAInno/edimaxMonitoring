import React, { Component } from 'react';
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import Blogrow from './Blogrow'
import '../assets/fonts/fontface.css'
import '../css/Blog.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class Air extends Component {

    render() {
        return(
            <div className="blog-wrapper">
                <Header active="blog"/>
                <div className="blog-content">
                    <img className="blog-content-img" src={"../assets/images/AirHeader.jpg"}/>
                    <div className="blog-content-wrapper">
                        <div className="blog-content-header">เลือกเครื่องปรับอากาศให้ประหยัดพลังงาน และประหยัดเงิน</div>
                        <div className="blog-content-text">หลายคนกำลังเลือกซื้อเครื่องปรับอากาศที่ประหยัดพลังงาน และประหยัดเงิน แต่ก็ไม่รู้จะเลือกซื้อเครื่องปรับอากาศอย่างไรดีให้ได้ประสิทธิภาพที่สูงสุด อินโนจึงขอนำความรู้เบื้องต้นในการเลือกซื้อเครื่องปรับอากาศมาฝาก ดังนี้</div>
                        <div className="blog-content-text-topic">1. เลือกขนาดให้เหมาะสมกับห้อง</div>
                        <div className="blog-content-text">ก่อนอื่นเราต้องทราบขนาดห้องที่ต้องการติดตั้งเครื่องปรับอากาศกันก่อน (หน่วยตารางเมตร) เราจึงจะทราบขนาดเครื่องปรับอากาศที่เหมาะสมได้ โดยทั่วไปเรามักจะเรียกขนาดของเครื่องปรับอากาศว่า บีทียูต่อชั่วโมง (BTU/hr : British Thermal Unit/hour) หรือ ตันความเย็น เมื่อเราทราบขนาดห้องแล้วก็มาดูกันว่าขนาดเครื่องปรับอากาศไหนที่เหมาะสมกับห้องของเรา ดังตารางนี้</div>                       
                        <img className="blog-content-img" src={"../assets/images/Air1.jpg"}/>
                        <div className="blog-content-text-topic">2. เลือกที่มีฉลากประหยัดพลังงานเบอร์ 5</div>
                        <div className="blog-content-text">เมื่อเราได้ขนาดของเครื่องปรับอากาศแล้ว ในการเลือกซื้อควรเลือก เครื่องปรับอากาศที่มีฉลากประหยัดพลังงานเบอร์ 5 ซึ่งในฉลากจะ บอกค่าประสิทธิภาพการใช้พลังงานที่ระบุเป็นค่า EER (Energy Efficiency Ratio) สำหรับเครื่องปรับอากาศชนิดและ ค่า SEER (Seasonal Energy Efficiency Ratio) สำหรับเครื่องปรับอากาศ ชนิด INVERTER</div>                       
                        <img className="blog-content-img" src={"../assets/images/Air2.jpg"}/>
                        <div className="blog-content-text-topic">3. การติดตั้งเครื่องปรับอากาศ</div>
                        <div className="blog-content-text">เมื่อเลือกซื้อเครื่องปรับอากาศที่เหมาะสมแล้ว เพื่อให้สามารถทำงาน ได้อย่างเต็มประสิทธิภาพ ควรมีการติดตั้งที่ถูกวิธีดังนี้  ติดตั้งโดยช่างผู้ชำนาญงาน วางเครื่องในจุดที่จ่ายความเย็นได้ดีและ สามารถบำรุงรักษาได้สะดวก  ติดตั้งแฟนคอยล์ยูนิต และคอนเดนซิ่งยูนิตของเครื่องปรับอากาศ แบบแยกส่วนให้ใกล้กันมากที่สุด เพื่อให้เครื่องไม่ต้องทำงานหนักใน การส่งสารทำความเย็นไหลไปตามท่อ ทั้งยังลดค่าใช้จ่ายในการเดิน ท่อและหุ้มฉนวนตลอดจนลดโอกาสการรั่วของสารทำความเย็น  คอนเดนซิ่งยูนิตควรอยู่ในร่มหรือที่อากาศถ่ายเทได้สะดวก ไม่ควรให้ ถูกแสงแดดโดยตรงและไม่ควรอยู่ในที่อับลมหรือที่คับแคบ จะทำให้เครื่องปรับอากาศทำงานหนัก  หากผนังห้องส่วนใหญ่เป็นกระจก หรืออยู่ด้านทิศตะวันตกหรือทิศใต้ ควรปลูกต้นไม้ใหญ่หรือติดตั้งแผงบังแดดให้ร่มเงาเพื่อช่วยลดปริมาณ ความร้อนที่ถ่ายเทเข้าสู่ห้อง  ควรอุดรูรั่วรอบห้องที่ปรับอากาศให้สนิท เพื่อป้องกันความร้อนจาก ภายนอกเข้าสู่ห้อง  ควรทาสีผนังภายนอกอาคารด้วยสีอ่อนหรือสีป้องกันรังสียูวี จะช่วย ลดการนำความร้อนผ่านผนังได้ดี อย่างไรก็ตาม เมื่อเราเลือกใช้เครื่องปรับอากาศที่มีขนาดเหมาะสม กับขนาดห้องและติดตั้งอย่างถูกวิธีแล้ว ควรศึกษาทำความเข้าใจเอกสาร คู่มือที่ให้มากับเครื่องปรับอากาศและปฏิบัติตามคำแนะนำเพื่อการใช้งาน ที่ถูกต้อง เพราะวิธีการใช้งานและการบำรุงรักษาก็มีความสำคัญไม่แพ้กัน กิจกรรมภายในห้อง จำนวนผู้ใช้งานภายในห้อง การบำรุงรักษาทำความ สะอาดอย่างสม่ำเสมอ ล้วนมีผลต่อการทำงานที่มีประสิทธิภาพของ เครื่องปรับอากาศ ที่จะช่วยให้เราสามารถประหยัดค่าไฟฟ้า สะดวกทั้ง กาย สบายทั้งเงิน</div>                       
                    </div>
                    <div className="blog-content-text-topic">อ่านบทความอื่นๆที่น่าสนใจ</div>
                    <Blogrow/>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default Air