import React, { Component } from 'react';
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Blog.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';

class Blogrow extends Component {

    render() {
        return (
            <div className="blog-content-row">
                <div className="blog-content-box-wrapper">
                    <Link className="blog-content-box-img-wrapper" to="/blog/iaq">
                        <img className="blog-content-box-img" src="../assets/images/IAQHead.jpg" />
                    </Link>
                    <Link className="blog-content-invisible-hover" to="/blog/iaq">+</Link>
                    <Link className="blog-content-box-tag" to="/blog/iaq">+ อ่านเพิ่ม</Link>
                    <div className="blog-content-box-text">(IAQ) Indoor Air Quality Solution</div>
                </div>
                <div className="blog-content-box-wrapper">
                    <Link className="blog-content-box-img-wrapper" to="/blog/air">
                        <img className="blog-content-box-img" src="../assets/images/AirHeader.jpg" />
                    </Link>
                    <Link className="blog-content-invisible-hover" to="/blog/air">+</Link>
                    <Link className="blog-content-box-tag" to="/blog/air">+ อ่านเพิ่ม</Link>
                    <div className="blog-content-box-text">เลือกเครื่องปรับอากาศให้ประหยัดพลังงาน และประหยัดเงิน</div>
                </div>
                <div className="blog-content-box-wrapper">
                    <Link className="blog-content-box-img-wrapper" to="/blog/filter">
                        <img className="blog-content-box-img" src="../assets/images/FilterHeader.jpg" />
                    </Link>
                    <Link className="blog-content-invisible-hover" to="/blog/filter">+</Link>
                    <Link className="blog-content-box-tag" to="/blog/filter">+ อ่านเพิ่ม</Link>
                    <div className="blog-content-box-text">เครื่องปรับอากาศ อาจเป็นแหล่งเพาะเชื้อโรค….</div>
                </div>
            </div>
        )
    }
}

export default Blogrow