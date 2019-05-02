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
            { img: "../assets/images/K5.jpg", rating: 2.4, tag: '1234', name: "K 5 Premium", desc: "เครื่องฉีดน้ำแรงดันสูง K5 Premium พร้อมมอเตอร์แบบระบายความร้อนด้วยน้ำและรอกม้วนสายได้รับการออกแบบเพื่อความสะดวกในการใช้งาน เหมาะที่สุดสำหรับงานที่สกปรกปานกลาง เช่น รถขนาดใหญ่ ผนังหิน และจักรยาน" },
            { img: "../assets/images/K4.jpg", rating: 2.1, tag: '1340', name: "K 4 Basic", desc: "เครื่องฉีดน้ำ K 4 Basic พร้อมมอเตอร์แบบระบายความร้อนด้วยน้ำสำหรับการใช้งานเป็นครั้งคราวและสกปรกปานกลาง เช่น รถยนต์ รั้วสวน จักรยาน เป็นต้น มีมือจับแบบยืดได้และประหยัดพื้นที่" },
            { img: "../assets/images/K2420.jpg", rating: 3.4, tag: '1360', name: "K 2.420 Air Con *KAP", desc: "เครื่องฉีดน้ำแรงดันสูงที่เหมาะสำหรับการทำความสะอาดในส่วนที่ยากจะเข้าถึง เช่นหลังคอมเพรสเซอร์แอร์ ใต้ท้องรถ ฯลฯ และให้ผลลัพธ์ที่ดีและรวดเร็วกว่าเมื่อเทียบกับการใช้แปรงหรืออุปกรณ์ขัดถูใดๆ" },
            { img: "../assets/images/K2360.jpg", rating: 4.4, tag: '1440', name: "K 2.360", desc: "เคลื่อนย้ายได้และขนาดกะทัดรัด: เครื่องมืออเนกประสงค์สำหรับการใช้งานเป็นครั้งคราว สมบูรณ์แบบสำหรับงานที่สกปรกน้อย (เช่น เฟอร์นิเจอร์ในสวน จักรยาน และพื้นที่เล็กๆ รอบบ้าน)" },
            { img: "../assets/images/K2350.jpg", rating: 2.5, tag: '1520', name: "K 2.350", desc: "เคลื่อนย้ายได้และขนาดกะทัดรัด: เครื่องมืออเนกประสงค์สำหรับการใช้งานเป็นครั้งคราว สมบูรณ์แบบสำหรับงานที่สกปรกน้อย (เช่น เฟอร์นิเจอร์ในสวน จักรยาน และพื้นที่เล็กๆ รอบบ้าน)" },
            { img: "../assets/images/K2050.jpg", rating: 3.0, tag: '1690', name: "K 2.050", desc: "เครื่องมืออเนกประสงค์ ขนาดเล็ก น้ำหนักเบา สำหรับการใช้งานเป็นครั้งคราวและสกปรกน้อย เช่น เฟอร์นิเจอร์ในสวน จักรยาน และพื้นที่เล็กๆ โดยรอบบ้าน" },
            { img: "../assets/images/K3450.jpg", rating: 1.5, tag: '1780', name: "K 3.450", desc: "เครื่องฉีดน้ำแรงดันสูง รุ่น K 3.450 พร้อมมอเตอร์ขดลวด เหมาะสำหรับงานขจัดสิ่งสกปรกปานกลางเป็นครั้งคราว (เช่น รถยนต์ รั้วสวน และจักรยาน)" },
            { img: "../assets/images/K2200.jpg", rating: 5.0, tag: '1123', name: "K 2.200 Balcony", desc: "เครื่องมืออเนกประสงค์ที่เหมาะกับระเบียงทุกรูปแบบ เหมาะสำหรับการทำความสะอาดกระถางปลูกดอกไม้ เฟอร์นิเจอร์บริเวณระเบียง ฯลฯ และให้ผลลัพธ์ที่ดีและรวดเร็วกว่าเมื่อเทียบกับการใช้แปรงหรืออุปกรณ์ขัดถูใดๆ" },
        ]
    }

    renderProduct() {
        let product = []
        for (let i = 0; i < this.state.productList.length; i += 4) {
            console.log(i)
            product.push(this.renderRow(this.state.productList.slice(i, i + 4)))
            console.log(this.state.productList.length)
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
        console.log(this.props.productReducer.products)
    }

    renderRow(list) {
        console.log(list)
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
                        <div className="product-catalogue-text">คำอธิบายสินค้า</div>
                        <div className="product-catalogue-transtext">(คำอธิบายสินค้า)</div>
                        {this.renderProduct()}
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(state => state)(Product)