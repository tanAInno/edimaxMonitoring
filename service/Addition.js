import React, { Component } from 'react';
import dateFns from "date-fns";
import axios from 'axios'
import Header from '../Header'
import Footer from '../Footer'
import '../assets/fonts/fontface.css'
import '../css/Addition.css'
import { BrowserRouter, Route, RefreshRoute, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { setServices, setTotalPrice, setAddition } from '../actions/service'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'

class Addition extends Component {

    state = {
        imagePreviewUrl: '',
        selectedOption: '',
        detail: ''
    }

    renderChoosenItems() {
        return (
            this.props.serviceReducer.services.map((data, index) => {
                return (
                    <div className="service-booking-reserve-item-wrapper">
                        <div className="service-booking-reserve-item-header">{data.name}</div>
                        <div className="service-booking-reserve-item">
                            <button className="service-booking-reserve-item-minus" onClick={() => this.minus(data)}>-</button>
                            <div className="service-booking-reserve-item-amount">{data.amount}</div>
                            <button className="service-booking-reserve-item-plus" onClick={() => this.plus(data)}>+</button>
                            <button className="service-booking-reserve-item-delete" onClick={() => this.delete(data)}>ลบ</button>
                        </div>
                    </div>
                )
            })
        )
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

    plus(data) {
        let services = this.props.serviceReducer.services
        services[services.indexOf(data)].amount += 1
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalPrice(this.props.serviceReducer.totalprice + data.price))
    }

    minus(data) {
        let services = this.props.serviceReducer.services
        let index = services.indexOf(data)
        services[index].amount -= 1
        if (services[index].amount == 0)
            services.splice(index, 1)
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalPrice(this.props.serviceReducer.totalprice - data.price))
    }

    delete(data) {
        let services = this.props.serviceReducer.services
        let index = services.indexOf(data)
        services.splice(index, 1)
        this.props.dispatch(setServices(services))
        this.props.dispatch(setTotalPrice(this.props.serviceReducer.totalprice - (data.price * data.amount)))
    }

    handleOnChange(e) {
        this.setState({selectedOption: e.target.value})
    }

    handleAreaChange(e) {
        this.setState({detail: e.target.value})
    }

    setAddition(){
        this.props.dispatch(setAddition({type: this.state.selectedOption, detail: this.state.detail, img: this.state.imagePreviewUrl}))
        console.log(this.state.selectedOption)
    }

    render() {
        const format = "D MMMM YYYY"
        let th = require('date-fns/locale/th')
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img className="previewImage" src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">อัพโหลดรูปภาพรายละเอียดของแอร์</div>);
        }
        return (
            <div className="service-wrapper">
                <Header active="service" />
                <div className="service-addition-wrapper">
                    <div className="service-booking-img-group">
                        <img className="service-booking-img" src={"../assets/images/air_1.jpg"} />
                        <img className="service-booking-img" src={"../assets/images/air_2.jpg"} />
                    </div>
                    <div className="service-booking-header">ล้างแอร์</div>
                    <div className="service-booking-order">
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/booking">
                            <div className="service-booking-order-circle-active">1</div>
                            <div className="service-booking-order-text">รายการ</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/datetime">
                            <div className="service-booking-order-circle-active">2</div>
                            <div className="service-booking-order-text">วันเวลา</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/addition">
                            <div className="service-booking-order-circle-active">3</div>
                            <div className="service-booking-order-text">เพิ่มเติม</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/address">
                            <div className="service-booking-order-circle">4</div>
                            <div className="service-booking-order-text">ที่อยู่</div>
                        </Link>
                        <Link className="service-booking-order-wrapper" style={{ textDecoration: 'none' }} to="/service/payment">
                            <div className="service-booking-order-circle">5</div>
                            <div className="service-booking-order-text">ชำระเงิน</div>
                        </Link>
                    </div>
                    <div className="service-addition-header">ใส่รายละเอียดเพิ่มเติม</div>
                    <div className="service-addition-content">
                        <div className="service-addition-input-area">
                            <div className="service-addition-type-box-first">
                                <div className="service-addition-type-header">
                                    ลักษณะพื้นที่
                                </div>
                                <div className="service-addition-radio-group">
                                    <form>
                                        <div className="service-addition-radio-row">
                                            <div className="service-addition-radio"><input type="radio" name="type" value="บ้านเดี่ยว" onChange={(e) => this.handleOnChange(e)}/> บ้านเดี่ยว</div>
                                            <div className="service-addition-radio"><input type="radio" name="type" value="ตึกแถว/ทาวน์โฮม" onChange={(e) => this.handleOnChange(e)}/> ตึกแถว/ทาวน์โฮม</div>
                                        </div>
                                        <div className="service-addition-radio-row">
                                            <div className="service-addition-radio"><input type="radio" name="type" value="อพาร์ทเม้น/คอนโด" onChange={(e) => this.handleOnChange(e)}/> อพาร์ทเม้น/คอนโด</div>
                                            <div className="service-addition-radio"><input type="radio" name="type" value="สำนักงาน" onChange={(e) => this.handleOnChange(e)}/> สำนักงาน</div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="service-addition-type-box">
                                <div className="service-addition-type-header">
                                    รายละเอียดเพิ่มเติม
                                </div>
                                <div className="service-addition-type-text">
                                    ข้อมูลเพิ่มเติมที่คุณทราบเกี่ยวกับแอร์ เราจะแจ้งข้อมูลเหล่านั้นให้กับผู้ให้บริการของคุณ
                                </div>
                                <textarea className="service-addition-type-textarea" value={this.state.detail} onChange={e => this.handleAreaChange(e)}/>
                            </div>
                            <div className="service-addition-type-box">
                                <div className="service-addition-type-header">
                                    อัพโหลดรูปภาพ
                                </div>
                                <div className="service-addition-type-text">
                                    ข้อมูลเพิ่มเติมที่คุณทราบเกี่ยวกับแอร์ เราจะแจ้งข้อมูลเหล่านั้นให้กับผู้ให้บริการของคุณ
                                </div>
                                <div className="service-previewcomponent">
                                    <div className="service-imgPreview">
                                        {$imagePreview}
                                    </div>
                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <FileUploader
                                            className="service-fileInput"
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
                                </div>
                            </div>
                        </div>
                        <div className="service-booking-reserve">
                            <div className="service-booking-reserve-box">
                                <div className="service-booking-reserve-header">ล้างแอร์</div>
                                {this.renderChoosenItems()}
                                <div className="service-booking-reserve-date-wrapper">
                                    <div className="service-booking-reserve-date-header">วันที่</div>
                                    <div className="service-booking-reserve-date">{dateFns.format(this.props.serviceReducer.selectedDate, format, { locale: th })}</div>
                                </div>
                                <div className="service-booking-reserve-date-wrapper">
                                    <div className="service-booking-reserve-date-header">เวลา</div>
                                    <div className="service-booking-reserve-date">{this.props.serviceReducer.selectedTime}</div>
                                </div>
                                <div className="service-booking-reserve-total-wrapper">
                                    <div className="service-booking-reserve-total-header">รวมยอด</div>
                                    <div className="service-booking-reserve-total">{this.props.serviceReducer.totalprice} บาท</div>
                                </div>
                            </div>
                            <Link className="service-booking-reserve-button-wrapper" style={{ textDecoration: 'none' }} to="/service/address">
                                <button className="service-booking-reserve-button" onClick={() => this.setAddition()}>ดำเนินการต่อ</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

}

export default connect(state => state)(Addition)