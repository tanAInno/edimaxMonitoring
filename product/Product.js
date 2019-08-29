import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import StarRatings from 'react-star-ratings';
import { setProducts, setChoosenProduct } from '../actions/product';
import { connect } from 'react-redux'
import Modal from 'react-modal';
import ProductModal from './ProductModal'
import {Link} from 'react-router-dom';
import list from '../list'
import LoginModal from '../Register/LoginModal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

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

class Product extends Component {

    constructor() {
        super()

        this.state = {
            modalIsOpen: false,
        }
    }

    openloginModal(data) {
        this.setState({ loginmodalIsOpen: true })
    }

    afterOpenloginModal() {
    }

    closeloginModal() {
        this.setState({ loginmodalIsOpen: false })
    }

    openModal(data) {
        this.props.dispatch(setChoosenProduct(data))
        this.setState({ modalIsOpen: true })
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    addProductToCart(data){
        this.addToCart(data)
        this.setState({ modalIsOpen: false })
    }

    renderProduct(type) {
        let product = []
        let usedlist = []
        for (let i = 0; i < list.productList.length; i++) {
            if(list.productList[i].type == type)
                usedlist.push(list.productList[i])
        }
        for (let i = 0; i < usedlist.length; i += 4) {
            product.push(this.renderRow(usedlist.slice(i, i + 4)))
        }
        return product
    }

    addToCart(data) {
        let products = this.props.productReducer.products
        let newobj = { img: data.img, 
                    name: data.name, 
                    desc: data.desc, 
                    tag: data.tag, 
                    amount: 1,
                    price: data.price,
                    type: data.type }
        let exist = false
        for (let i = 0; i < products.length; i++) {
            if (products[i].name == data.name) {
                products[i].amount += 1
                exist = true
            }
        }
        if (!exist)
            products.push(newobj)
        this.props.dispatch(setProducts(products))
    }


    renderPickButton(data) {
        if(this.props.userReducer.user.name != undefined) {
            return <button className='pick-button' onClick={() => this.openModal(data)}>ซื้อเลย</button>
        }
        if(this.props.userReducer.user.name == undefined) {
            return <button className='pick-button' onClick={() => this.openloginModal(data)}>ซื้อเลย</button>
        }
    }

    renderRow(list) {
        return (
            <div className='product-row'>
                {list.map((data, index) => {
                    if(index == 3)
                        return (
                            <div className='product-card-last'>
                                <img className='product-image' src={data.img} />
                                <div className='product-name'>{data.name}</div>
                                <div className='product-price'>฿ {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                {this.renderPickButton(data)}
                            </div>
                        )
                    return (
                        <div className='product-card'>
                            <img className='product-image' src={data.img} />
                            <div className='product-name'>{data.name}</div>
                            <div className='product-price'>฿ {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                            {this.renderPickButton(data)}
                        </div>
                    )
                })}
            </div>
        )
    }

    renderPromoRow(list) {
        return (
            <div className="product-catalogue-header">
                {list.map((data, index) => {
                    return (
                        <div className="product-catalogue-header-wrapper">
                            <img className="product-catalogue-header-img" src={data.img}/>
                            <div className="product-name">{data.name}</div>
                            <div className="product-price">฿ {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                            {this.renderPickButton(data)}
                        </div>
                    )
                })}
            </div>
        )
    }

    renderPromo(){
        let product = []
        for (let i = 0; i < list.promoList.length; i+=4) {
            product.push(this.renderPromoRow(list.promoList.slice(i, i + 4)))
        }
        return product
    }

    render() {
        return (
            <div className="tab-container">
                <div className="product-content-container">
                    <div className='product-catalogue'>
                        <img className="product-banner" src={"../assets/images/product_banner.jpg"}/>
                        {this.renderPromo()}
                        <div className="product-list-header">ผลิตภัณฑ์สำหรับเครื่องปรับอากาศ</div>
                        {this.renderProduct('innocare')}
                        <div className="product-list-header">ผลิตภัณฑ์สำหรับสุขภาพและความงาม</div>
                        {this.renderProduct('bn3')}
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={() => this.afterOpenModal()}
                        onRequestClose={() => this.closeModal()}
                        contentLabel="สั่งซื้อ"
                        style={customStyles}
                    >
                        <ProductModal
                            img={this.props.productReducer.choosenProduct.img}
                            type={this.props.productReducer.choosenProduct.type}
                            name={this.props.productReducer.choosenProduct.name}
                            desc={this.props.productReducer.choosenProduct.desc}
                            tag={this.props.productReducer.choosenProduct.tag}
                            price={this.props.productReducer.choosenProduct.price}
                            rating={this.props.productReducer.choosenProduct.rating}
                        />
                        <div className="product-modal-button-group">
                            <button className="product-modal-link-button" onClick={() => this.closeModal()}>กลับ</button>
                            <button className="product-modal-link-button" onClick={() => this.addProductToCart(this.props.productReducer.choosenProduct)}>ทำการสั่งซื้อ</button>
                        </div>
                    </Modal>
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

export default connect(state => state)(Product)