import React, { Component } from 'react';
import axios from 'axios'
import '../css/Shopping.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import { setProducts,setTotalPrice } from '../actions/product';
import Header from '../Header'
import Footer from '../Footer'
import { Link, Redirect } from 'react-router-dom';

class ShoppingCart extends Component {

    state = {
        coupon: "",
        couponUsed : false,
        caution: '',
    }

    componentDidMount() {
        let products = this.props.productReducer.products
        let total = 0
        if(products.length > 0){
            for(let i=0; i < products.length; i++) {
                total += products[i].price * products[i].amount
            }
            this.props.dispatch(setTotalPrice(total))
        }
    }

    plus(data) {
        let products = this.props.productReducer.products
        products[products.indexOf(data)].amount += 1
        this.props.dispatch(setProducts(products))
        this.props.dispatch(setTotalPrice(this.props.productReducer.totalprice + data.price))
    }

    minus(data) {
        let products = this.props.productReducer.products
        let index = products.indexOf(data)
        products[index].amount -= 1
        if (products[index].amount == 0)
            products.splice(index, 1)
        this.props.dispatch(setProducts(products))
        this.props.dispatch(setTotalPrice(this.props.productReducer.totalprice - data.price))
    }

    delete(data) {
        let products = this.props.productReducer.products
        let index = products.indexOf(data)
        products.splice(index, 1)
        this.props.dispatch(setProducts(products))
        this.props.dispatch(setTotalPrice(this.props.productReducer.totalprice - (data.price * data.amount)))
    }

    handleChangeWithKey = (key, e) => {
        if (key == "coupon")
            this.setState({ coupon: e.target.value })
    }

    useCoupon() {
        if (this.state.coupon == "123456" && this.state.couponUsed == false){
            this.props.dispatch(setTotalPrice(this.props.productReducer.totalprice * 8/10))
            this.setState({couponUsed: true})
            this.setState({coupon : ''})
            this.setState({caution: 'right'})
            this.renderCaution()
        }
        else {
            this.renderCaution()
            this.setState({caution: 'wrong'})
        }
    }

    renderCaution() {
        if (this.state.caution == 'wrong'){
            if (this.state.coupon != "123456"){
                return(
                    <div className="shopping-caution-text-red">รหัสคูปองไม่ถูกต้อง</div>
                )
            }
            else if (this.state.couponUsed == true){
                return(
                    <div className="shopping-caution-text-red">คุณได้ใช้คูปองไปแล้ว</div>
                )
            }
        }
        if (this.state.caution == 'right'){
            return(
                <div className="shopping-caution-text-green">ใช้งานคูปองเรียบร้อยแล้ว</div>
            )
        }
    }

    render() {
        return (
            <div className="shopping-wrapper">
                <Header />
                <div className="shopping-status-container">
                    <div className="shopping-status-first">
                        <div className="shopping-status-circle-active">
                            <div>1</div>
                        </div>
                        <div className="shopping-status-text">รถเข็น</div>
                    </div>
                    <div className="shopping-status-second">
                        <div className="shopping-status-circle">
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
                    <div className="shopping-container">
                        <div className="shopping-box">
                            <div className="shopping-content">
                                <div className="shopping-table">
                                    <div className="shopping-table-header">
                                        <div className="shopping-header-text-main">สินค้า</div>
                                        <div className="shopping-header-text-sub">ราคา</div>
                                        <div className="shopping-header-text-sub">จำนวน</div>
                                        <div className="shopping-header-text-sub">ลบทั้งหมด</div>
                                    </div>
                                    {this.props.productReducer.products.map((data, index) => {
                                        return (
                                            <div className="shopping-table-content">
                                                <div className="shopping-content-main">
                                                    <img className="shopping-content-image" src={data.img} />
                                                    <div className="shopping-content-name">{data.name}</div>
                                                </div>
                                                <div className="shopping-content-sub">
                                                    <div className="shopping-content-price">{data.price} บาท</div>
                                                </div>
                                                <div className="shopping-content-sub">
                                                    <div className="shopping-content-amount-group">
                                                        <button className="shopping-content-button-minus" onClick={() => this.minus(data)}>-</button>
                                                        <div className="shopping-content-amount">{data.amount}</div>
                                                        <button className="shopping-content-button-plus" onClick={() => this.plus(data)}>+</button>
                                                    </div>
                                                </div>
                                                <div className="shopping-content-sub">
                                                    <button className="shopping-content-button-delete" onClick={() => this.delete(data)}>ลบ</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="shopping-table-footer">
                                        <input className="shopping-table-coupon-input" 
                                            placeholder="กรอกโค้ดส่วนลด" 
                                            value={this.state.coupon}
                                            onChange={e => this.handleChangeWithKey("coupon", e)}/>
                                        <div className="shopping-table-coupon-text" onClick={() => this.useCoupon()}>ใช้คูปอง</div>
                                        <div className="shopping-table-coupon-sub-text">(ถ้ามี)</div>
                                    </div>
                                    <div className="shopping-table-footer">
                                        {this.renderCaution(this.state.caution)}
                                        <div className="shopping-table-coupon-sub-text">รวม {this.props.productReducer.totalprice} บาท</div>
                                    </div>
                                    <div className="shopping-table-footer">
                                        <Link className="shopping-content-button-wrapper" style={{ textDecoration: 'none' }} to="/product/checkout">
                                            <button className="shopping-content-button-payment">ชำระเงิน</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default connect(state => state)(ShoppingCart)