import React, { Component } from 'react';
import axios from 'axios'
import '../css/Product.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import StarRatings from 'react-star-ratings';
import { setProducts } from '../actions/product';
import { connect } from 'react-redux'

class Product extends Component {

    state = {
        productList: [
            { img: "../assets/images/K2420.jpg", rating: 3.4, tag: '1234', name: "K 2.420", desc: "เครื่องฉีดน้ำแรงดันสูงที่เหมาะสำหรับการทำความสะอาดในส่วนที่ยากจะเข้าถึง เช่นหลังคอมเพรสเซอร์แอร์ ใต้ท้องรถ ฯลฯ และให้ผลลัพธ์ที่ดีและรวดเร็วกว่าเมื่อเทียบกับการใช้แปรงหรืออุปกรณ์ขัดถูใดๆ" },
            { img: "../assets/images/SC2.jpg", rating: 4.4, tag: '1235', name: "SC 2 Easy Fix", desc: "เครื่องทำความสะอาดระบบไอน้ำรุ่นพื้นฐาน สามารถใช้งานง่ายและสะดวก มีส่วนควบคุมไอน้ำ 2 ระดับสำหรับปรับความเข้มข้นของไอน้ำให้เหมาะกับพื้นผิวและสิ่งสกปรก" },
            { img: "../assets/images/SC2D.jpg", rating: 2.5, tag: '1236', name: "SC 2 Deluxe Easy Fix", desc: "เครื่องทำความสะอาดระบบไอน้ำรุ่นพื้นฐาน สามารถใช้งานง่ายและสะดวก มีส่วนควบคุมไอน้ำ 2 ระดับสำหรับปรับความเข้มข้นของไอน้ำให้เหมาะกับพื้นผิวและสิ่งสกปรก" },
            { img: "../assets/images/FC5.jpg", rating: 3.0, tag: '1237', name: "FC 5 Premium", desc: "เครื่องทำความสะอาดพื้นอัตโนมัติที่จะทำความสะอาด รวมกันได้ในครั้งเดียว ทำให้พื้นของคุณเปล่งประกายโดย ไม่ต้องใช้ ไม้ถูพื้น ถังน้ำ หรือ การขัดพื้นแต่อย่างใด" },
        ]
    }

    renderProduct() {
        let product = []
        for (let i = 0; i < this.state.productList.length; i += 4) {
            product.push(this.renderRow(this.state.productList.slice(i, i + 4)))
        }
        return product
    }

    addToCart(data) {
        let products = this.props.productReducer.products
        let newobj = {img: data.img,name: data.name,desc: data.desc,tag: data.tag,amount: 1}
        let exist = false
        for(let i=0; i < products.length;i++){
            if(products[i].name == data.name){
                products[i].amount += 1
                exist = true
            }
        }
        if(!exist)
            products.push(newobj)
        this.props.dispatch(setProducts(products))
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
                            <button className='detail-button' onClick={() => this.addToCart(data)}>หยิบใส่รถเข็น</button>
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
                        <img className="karcher-logo" src={"../assets/images/karcher.png"}/>
                        {this.renderProduct()}
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(Product)