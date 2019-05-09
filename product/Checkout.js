import React, { Component } from 'react';
import axios from 'axios'
import '../css/Checkout.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import { setProducts } from '../actions/product';
import {Link} from 'react-router-dom';
import Header from './Header'
import Select from 'react-select'
import route from '../api'

class Checkout extends Component {
    
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            department: '',
            workplace: '',
            selectedOption: '',
            options: [
                {label: 'จ่ายเงินสด', value: 'จ่ายเงินสด'},
                {label: 'ผ่อนชำระ 3 งวด', value: 'ผ่อนชำระ 3 งวด'},
                {label: 'ผ่อนชำระ 6 งวด', value: 'ผ่อนชำระ 6 งวด'},
                {label: 'ผ่อนชำระ 9 งวด', value: 'ผ่อนชำระ 9 งวด'},]
        }
    }

    handleChangeWithKey = (key,e) => {
        if(key == "name")
            this.setState({name : e.target.value})
        if(key == "email")
            this.setState({email : e.target.value})
        if(key == "phone")
            this.setState({phone : e.target.value})
        if(key == "department")
            this.setState({department : e.target.value})
        if(key == "workplace")
            this.setState({workplace : e.target.value})
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption })
    }

    async sendRequest(){
        if(this.props.productReducer.products.length > 0){
            await axios.post(route+"products",{
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                department: this.state.department,
                workplace: this.state.workplace,
                productList: this.props.productReducer.products,
                paymentOption: this.state.selectedOption.value
            }).catch(error => console.log(error))
        }
        this.props.dispatch(setProducts([]))
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
                                    <input className="checkout-input"
                                        value={this.state.name}
                                        onChange={e => this.handleChangeWithKey("name",e)}/>
                                </div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">E-mail</div>
                                    <input className="checkout-input"
                                        value={this.state.email}
                                        onChange={e => this.handleChangeWithKey("email",e)}/>
                                </div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">เบอร์โทรศัพท์</div>
                                    <input className="checkout-input"
                                        value={this.state.phone}
                                        onChange={e => this.handleChangeWithKey("phone",e)}/>
                                </div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">ฝ่าย</div>
                                    <input className="checkout-input"
                                        value={this.state.department}
                                        onChange={e => this.handleChangeWithKey("department",e)}/>
                                </div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">โครงการ</div>
                                    <input className="checkout-input"
                                        value={this.state.workplace}
                                        onChange={e => this.handleChangeWithKey("workplace",e)}/>
                                </div>
                                <div className="checkout-input-wrapper">
                                    <div className="checkout-input-header">วิธีการชำระเงิน</div>
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
                                <div className="checkout-button-wrapper">
                                    <Link to="/product/confirmation" className="checkout-confirm-button-wrapper">
                                        <button className="checkout-confirm-button" onClick={() => this.sendRequest()}>ยืนยันการสั่งซื้อ</button>
                                    </Link>
                                    <Link to="/product/shoppingcart" className="checkout-confirm-button-wrapper">
                                        <button className="checkout-confirm-button">กลับไปยังหน้าก่อนหน้า</button>
                                    </Link>
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