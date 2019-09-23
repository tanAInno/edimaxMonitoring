import React, { Component } from 'react';
import axios from 'axios'
import '../css/ShoppingModal.css'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { setProducts, setTotalProductPrice } from '../actions/product';
import { setServices, setTotalServicePrice, setAddition } from '../actions/service'
import Modal from 'react-modal';
import LoginModal from '../Register/LoginModal'
import images from '../ImageStorage'

const loginStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('body')

class ShoppingcartModal extends Component {

    state = {
        loginmodalIsOpen: false,
    }

    componentDidMount() {
        let products = this.props.productReducer.products
        let total = 0
        if (products.length > 0) {
            for (let i = 0; i < products.length; i++) {
                total += products[i].price * products[i].amount
            }
            this.props.dispatch(setTotalProductPrice(total))
        }
    }

    plus(data, type) {
        if (type == "product") {
            let products = this.props.productReducer.products
            products[products.indexOf(data)].amount += 1
            this.props.dispatch(setProducts(products))
            this.props.dispatch(setTotalProductPrice(this.props.productReducer.totalprice + data.price))
        }
        if (type == "service") {
            let services = this.props.serviceReducer.services
            services[services.indexOf(data)].amount += 1
            this.props.dispatch(setServices(services))
            this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice + data.price))
        }
    }

    minus(data, type) {
        if (type == "product") {
            let products = this.props.productReducer.products
            let index = products.indexOf(data)
            if (products[index].amount > 1) {
                products[index].amount -= 1
                this.props.dispatch(setTotalProductPrice(this.props.productReducer.totalprice - data.price))
            }
        }
        if (type == "service") {
            let services = this.props.serviceReducer.services
            let index = services.indexOf(data)
            if (services[index].amount > 1) {
                services[index].amount -= 1
                this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice - data.price))
            }
        }
    }

    delete(data, type) {
        if (type == "product") {
            let products = this.props.productReducer.products
            let index = products.indexOf(data)
            products.splice(index, 1)
            this.props.dispatch(setProducts(products))
            this.props.dispatch(setTotalProductPrice(this.props.productReducer.totalprice - (data.price * data.amount)))
        }
        if (type == "service") {
            let services = this.props.serviceReducer.services
            let index = services.indexOf(data)
            services.splice(index, 1)
            this.props.dispatch(setServices(services))
            this.props.dispatch(setTotalServicePrice(this.props.serviceReducer.totalprice - (data.price * data.amount)))
        }
    }

    openloginModal() {
        this.setState({ loginmodalIsOpen: true })
    }

    afterOpenloginModal() {
    }

    closeloginModal() {
        this.setState({ loginmodalIsOpen: false })
    }

    renderModalButton() {
        if (this.props.userReducer.user.name != undefined) {
            return (
                <Link className="shopping-modal-button-wrapper" style={{ textDecoration: 'none' }} to="/product/shoppingcart">
                    <button className="shopping-modal-button">ชำระค่าสินค้า</button>
                </Link>
            )
        }
        if (this.props.userReducer.user.name == undefined) {
            return (
                <div className="shopping-modal-button-wrapper">
                    <button className="shopping-modal-button" onClick={() => this.openloginModal()}>ชำระค่าสินค้า</button>
                </div>
            )
        }
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
                                                <div className="shopping-modal-box-price">{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท</div>
                                                <div className="shopping-modal-box-button-group">
                                                    <button className="shopping-modal-box-button" onClick={() => this.minus(data, "product")}>-</button>
                                                    <div className="shopping-modal-box-amount">{data.amount}</div>
                                                    <button className="shopping-modal-box-button" onClick={() => this.plus(data, "product")}>+</button>
                                                    <button className="shopping-modal-box-delete" onClick={() => this.delete(data, "product")}>ลบ</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {this.props.serviceReducer.services.map((data, index) => {
                                    return (
                                        <div className="shopping-modal-box">
                                            <img className="shopping-modal-box-img" src={images.air_1} />
                                            <div className="shopping-modal-box-content">
                                                <div className="shopping-modal-box-name">{data.name}</div>
                                                <div className="shopping-modal-box-price">{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท</div>
                                                <div className="shopping-modal-box-button-group">
                                                    <button className="shopping-modal-box-button" onClick={() => this.minus(data, "service")}>-</button>
                                                    <div className="shopping-modal-box-amount">{data.amount}</div>
                                                    <button className="shopping-modal-box-button" onClick={() => this.plus(data, "service")}>+</button>
                                                    <button className="shopping-modal-box-delete" onClick={() => this.delete(data, "service")}>ลบ</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="shopping-modal-total-price">รวมทั้งสิ้น: {this.props.productReducer.totalprice + this.props.serviceReducer.totalprice} บาท</div>
                            </div>
                        </TabContent>
                        <TabContent for="services">
                            <div className="shopping-modal-table">
                                {this.props.serviceReducer.services.map((data, index) => {
                                    return (
                                        <div className="shopping-modal-box">
                                            <img className="shopping-modal-box-img" src={images.air_1} />
                                            <div className="shopping-modal-box-content">
                                                <div className="shopping-modal-box-name">{data.name}</div>
                                                <div className="shopping-modal-box-price">{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท</div>
                                                <div className="shopping-modal-box-button-group">
                                                    <button className="shopping-modal-box-button" onClick={() => this.minus(data, "service")}>-</button>
                                                    <div className="shopping-modal-box-amount">{data.amount}</div>
                                                    <button className="shopping-modal-box-button" onClick={() => this.plus(data, "service")}>+</button>
                                                    <button className="shopping-modal-box-delete" onClick={() => this.delete(data, "service")}>ลบ</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="shopping-modal-total-price">รวมทั้งสิ้น: {this.props.serviceReducer.totalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท</div>
                            </div>
                        </TabContent>
                        <TabContent for="products">
                            <div className="shopping-modal-table">
                                {this.props.productReducer.products.map((data, index) => {
                                    return (
                                        <div className="shopping-modal-box">
                                            <img className="shopping-modal-box-img" src={data.img} />
                                            <div className="shopping-modal-box-content">
                                                <div className="shopping-modal-box-name">{data.name}</div>
                                                <div className="shopping-modal-box-price">{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท</div>
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
                                <div className="shopping-modal-total-price">รวมทั้งสิ้น: {this.props.productReducer.totalprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท</div>
                            </div>
                        </TabContent>
                    </Tabs>
                    {this.renderModalButton()}
                    <Modal
                        isOpen={this.state.loginmodalIsOpen}
                        onAfterOpen={() => this.afterOpenloginModal()}
                        onRequestClose={() => this.closeloginModal()}
                        contentLabel="Login"
                        style={loginStyles}
                    >
                        <LoginModal />
                    </Modal>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(ShoppingcartModal)