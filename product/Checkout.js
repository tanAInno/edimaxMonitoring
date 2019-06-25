import React, { Component } from 'react';
import axios from 'axios'
import '../css/Checkout.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import { setProducts, setTotalPrice } from '../actions/product';
import { Link } from 'react-router-dom';
import Header from '../Header'
import Select from 'react-select'
import route from '../api'
import Footer from '../Footer'

class Checkout extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            surname: '',
            email: '',
            company: '',
            address: '',
            province: '',
            district: '',
            subdistrict: '',
            phone: '',
            zipcode: '',
            homephone: '',
            fax: '',
            password: '',
            confirmpassword: '',
            selectedOption: '',
            options: [
                { label: 'ชำระเงินทันที', value: 'ชำระเงินทันที' },
                { label: 'ผ่อนชำระ 3 งวด', value: 'ผ่อนชำระ 3 งวด' },
                { label: 'ผ่อนชำระ 6 งวด', value: 'ผ่อนชำระ 6 งวด' },
                { label: 'ผ่อนชำระ 9 งวด', value: 'ผ่อนชำระ 9 งวด' },]
        }
    }

    handleChangeWithKey = (key, e) => {
        if (key == "name")
            this.setState({ name: e.target.value })
        if (key == "surname")
            this.setState({ surname: e.target.value })
        if (key == "email")
            this.setState({ email: e.target.value })
        if (key == "company")
            this.setState({ company: e.target.value })
        if (key == "phone")
            this.setState({ phone: e.target.value })
        if (key == "address")
            this.setState({ address: e.target.value })
        if (key == "province")
            this.setState({ province: e.target.value })
        if (key == "district")
            this.setState({ district: e.target.value })
        if (key == "subdistrict")
            this.setState({ subdistrict: e.target.value })
        if (key == "phone")
            this.setState({ phone: e.target.value })
        if (key == "zipcode")
            this.setState({ zipcode: e.target.value })
        if (key == "homephone")
            this.setState({ homephone: e.target.value })
        if (key == "fax")
            this.setState({ fax: e.target.value })
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption })
    }

    async sendRequest() {
        if (this.props.productReducer.products.length > 0) {
            await axios.post(route + "products", {
                name: this.state.name,
                surname: this.state.surname,
                email: this.state.email,
                company: this.state.company,
                address: this.state.address,
                province: this.state.province,
                district: this.state.district,
                subdistrict: this.state.subdistrict,
                phone: this.state.phone,
                zipcode: this.state.zipcode,
                homephone: this.state.homephone,
                fax: this.state.fax,
                productList: this.props.productReducer.products,
                totalprice: this.props.productReducer.totalprice
            }).catch(error => console.log(error))
        }
        this.props.dispatch(setProducts([]))
        this.props.dispatch(setTotalPrice(0))
    }

    render() {
        return (
            <div className="product-wrapper">
                <Header />
                <div className="shopping-status-container">
                    <div className="shopping-status-first">
                        <div className="shopping-status-circle">
                            <div>1</div>
                        </div>
                        <div className="shopping-status-text">รถเข็น</div>
                    </div>
                    <div className="shopping-status-second">
                        <div className="shopping-status-circle-active">
                            <div>2</div>
                        </div>
                        <div className="shopping-status-text">วิธีจัดส่งและวิธีชำระเงิน</div>
                    </div>
                    <div className="shopping-status-third">
                        <div className="shopping-status-circle">
                            <div>3</div>
                        </div>
                        <div className="shopping-status-text">เสร็จสมบูรณ์</div>
                    </div>
                </div>
                <div className="tab-container">
                    <div className="checkout-container">
                        <div className="checkout-box">
                            <div className="checkout-form">
                                <div className="checkout-form-header">1. สถานที่จัดส่ง</div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">ชื่อ</div>
                                        <input className="checkout-input"
                                            value={this.state.name}
                                            onChange={e => this.handleChangeWithKey("name", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">นามสกุล</div>
                                        <input className="checkout-input"
                                            value={this.state.surname}
                                            onChange={e => this.handleChangeWithKey("surname", e)} />
                                    </div>
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">อีเมล</div>
                                        <input className="checkout-input"
                                            value={this.state.email}
                                            onChange={e => this.handleChangeWithKey("email", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">บริษัท</div>
                                        <input className="checkout-input"
                                            value={this.state.company}
                                            onChange={e => this.handleChangeWithKey("company", e)} />
                                    </div>
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">ที่อยู่</div>
                                        <input className="checkout-input"
                                            value={this.state.address}
                                            onChange={e => this.handleChangeWithKey("address", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">จังหวัด</div>
                                        <input className="checkout-input"
                                            value={this.state.province}
                                            onChange={e => this.handleChangeWithKey("province", e)} />
                                    </div>
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">อำเภอ / เขต</div>
                                        <input className="checkout-input"
                                            value={this.state.district}
                                            onChange={e => this.handleChangeWithKey("district", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">ตำบล / แขวง</div>
                                        <input className="checkout-input"
                                            value={this.state.subdistrict}
                                            onChange={e => this.handleChangeWithKey("subdistrict", e)} />
                                    </div>
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">รหัสไปรษณีย์</div>
                                        <input className="checkout-input"
                                            value={this.state.zipcode}
                                            onChange={e => this.handleChangeWithKey("zipcode", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">โทรศัพท์มือถือ</div>
                                        <input className="checkout-input"
                                            value={this.state.phone}
                                            onChange={e => this.handleChangeWithKey("phone", e)} />
                                    </div>
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">โทรศัพท์</div>
                                        <input className="checkout-input"
                                            value={this.state.homephone}
                                            onChange={e => this.handleChangeWithKey("homephone", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">โทรสาร</div>
                                        <input className="checkout-input"
                                            value={this.state.fax}
                                            onChange={e => this.handleChangeWithKey("fax", e)} />
                                    </div>
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">รหัสผ่าน</div>
                                        <input className="checkout-input"
                                            value={this.state.password}
                                            onChange={e => this.handleChangeWithKey("password", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">ยืนยันรหัสผ่าน</div>
                                        <input className="checkout-input"
                                            value={this.state.confirmpassword}
                                            onChange={e => this.handleChangeWithKey("confirmpassword", e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-shopping-form">
                                <div className="checkout-form-header">2. รายการสินค้า</div>
                                {this.props.productReducer.products.map((data, index) => {
                                    return (
                                        <div className="checkout-shopping-row">
                                            <img className="checkout-shopping-image" src={data.img} />
                                            <div className="checkout-shopping-info">
                                                <div className="checkout-shopping-name">{data.name}</div>
                                                <div className="checkout-shopping-price">{data.price} บาท</div>
                                                <div className="checkout-shopping-amount">จำนวน {data.amount}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="checkout-total-row">
                                    <div className="checkout-total-header">รวม</div>
                                    <div className="checkout-total-text">{this.props.productReducer.totalprice} บาท</div>
                                </div>
                                <Link to="/product/confirmation" className="checkout-confirm-button-wrapper">
                                    <button className="checkout-confirm-button" onClick={() => this.sendRequest()}>ยืนยันการสั่งซื้อ</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default connect(state => state)(Checkout)