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
            <div className="service-wrapper">
                <Header active="service" />
                <div className="service-home-wrapper">
                    <div className="service-home-header">บริการล้างแอร์</div>
                    <img className="service-home-img" src={"../assets/images/serviceair.jpg"} />
                    <div className="service-home-content">
                        <div className="service-home-content-text">ล้างแอร์ ทำความสะอาดเครื่องปรับอากาศ เหมาะสำหรับแอร์ที่ไม่ได้ทำการล้างมามากกว่า 6 เดือน เพื่อประหยัดไฟและรักษาสุขภาพ</div>
                        <div className="service-home-content-header-green">รายละเอียดการให้บริการ</div>
                        <div className="service-home-content-subtext">1. การทำความสะอาดคอยล์เย็น (แอร์ส่วนที่ทำความเย็นภายในห้อง) และอาจจะทำความสะอาดคอยล์ร้อนกรณีที่จำเป็นต้องรับการทำความสะอาด (คอยล์ร้อนหรือคอมเพรซเซอร์ภายนอกอาคารถูกออกแบบมาให้ทนต่อสภาพอากาศ ไม่ควรทำการถอดประกอบเพื่อล้างทำครั้งเพราะอาจทำให้ชำรุดก่อนเวลาอันสมควร)</div>
                        <div className="service-home-content-subtext">2. รวมค่าเดินทางแล้ว หากมีคำถามอื่นๆ สามารถสอบถามช่างได้โดยตรงเพื่อประโยชน์ในการใช้บริการ</div>
                        <div className="service-home-content-header-red">เงื่อนไขการให้บริการ</div>
                        <div className="service-home-content-subtext">1. บริการนี้ไม่ครอบคลุมการซ่อมซมการชำรุดของเครื่องปรับอากาศ กรุณาจองบริการ ซ่อมแอร์ เพื่อดำเนินการ</div>
                        <div className="service-home-content-subtext">2. ประกันความเสียหายในกรณีที่เครื่องปรับอากาศของท่านใช้งานมานานกว่า 5 ปี เนื่องจากวัสดุเช่นพลาสติกจะมีความเปราะบางไปตามอายุการใช้งาน และมีโอกาสที่จะเกิดความเสียหายสูง</div>
                        <div className="service-home-content-subtext">3. การถอดช้นส่วนเครื่องปรับอากาศโดยละเอียดเพื่อทำการล้าง (ตัดล้าง) และไม่แนะนำให้ทำเนื่องจากมีโอกาสสูงที่จะชำรุดเสียหาย หากเครื่องปรับอากาศของท่านมีอายุการใช้งานมากกว่า 5 ปีแล้ว ทางระบบไม่สามารถรับประกันความเสียหายได้</div>
                        <div className="service-home-content-subtext">4. ท่านต้องชำระค่าเดินทางและค่าเสียโอกาส 200 บาท ในกรณีที่ช่างไม่สามารถปฏิบัติงาน เนื่องจากหน้างานไม่เป็นไปตามที่ใบงานกำหนดไว้ (หากต้องใช้บันไดสูงหรือนั่งร้านกรุณาแจ้งในระบบ) ไม่สามารถติดต่อลูกค้าหรือเข้าหน้างานได้เมื่อถึงที่หมายแล้ว (เช่น นิติบุคคลไม่อนุญาต) เลื่อนหรือยกเลิกงานอย่างกระชั้นชิด (กรุณาแจ้งยกเลิกก่อนหน้าเวลางาน 6 ชม.ขึ้นไปเท่านั้น)</div>
                    </div>
                    <Link className="service-home-button-wrapper" style={{ textDecoration: 'none' }} to="/service/booking">
                        <button className="service-home-button">รายละเอียด</button>
                    </Link>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default Home