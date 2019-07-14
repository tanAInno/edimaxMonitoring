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

Modal.setAppElement('body')

class Product extends Component {

    constructor() {
        super()

        this.state = {
            modalIsOpen: false,
        }
    }

    openModal(data) {
        this.props.dispatch(setChoosenProduct(data))
        this.addToCart(data)
        this.setState({ modalIsOpen: true })
    }

    afterOpenModal() {
    }

    closeModal() {
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


    renderRow(list) {
        return (
            <div className='product-row'>
                {list.map((data, index) => {
                    if(index == 3)
                        return (
                            <div className='product-card-last'>
                                <Link style={{ textDecoration: 'none' }} to={{pathname:`/product/detail/${data.id}`}}><img className='product-image' src={data.img} /></Link>
                                <div className='product-name'>{data.name}</div>
                                <div className='product-price'>฿ {data.price}</div>
                                <button className='pick-button' onClick={() => this.openModal(data)}>ซื้อเลย</button>
                            </div>
                        )
                    return (
                        <div className='product-card'>
                            <Link style={{ textDecoration: 'none' }} to={{pathname:`/product/detail/${data.id}`, productId: data.id}}><img className='product-image' src={data.img} /></Link>
                            <div className='product-name'>{data.name}</div>
                            <div className='product-price'>฿ {data.price}</div>
                            <button className='pick-button' onClick={() => this.openModal(data)}>ซื้อเลย</button>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div className="tab-container">
                <div className="product-content-container">
                    <div className='product-catalogue'>
                        <div className="product-catalogue-header">
                            <div className="product-catalogue-header-text-first">INNOCARE</div>
                            <div className="product-catalogue-header-text">PRODUCTS</div>
                        </div>
                        <div className="product-list-header">สินค้า Karcher</div>
                        {this.renderProduct('karcher')}
                        <div className="product-list-header">สินค้า Inno Product</div>
                        {this.renderProduct('innocare')}
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
                            <button className="product-modal-link-button" onClick={() => this.closeModal()}>ทำการสั่งซื้อ</button>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(Product)