import React, { Component } from 'react';
import axios from 'axios'
import '../css/Shopping.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import { setProducts } from '../actions/product';
import Header from './Header'
import { Link, Redirect } from 'react-router-dom';

class ShoppingCart extends Component {

    plus(data) {
        let products = this.props.productReducer.products
        products[products.indexOf(data)].amount += 1
        this.props.dispatch(setProducts(products))
    }

    minus(data) {
        let products = this.props.productReducer.products
        let index = products.indexOf(data)
        products[index].amount -= 1
        if (products[index].amount == 0)
            products.splice(index, 1)
        this.props.dispatch(setProducts(products))
    }

    delete(data) {
        let products = this.props.productReducer.products
        let index = products.indexOf(data)
        products.splice(index, 1)
        this.props.dispatch(setProducts(products))
    }

    handleChangeWithKey = (data,key,e) => {
        if(key == "amount"){
            let products = this.props.productReducer.products
            products[products.indexOf(data)].amount = e.target.value
            this.props.dispatch(setProducts(products))
        }
    }

    render() {
        return (
            <div className="product-wrapper">
                <Header />
                <div className="tab-container">
                    <div className="shopping-container">
                        <div className="shopping-box">
                            <div className="shopping-content">
                                <div className="shopping-header-row">
                                    <img className="shopping-img" src={"../assets/images/shoppingcart.png"} />
                                    <div className="shopping-text-group">
                                        <div className="shopping-header-text">อินโนแคร์</div>
                                        <div className="shopping-header-text">Innocare</div>
                                    </div>
                                </div>
                                <div className="shopping-table">
                                    <div className="shopping-table-header">
                                        <div className="shopping-header-text-main">สินค้า</div>
                                        <div className="shopping-header-text-sub">จำนวน</div>
                                        <div className="shopping-header-text-sub">แอคชั่น</div>
                                    </div>
                                    {this.props.productReducer.products.map((data, index) => {
                                        return (
                                            <div className="shopping-table-content">
                                                <div className="shopping-content-main">
                                                    <div className="shopping-content-tagbox">
                                                        <div className="shopping-content-tag-header">รหัสสินค้า</div>
                                                        <div className="shopping-content-tag">{data.tag}</div>
                                                    </div>
                                                    <div className="shopping-content-imagebox">
                                                        <img className="shopping-content-image" src={data.img} />
                                                        <div className="shopping-content-name">{data.name}</div>
                                                    </div>
                                                    <div className="shopping-content-desc">{data.desc}</div>
                                                </div>
                                                <div className="shopping-content-sub">
                                                    <button className="shopping-content-button-minus" onClick={() => this.minus(data)}>-</button>
                                                    <input 
                                                        className="shopping-content-amount"
                                                        value={data.amount}
                                                        type="number"
                                                        onChange={e => this.handleChangeWithKey(data,"amount",e)}
                                                    />
                                                    <button className="shopping-content-button-plus" onClick={() => this.plus(data)}>+</button>
                                                </div>
                                                <div className="shopping-content-sub">
                                                    <button className="shopping-content-button-delete" onClick={() => this.delete(data)}>ลบ</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className="shopping-table-footer">
                                        <Link className="button-wrapper" to="/product/checkout">
                                            <button className="checkout-button">
                                                ยืนยันการสั่งซื้อ
                                            </button>
                                        </Link>
                                        <Link className="button-wrapper" to="/product">
                                            <button className="checkout-button">
                                                กลับไปยังหน้าแรก
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(ShoppingCart)