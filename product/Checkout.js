import React, { Component } from 'react';
import axios from 'axios'
import '../css/Checkout.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import { setProducts } from '../actions/product';
import Header from './Header'
import Select from 'react-select'

class Checkout extends Component {
    
    constructor() {
        super()
        this.state = {
            selectedOption: '',
            options: [{label: '3 เดือน', value: "3 เดือน"},{label: '6 เดือน', value: "6 เดือน"},]
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption })
    }

    render() {
        return(
            <div className="product-wrapper">
                <Header/>
                <div className="tab-container">
                    <div className="checkout-container">
                        <div className="checkout-box">
                            <div className="checkout-form">
                                <div className="checkout-form-header">กรุณากรอกแบบฟอร์มเพื่อทำการสั่งซื้อ</div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">ชื่อ-สกุล</div>
                                    <input className="checkout-input"/>
                                </div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">E-mail</div>
                                    <input className="checkout-input"/>
                                </div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">เบอร์โทรศัพท์</div>
                                    <input className="checkout-input"/>
                                </div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">ฝ่าย</div>
                                    <input className="checkout-input"/>
                                </div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">โครงการ</div>
                                    <input className="checkout-input"/>
                                </div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">หักค่าสั่งซื้อสินค้าผ่านเงินเดือน</div>
                                    <Select
                                        value={this.state.selectedOption}
                                        onChange={this.handleChange}
                                        options={this.state.options}
                                        className="checkout-select"
                                    />
                                </div>
                            </div>
                            <div className="checkout-shopping-form">
                                <div className="checkout-form-header">รายชื่อสินค้าที่ต้องการสั่งซื้อ</div>
                                {this.props.productReducer.products.map((data, index) => {
                                    return(
                                        <div className="checkout-shopping-row">
                                            <img className="checkout-shopping-image" src={data.img}/>
                                            <div className="checkout-shopping-name">{data.name}</div>
                                            <div className="checkout-shopping-amount">{data.amount}</div>
                                        </div>
                                    )
                                })}
                                <div className="checkout-confirm-button-wrapper">
                                    <button className="checkout-confirm-button">ยืนยันการสั่งซื้อ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(Checkout)