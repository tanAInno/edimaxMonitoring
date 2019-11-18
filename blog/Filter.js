import React, { Component } from 'react';
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Blog.css'
import Blogrow from './Blogrow'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class Filter extends Component {

    render() {
        return(
            <div className="blog-wrapper">
                <Header active="blog"/>
                <div className="blog-content">
                    <img className="blog-content-img" src={"../assets/images/FilterHeader.jpg"}/>
                    <div className="blog-content-wrapper">
                        <div className="blog-content-header">เครื่องปรับอากาศ อาจเป็นแหล่งเพาะเชื้อโรค….</div>
                        <div className="blog-content-text">ร้อนนนนน ร้อนเหลือเกิน!! หลาย ๆ คนกำลังคิดแบบนี้อยู่ใช่ไหมคะ อากาศร้อน ๆ แบบนี้ ใคร ๆ ก็อยากจะนอนอยู่แต่ในห้องปรับอากาศให้เย็นสบายไปทั้งวัน บางคนไปเดินเล่นห้างสรรพสินค้า นั่งร้านกาแฟ และกลับบ้านมาเปิดเครื่องปรับอากาศนอนตลอดคืน แต่ทราบหรือไม่ว่า? อากาศเย็นสบายที่ออกมาจากเครื่องปรับอากาศนั้น สามารถทำร้ายสุขภาพของเราได้เช่นกัน เพราะหากเราดูแลบำรุงรักษาเครื่องปรับอากาศไม่ดี หรือไม่ได้ทำความสะอาดและบำรุงรักษาเครื่องปรับอากาศเลย ก็อาจทำให้มีฝุ่นและเชื้อราสะสมอยู่ภายในเครื่องปรับอากาศได้ และเมื่อเราอยู่ในห้องปรับอากาศเป็นเวลานาน ๆ เราก็จะหายใจเอาเชื้อโรคที่สะสมอยู่นั้นเข้าไปในร่างกายของเราด้วย</div>
                        <img className="blog-content-img-high" src={"../assets/images/Filter1.jpg"}/>
                        <div className="blog-content-text">เพราะเครื่องปรับอากาศหากยิ่งเปิดใช้งานบ่อยและนานเท่าไหร่ ก็จะยิ่งมีฝุ่นเข้าไปสะสมภายในเครื่องปรับอากาศมากขึ้นเท่านั้น ทำให้เครื่องปรับอากาศกลายเป็นแหล่งสะสมของฝุ่นและแบคทีเรีย ซึ่งความชื้นภายในเครื่องปรับอากาศจะทำให้แบคทีเรียที่สะสมอยู่นั้นกลายเป็นแหล่งเชื้อโรคในทันที เราอาจสังเกตุได้จากคราบความสกปรกและกลิ่นที่อับชื้นที่เกิดขึ้นกับเครื่องปรับอากาศ โดยเฉพาะโรงภาพยนตร์ ห้างสรรพสินค้า โรงพยาบาล และโรงแรม เป็นที่ที่เราต้องใช้เครื่องปรับอากาศร่วมกับผู้อื่น  หากอยู่เป็นเวลานาน และร่างกายไม่แข็งแรง อาจทำให้เสี่ยงติดเชื้อทางเดินหายใจได้อีกด้วย นอกจากนี้ฝุ่นต่าง ๆ ที่มาจากการเดินเข้า-ออก และการเปิด-ปิดประตูบ่อย ๆ ก็มีโอกาสสูงที่ฝุ่นจะเข้าไปในเครื่องปรับอากาศและทำให้สกปรกได้เร็วยิ่งขึ้น</div>
                        <div className="blog-content-text">เพราะฉะนั้น บ้านที่อยู่อาศัย ร้านค้า และอาคารสำนักงานต่าง ๆ จึงควรทำความสะอาดเครื่องปรับอากาศทุก 6 เดือน หรือหาวิธีป้องกันฝุ่นไม่ให้เข้าไปสะสมภายในเครื่องปรับอากาศ อย่างเช่น นวัตกรรม Airmask แผ่นดักจับฝุ่นละออง ที่ช่วยป้องกันไม่ให้ฝุ่นเข้าไปภายในเครื่องปรับอากาศได้เป็นอย่างดี ทำให้อากาศภายในห้องนั้นสะอาด และทำความเย็นได้อย่างมีประสิทธิภาพ</div>
                    </div>
                    <div className="blog-content-text-topic">อ่านบทความอื่นๆที่น่าสนใจ</div>
                    <Blogrow/>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default Filter