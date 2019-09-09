import React, { Component } from 'react';
import axios from 'axios'
import '../css/Checkout.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import { setProducts, setTotalProductPrice } from '../actions/product';
import { setUser } from '../actions/user'
import { Link, Redirect } from 'react-router-dom';
import Header from '../Header'
import Select from 'react-select'
import route from '../api'
import Footer from '../Footer'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'

class Checkout extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            company: '',
            address: '',
            province: '',
            district: '',
            subdistrict: '',
            phone: '',
            zipcode: '',
            homephone: '',
            password: '',
            confirmpassword: '',
            imagePreviewUrl: '',
            nextPage: false,
            showDialog: false
        }
    }

    componentDidMount() {
        this.setState({name: this.props.userReducer.user.name})
        this.setState({email: this.props.userReducer.user.email})
        this.setState({company: this.props.userReducer.user.company})
        this.setState({phone: this.props.userReducer.user.phone})
        this.setState({address: this.props.userReducer.user.address})
        this.setState({province: this.props.userReducer.user.province})
        this.setState({district: this.props.userReducer.user.district})
        this.setState({subdistrict: this.props.userReducer.user.subdistrict})
        this.setState({zipcode: this.props.userReducer.user.zipcode})
    }

    handleChangeWithKey = (key, e) => {
        if (key == "name")
            this.setState({ name: e.target.value })
        if (key == "email")
            this.setState({ email: e.target.value })
        if (key == "company")
            this.setState({ company: e.target.value })
        if (key == "phone")
            this.setState({ phone: e.target.value })
        if (key == "address")
            this.setState({ address: e.target.value })
        if (key == "province")
            this.setState({ province: e.target.value })
        if (key == "district")
            this.setState({ district: e.target.value })
        if (key == "subdistrict")
            this.setState({ subdistrict: e.target.value })
        if (key == "zipcode")
            this.setState({ zipcode: e.target.value })
        if (key == "homephone")
            this.setState({ homephone: e.target.value })
    }

    requestCheckout() {
        if(this.state.name != "" && this.state.email != "" && this.state.company != "" && this.state.address != "" && this.state.subdistrict != "" && this.state.district != "" && this.state.province != "" && this.state.phone != "" && this.state.zipcode != "" && this.state.imagePreviewUrl != ""){
            this.sendRequest()
            this.setState({nextPage : true})
        }
        else{
            this.setState({showDialog : true})
        }
    }

    async sendRequest() {
        if (this.props.productReducer.products.length > 0) {
            await axios.post(route + "products", {
                name: this.state.name,
                email: this.state.email,
                company: this.state.company,
                address: this.state.address,
                province: this.state.province,
                district: this.state.district,
                subdistrict: this.state.subdistrict,
                phone: this.state.phone,
                zipcode: this.state.zipcode,
                homephone: this.state.homephone,
                productList: this.props.productReducer.products,
                totalprice: this.props.productReducer.totalprice,
                paymentImage: this.state.imagePreviewUrl
            }).catch(error => console.log(error))
            this.updateUserProduct()
        }
        this.props.dispatch(setProducts([]))
        this.props.dispatch(setTotalProductPrice(0))
    }

    async updateUserProduct() {
        let productOrderList = this.props.userReducer.user.productOrderList
        productOrderList.push({ productList: this.props.productReducer.products, paymentImage: this.state.imagePreviewUrl })
        await axios.put(route + "userproduct/" + this.props.userReducer.user._id, {
            productOrderList: productOrderList
        }).catch(error => console.log(error))
        let user = this.props.userReducer.user
        user.productOrderList = productOrderList
        this.props.dispatch(setUser(user))
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({ image: filename, progress: 100, isUploading: false });
        firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ imagePreviewUrl: url }));
    };

    renderDialog(){
        if(this.state.showDialog == true)
            return <div className="checkout-dialog">กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน รวมทั้ง Upload รูปภาพหลักฐานการโอนเงิน เพื่อดำเนินการต่อ</div>
        else
            return <div/>
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img className="previewImage" src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">อัพโหลดรูปเพื่อส่งหลักฐานการชำระเงิน</div>);
        }
        if(this.state.nextPage == true)
            return <Redirect to="/product/confirmation"/>
        return (
            <div className="product-wrapper">
                <Header active="product" />
                <div className="shopping-status-container">
                    <Link className="shopping-status-first" to="/product/shoppingcart" style={{ textDecoration: 'none' }}>
                        <div className="shopping-status-circle">
                            <div>1</div>
                        </div>
                        <div className="shopping-status-text">รถเข็น</div>
                    </Link>
                    <Link className="shopping-status-second" to="/product/checkout" style={{ textDecoration: 'none' }}>
                        <div className="shopping-status-circle-active">
                            <div>2</div>
                        </div>
                        <div className="shopping-status-text">วิธีจัดส่งและวิธีชำระเงิน</div>
                    </Link>
                    <div className="shopping-status-third">
                        <div className="shopping-status-circle">
                            <div>3</div>
                        </div>
                        <div className="shopping-status-text">เสร็จสมบูรณ์</div>
                    </div>
                </div>
                <div className="tab-container">
                    <div className="checkout-container">
                        <div className="checkout-box">
                            <div className="checkout-form">
                                <div className="checkout-form-header">1. สถานที่จัดส่ง</div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">ชื่อ *</div>
                                        <input className="checkout-input"
                                            value={this.state.name}
                                            onChange={e => this.handleChangeWithKey("name", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">อีเมล *</div>
                                        <input className="checkout-input"
                                            value={this.state.email}
                                            onChange={e => this.handleChangeWithKey("email", e)} />
                                    </div>
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">บริษัท *</div>
                                        <input className="checkout-input"
                                            value={this.state.company}
                                            onChange={e => this.handleChangeWithKey("company", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">ที่อยู่ *</div>
                                        <input className="checkout-input"
                                            value={this.state.address}
                                            onChange={e => this.handleChangeWithKey("address", e)} />
                                    </div>
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">จังหวัด *</div>
                                        <input className="checkout-input"
                                            value={this.state.province}
                                            onChange={e => this.handleChangeWithKey("province", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">อำเภอ / เขต *</div>
                                        <input className="checkout-input"
                                            value={this.state.district}
                                            onChange={e => this.handleChangeWithKey("district", e)} />
                                    </div>
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">ตำบล / แขวง *</div>
                                        <input className="checkout-input"
                                            value={this.state.subdistrict}
                                            onChange={e => this.handleChangeWithKey("subdistrict", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">รหัสไปรษณีย์ *</div>
                                        <input className="checkout-input"
                                            value={this.state.zipcode}
                                            onChange={e => this.handleChangeWithKey("zipcode", e)} />
                                    </div>
                                </div>
                                <div className="checkout-input-row">
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">โทรศัพท์มือถือ *</div>
                                        <input className="checkout-input"
                                            value={this.state.phone}
                                            onChange={e => this.handleChangeWithKey("phone", e)} />
                                    </div>
                                    <div className="checkout-input-wrapper">
                                        <div className="checkout-input-header">โทรศัพท์</div>
                                        <input className="checkout-input"
                                            value={this.state.homephone}
                                            onChange={e => this.handleChangeWithKey("homephone", e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="checkout-shopping-form">
                                <div className="checkout-form-header">2. รายการสินค้า</div>
                                {this.props.productReducer.products.map((data, index) => {
                                    return (
                                        <div className="checkout-shopping-row">
                                            <img className="checkout-shopping-image" src={data.img} />
                                            <div className="checkout-shopping-info">
                                                <div className="checkout-shopping-name">{data.name}</div>
                                                <div className="checkout-shopping-price">{data.price} บาท</div>
                                                <div className="checkout-shopping-amount">จำนวน {data.amount}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="checkout-total-row">
                                    <div className="checkout-total-header">รวม</div>
                                    <div className="checkout-total-text">{this.props.productReducer.totalprice} บาท</div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-payment-box">
                            <div className="checkout-form-header">3. วิธีชำระเงิน</div>
                            <div className="checkout-payment-content">
                                <div className="checkout-payment-detail">
                                    <img className="checkout-payment-img" src={"../assets/images/tmb.jpg"} />
                                    <div className="checkout-payment-text-group">
                                        <div className="checkout-payment-text-row">
                                            <div className="checkout-payment-text-header">ช่องทางธนาคาร</div>
                                            <div className="checkout-payment-text">ธนาคารทหารไทยจำกัด มหาชน</div>
                                        </div>
                                        <div className="checkout-payment-text-row">
                                            <div className="checkout-payment-text-header">เลขที่บัญชี</div>
                                            <div className="checkout-payment-text">069-2-64698-7</div>
                                        </div>
                                        <div className="checkout-payment-text-row">
                                            <div className="checkout-payment-text-header">ชื่อบัญชี</div>
                                            <div className="checkout-payment-text">บริษัท อินโนเวชั่น เทคโนโลยี จำกัด</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment-text-detail">(รูปสลิปหลักฐานการโอนเงินสามารถ Upload ในภายหลังได้ในหน้าการสั่งซื้อของคุณ)</div> 
                                <div className="previewComponent">
                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <FileUploader
                                            className="fileInput"
                                            accept="image/*"
                                            name="image"
                                            randomizeFilename
                                            storageRef={firebase.storage().ref("images")}
                                            onUploadStart={this.handleUploadStart}
                                            onUploadError={this.handleUploadError}
                                            onUploadSuccess={this.handleUploadSuccess}
                                            onProgress={this.handleProgress}
                                        />
                                    </form>
                                    <div className="imgPreview">
                                        {$imagePreview}
                                    </div>
                                </div>
                                <div className="checkout-confirm-button-wrapper">
                                    <button className="checkout-confirm-button" onClick={() => this.requestCheckout()}>ยืนยันการสั่งซื้อ</button>
                                </div>
                                {this.renderDialog()}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default connect(state => state)(Checkout)