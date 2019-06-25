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
            productList: [
                { img: "../assets/images/K2420.jpg", type: 'karcher', price: 4300, name: "K 2.420", desc: "เครื่องฉีดน้ำแรงดันสูงที่เหมาะสำหรับการทำความสะอาดในส่วนที่ยากจะเข้าถึง เช่นหลังคอมเพรสเซอร์แอร์ ใต้ท้องรถ ฯลฯ และให้ผลลัพธ์ที่ดีและรวดเร็วกว่าเมื่อเทียบกับการใช้แปรงหรืออุปกรณ์ขัดถูใดๆ" },
                { img: "../assets/images/SC2.jpg", type: 'karcher', price: 4350, name: "SC 2 Easy Fix", desc: "เครื่องทำความสะอาดระบบไอน้ำรุ่นพื้นฐาน สามารถใช้งานง่ายและสะดวก มีส่วนควบคุมไอน้ำ 2 ระดับสำหรับปรับความเข้มข้นของไอน้ำให้เหมาะกับพื้นผิวและสิ่งสกปรก" },
                { img: "../assets/images/SC2D.jpg", type: 'karcher', price: 4600, name: "SC 2 Deluxe Easy Fix", desc: "เครื่องทำความสะอาดระบบไอน้ำรุ่นพื้นฐาน สามารถใช้งานง่ายและสะดวก มีส่วนควบคุมไอน้ำ 2 ระดับสำหรับปรับความเข้มข้นของไอน้ำให้เหมาะกับพื้นผิวและสิ่งสกปรก" },
                { img: "../assets/images/FC5.jpg", type: 'karcher', price: 9900, name: "FC 5 Premium", desc: "เครื่องทำความสะอาดพื้นอัตโนมัติที่จะทำความสะอาด รวมกันได้ในครั้งเดียว ทำให้พื้นของคุณเปล่งประกายโดย ไม่ต้องใช้ ไม้ถูพื้น ถังน้ำ หรือ การขัดพื้นแต่อย่างใด" },
                { img: "../assets/images/airmaskAll.jpg", type: 'innocare', price: 405, name: "Airmask + หนามเตย", desc: "ฟิลเตอร์กรองฝุ่นเพื่อสุขภาพที่ดีของคุณ" },
                { img: "../assets/images/airmask.png", type: 'innocare', price: 295, name: "Airmask", desc: "ฟิลเตอร์กรองฝุ่นเพื่อสุขภาพที่ดีของคุณ" },
                { img: "../assets/images/bazel.png", type: 'innocare', price: 110, name: "หนามเตย", desc: "" },
            ]
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
        for (let i = 0; i < this.state.productList.length; i++) {
            if(this.state.productList[i].type == type)
                usedlist.push(this.state.productList[i])
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
                                <img className='product-image' src={data.img} />
                                <div className='product-name'>{data.name}</div>
                                <div className='product-price'>{data.price} บาท</div>
                                <button className='pick-button' onClick={() => this.openModal(data)}>ซื้อเลย</button>
                            </div>
                        )
                    return (
                        <div className='product-card'>
                            <img className='product-image' src={data.img} />
                            <div className='product-name'>{data.name}</div>
                            <div className='product-price'>{data.price} บาท</div>
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