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
                { img: "../assets/images/K2420.jpg", rating: 3.4, tag: '1234', name: "K 2.420", desc: "เครื่องฉีดน้ำแรงดันสูงที่เหมาะสำหรับการทำความสะอาดในส่วนที่ยากจะเข้าถึง เช่นหลังคอมเพรสเซอร์แอร์ ใต้ท้องรถ ฯลฯ และให้ผลลัพธ์ที่ดีและรวดเร็วกว่าเมื่อเทียบกับการใช้แปรงหรืออุปกรณ์ขัดถูใดๆ" },
                { img: "../assets/images/SC2.jpg", rating: 4.4, tag: '1235', name: "SC 2 Easy Fix", desc: "เครื่องทำความสะอาดระบบไอน้ำรุ่นพื้นฐาน สามารถใช้งานง่ายและสะดวก มีส่วนควบคุมไอน้ำ 2 ระดับสำหรับปรับความเข้มข้นของไอน้ำให้เหมาะกับพื้นผิวและสิ่งสกปรก" },
                { img: "../assets/images/SC2D.jpg", rating: 2.5, tag: '1236', name: "SC 2 Deluxe Easy Fix", desc: "เครื่องทำความสะอาดระบบไอน้ำรุ่นพื้นฐาน สามารถใช้งานง่ายและสะดวก มีส่วนควบคุมไอน้ำ 2 ระดับสำหรับปรับความเข้มข้นของไอน้ำให้เหมาะกับพื้นผิวและสิ่งสกปรก" },
                { img: "../assets/images/FC5.jpg", rating: 3.0, tag: '1237', name: "FC 5 Premium", desc: "เครื่องทำความสะอาดพื้นอัตโนมัติที่จะทำความสะอาด รวมกันได้ในครั้งเดียว ทำให้พื้นของคุณเปล่งประกายโดย ไม่ต้องใช้ ไม้ถูพื้น ถังน้ำ หรือ การขัดพื้นแต่อย่างใด" },
                { img: "../assets/images/airmaskAll.jpg", rating: 4.5, tag: '1238', name: "Airmask + หนามเตย", desc: "ฟิลเตอร์กรองฝุ่นเพื่อสุขภาพที่ดีของคุณ" },
                { img: "../assets/images/airmask.png", rating: 3.8, tag: '1239', name: "Airmask", desc: "ฟิลเตอร์กรองฝุ่นเพื่อสุขภาพที่ดีของคุณ" },
                { img: "../assets/images/bazel.png", rating: 3.3, tag: '1240', name: "หนามเตย", desc: "" },
            ]
        }
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

    renderProduct() {
        let product = []
        for (let i = 0; i < this.state.productList.length; i += 4) {
            product.push(this.renderRow(this.state.productList.slice(i, i + 4)))
        }
        return product
    }

    renderRow(list) {
        return (
            <div className='product-row'>
                {list.map((data, index) => {
                    return (
                        <div className='product-card'>
                            <img className='product-image' src={data.img} />
                            <div className='product-name'>{data.name}</div>
                            <div className='product-description'>{data.desc}</div>
                            <div className='product-tag'>รหัสสินค้า {data.tag}</div>
                            <StarRatings
                                rating={data.rating}
                                starDimension="25px"
                                starSpacing="5px"
                                starRatedColor="#003678"
                                className="star-rating"
                            />
                            {/*<button className='detail-button'>ดูรายละเอียด</button>*/}
                            <button className='pick-button' onClick={() => this.openModal(data)}>หยิบสินค้าใส่รถเข็น</button>
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
                    <div className='product-navbar'>
                        <div className='product-navbar-header'>
                            สินค้าและบริการ
                        </div>
                        <div className="product-navbar-text">
                            INNO PRODUCT
                        </div>
                        <div className="product-navbar-subtext">
                            INNOCARE
                        </div>
                        <div className="product-navbar-subitem">
                            - AIRMASK
                        </div>
                        <div className="product-navbar-subitem">
                            - OTHER
                        </div>
                        <div className="product-navbar-subtext">
                            KARCHER
                        </div>
                        <div className="product-navbar-subitem">
                            - เครื่องดูดฝุ่น
                        </div>
                        <div className="product-navbar-subitem">
                            - มอเตอร์
                        </div>
                        <div className="product-navbar-subtext">
                            จักรยานไฟฟ้า
                        </div>
                    </div>
                    <div className='product-catalogue'>
                        <div className="product-catalogue-header">
                            <img className="karcher-logo" src={"../assets/images/karcher.png"} />
                            <Link to="/product/shoppingcart" className="product-catalogue-button-wrapper">
                                <button className="product-catalogue-button">
                                    ไปยังหน้ารถเข็น
                                </button>
                            </Link>
                        </div>
                        {this.renderProduct()}
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={() => this.afterOpenModal()}
                        onRequestClose={() => this.closeModal()}
                        contentLabel="หยิบสินค้าใส่รถเข็น"
                        style={customStyles}
                    >
                        <ProductModal
                            img={this.props.productReducer.choosenProduct.img}
                            name={this.props.productReducer.choosenProduct.name}
                            desc={this.props.productReducer.choosenProduct.desc}
                            tag={this.props.productReducer.choosenProduct.tag}
                            rating={this.props.productReducer.choosenProduct.rating}
                        />
                    </Modal>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(Product)