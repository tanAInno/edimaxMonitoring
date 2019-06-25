import React, { Component } from 'react';
import axios from 'axios'
import '../css/ShoppingModal.css'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { setProducts, setTotalPrice } from '../actions/product';

class ShoppingcartModal extends Component {

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

    render() {
        return (
            <div className="shopping-modal-wrapper">
                <div className="shopping-modal-content-wrapper">
                    <div className="shopping-modal-header-wrapper">
                        <div className="shopping-modal-header">รถเข็น</div>
                    </div>
                    <Tabs className="shopping-modal-tab-wrapper"
                        activeLinkStyle={{ background: "#FFFFFF", color: "#7FD0DA" }}>
                        <div className="shopping-modal-tab-header-wrapper">
                            <TabLink className="shopping-modal-tab" to="all">
                                ALL
                            </TabLink>
                            <TabLink className="shopping-modal-tab" to="services">
                                SERVICES
                            </TabLink>
                            <TabLink className="shopping-modal-tab" to="products">
                                PRODUCTS
                            </TabLink>
                        </div>
                        <TabContent for="all">
                        <div className="shopping-modal-table">
                            {this.props.productReducer.products.map((data, index) => {
                                return (
                                    <div className="shopping-modal-box">
                                        <img className="shopping-modal-box-img" src={data.img} />
                                        <div className="shopping-modal-box-content">
                                            <div className="shopping-modal-box-name">{data.name}</div>
                                            <div className="shopping-modal-box-price">{data.price} บาท</div>
                                            <div className="shopping-modal-box-button-group">
                                                <button className="shopping-modal-box-button" onClick={() => this.minus(data)}>-</button>
                                                <div className="shopping-modal-box-amount">{data.amount}</div>
                                                <button className="shopping-modal-box-button" onClick={() => this.plus(data)}>+</button>
                                                <button className="shopping-modal-box-delete" onClick={() => this.delete(data)}>ลบ</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="shopping-modal-total-price">รวมทั้งสิ้น: {this.props.productReducer.totalprice} บาท</div>
                        </div>
                        </TabContent>
                        <TabContent for="services">
                        </TabContent>
                        <TabContent for="products">
                        </TabContent>
                    </Tabs>
                    <Link className="shopping-modal-button-wrapper" style={{ textDecoration: 'none' }} to="/product/shoppingcart">
                        <button className="shopping-modal-button">ชำระค่าสินค้า</button>
                    </Link>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(ShoppingcartModal)