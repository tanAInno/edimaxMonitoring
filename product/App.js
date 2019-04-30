import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import '../assets/fonts/EkkamaiStandard-Light.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import Product from './Product'
import ShoppingCart from './Shoppingcart'

class App extends Component {

    render() {
        return (
            <Tabs className="product-container"
                selectedTab="product">
            <div className="product-wrapper">
                <div className="product-header">
                    <div className="product-header-text">ดาวน์โหลดแอพพลิเคชั่น | ติดต่อเรา</div>
                    <img className="product-header-image" src={"../assets/images/line.png"}/>
                    <img className="product-header-image" src={"../assets/images/facebook.png"}/>
                    <img className="product-header-image" src={"../assets/images/home.png"}/>
                    <div className="account-row">
                        <img className="product-header-image" src={"../assets/images/account.png"}/>
                        <div className="product-header-text">ชื่อ-นามสกุล</div>
                    </div>
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
                                <input type="text" className="search-input" placeholder="ค้นหาสินค้าและบริการ"/>
                                <div className="search-button">
                                    <img className="search-img" src={"../assets/images/search.jpg"} />
                                </div>
                                <TabLink className="tab-wrapper" to="shoppingcart">
                                    <img className="shopping-img" src={"../assets/images/shoppingcart.png"} />
                                </TabLink>
                            </div>
                            <div className="search-tab-row">
                                <div className="search-tab-text">หน้าหลัก</div>
                                <div className="search-tab-text">เกี่ยวกับเรา</div>
                                <div className="search-tab-text">ข่าวสาร</div>
                                <TabLink className="search-tab-text" to='product'>
                                    สินค้าและบริการ
                                </TabLink>
                                <div className="search-tab-text-last">ช่วยเหลือ</div>
                            </div>
                        </div>
                    </div>
                </div>
                <TabContent for="product">
                    <Product />
                </TabContent>
                <TabContent for="shoppingcart">
                    <ShoppingCart />
                </TabContent>
            </div>
            </Tabs>
        )
    }

}

export default App