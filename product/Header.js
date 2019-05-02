import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import '../assets/fonts/EkkamaiStandard-Light.css'
import { Link, Redirect } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
            <div className="product-header">
                <div className="product-header-text">ดาวน์โหลดแอพพลิเคชั่น | ติดต่อเรา</div>
                <img className="product-header-image" src={"../assets/images/line.png"} />
                <img className="product-header-image" src={"../assets/images/facebook.png"} />
                <img className="product-header-image" src={"../assets/images/home.png"} />
            </div>
            <div className="product-banner-wrapper">
                <div className="product-banner">
                    <div className="logo">
                        <img className="logo-img" src={"../assets/images/logo.png"} />
                    </div>
                    <div className="text-row">
                        <div className="header-text">บริษัท อินโนเวชั่น เทคโนโลยี จำกัด</div>
                        <div className="header-text">Innovation Technology Co,.Ltd.</div>
                    </div>
                    <div className="search-row">
                        <div className="search-input-wrapper">
                            <input type="text" className="search-input" placeholder="ค้นหาสินค้าและบริการ" />
                            <div className="search-button">
                                <img className="search-img" src={"../assets/images/search.jpg"} />
                            </div>
                            <Link className="tab-wrapper" to="/product/shoppingcart">
                                <img className="shopping-img" src={"../assets/images/shoppingcart.png"} />
                            </Link>
                        </div>
                        <div className="search-tab-row">
                            <div className="search-tab-text">หน้าหลัก</div>
                            <div className="search-tab-text">เกี่ยวกับเรา</div>
                            <div className="search-tab-text">ข่าวสาร</div>
                            <Link className="search-tab-text" to='/product'>สินค้าและบริการ</Link>
                            <div className="search-tab-text-last">ช่วยเหลือ</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Header