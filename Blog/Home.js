import React, { Component } from 'react';
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Service.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class Home extends Component {

    render() {
        return(
            <div className="blog-wrapper">
                <Header active="blog"/>
                <div className="blog-content">
                    <img className="blog-content-img" src={"../assets/images/IAQHead.jpg"}/>
                    <div className="blog-content-wrapper">
                        <div className="blog-content-header">(IAQ) Indoor Air Quality Solution แนวทางการปรับปรุงคุณภาพอากาศภายในอาคาร</div>
                        <div className="blog-content-text">ในปัจจุบัน ผู้คนส่วนใหญ่มักเข้าใจว่าภายในอาคารนั้นปลอดภัย เพราะมีการควบคุมอากาศด้วยระบบปรับอากาศที่มีการทำความสะอาดอยู่เสมอ แต่รู้หรือไม่ว่า ? คุณภาพอากาศภายในนั้นอาคารนั้นไม่ได้ปลอดภัยอย่างแท้จริง</div>
                        <div className="blog-content-text">จากการศึกษา จากกรมอนามัยโลก หรือ WHO ค้นพบว่า ร้อยละ 30 ของอาคารทั่วโลกประสบปัญหาคุณภาพอากาศภายในอาคาร ซึ่งมีมลพิษสูงกว่าภายนอกอาคารถึง 100 เท่า!! โดยเฉพาะ อาคารประเภทโรงแรม ห้างสรรพสินค้า โรงพยาบาล และอาคารสำนักงาน</div>
                        <div className="blog-content-text">และในปัจจุบันอาคารต่าง ๆ ยังประสบกับปัญหาคุณภาพอากาศจากภายนอกอาคารที่มีค่าเกินกว่ามาตรฐานเข้ามาเพิ่มขึ้นด้วย โดยเฉพาะในเรื่องของฝุ่นละอองขนาดเล็ก PM2.5 จึงทำให้ผู้คนต่างให้ความสนใจกับเรื่องของคุณภาพอากาศ และหาวิธีป้องกันเพื่อไม่ให้ส่งผลกระทบต่อสุขภาพและคุณภาพของชีวิต</div>
                        <div className="blog-content-img-wrapper">
                            <img className="blog-content-img" src={"../assets/images/IAQ1.jpg"}/>
                            <img className="blog-content-img" src={"../assets/images/IAQ2.jpg"}/>
                            <img className="blog-content-img" src={"../assets/images/IAQ3.jpg"}/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default Home