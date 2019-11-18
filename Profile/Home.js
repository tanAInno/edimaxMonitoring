import React, { Component } from 'react';
import axios from 'axios'
import '../css/Register.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { Link, Redirect } from 'react-router-dom';
import route from '../api';
import Header from '../Header'
import Footer from '../Footer'
import ProfileNav from './ProfileNav'
import { connect } from 'react-redux'
import { setMenu, setAddress, setCompany, setDistrict, setEmail, setName, setPhone, setProvince, setSubdistrict, setSurname, setUser, setUserId, setZipcode } from '../actions/user'

class Home extends Component {

    async editProfile() {
        let user = {
            username: this.props.userReducer.user.username,
            password: this.props.userReducer.user.password,
            type: this.props.userReducer.user.type,
            name: this.props.userReducer.name,
            surname: this.props.userReducer.surname,
            email: this.props.userReducer.email,
            phone: this.props.userReducer.phone,
            company: this.props.userReducer.company,
            address: this.props.userReducer.address,
            subdistrict: this.props.userReducer.subdistrict,
            district: this.props.userReducer.district,
            province: this.props.userReducer.province,
            zipcode: this.props.userReducer.zipcode,
            productOrderList: this.props.userReducer.user.productOrderList,
            serviceOrderList: this.props.userReducer.user.serviceOrderList
        }
        await axios.put(route + "users/" + this.props.userReducer.user_id, user).catch(error => console.log(error))
        this.props.dispatch(setUser(user))
        this.props.dispatch(setMenu("profile"))
    }

    handleChangeWithKey = (key, e) => {
        if (key == "name")
            this.props.dispatch(setName(e.target.value))
        if (key == "surname")
            this.props.dispatch(setSurname(e.target.value))
        if (key == "email")
            this.props.dispatch(setEmail(e.target.value))
        if (key == "phone")
            this.props.dispatch(setPhone(e.target.value))
        if (key == "address")
            this.props.dispatch(setAddress(e.target.value))
        if (key == "company")
            this.props.dispatch(setCompany(e.target.value))
        if (key == "zipcode")
            this.props.dispatch(setZipcode(e.target.value))
        if (key == "province")
            this.props.dispatch(setProvince(e.target.value))
        if (key == "district")
            this.props.dispatch(setDistrict(e.target.value))
        if (key == "subdistrict")
            this.props.dispatch(setSubdistrict(e.target.value))
    }

    renderContent() {
        const user = this.props.userReducer.user
        const menu = this.props.userReducer.menu
        if (menu == "profile") {
            return (
                <div className="profile-content-box-wrapper">
                    <div className="profile-content-header-wrapper">
                        <div className="profile-content-header">ข้อมูลส่วนตัว</div>
                        <div className="profile-content-sub-header">จัดการข้อมูลส่วนตัวเพื่อความปลอดภัยของบัญชีนี้</div>
                        <div className="profile-content-edit" onClick={() => this.props.dispatch(setMenu("edit"))}>แก้ไข</div>
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-detail-header">ชื่อ</div>
                        <div className="profile-detail-text">{user.name}</div>
                        <div className="profile-detail-header">นามสกุล</div>
                        <div className="profile-detail-text">{user.surname}</div>
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-detail-header">E-mail</div>
                        <div className="profile-detail-text">{user.email}</div>
                        <div className="profile-detail-header">โทรศัพท์มือถือ</div>
                        <div className="profile-detail-text">{user.phone}</div>
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-detail-header">บริษัท</div>
                        <div className="profile-detail-text">{user.company}</div>
                        <div className="profile-detail-header">บ้านเลขที่</div>
                        <div className="profile-detail-text">{user.address}</div>
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-detail-header">ตำบล</div>
                        <div className="profile-detail-text">{user.subdistrict}</div>
                        <div className="profile-detail-header">อำเภอ</div>
                        <div className="profile-detail-text">{user.district}</div>
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-detail-header">จังหวัด</div>
                        <div className="profile-detail-text">{user.province}</div>
                        <div className="profile-detail-header">รหัสไปรษณีย์</div>
                        <div className="profile-detail-text">{user.zipcode}</div>
                    </div>
                </div>
            )
        }
        if (menu == "edit") {
            return (
                <div className="profile-content-box-wrapper">
                    <div className="profile-content-header-wrapper">
                        <div className="profile-content-header">ข้อมูลส่วนตัว</div>
                        <div className="profile-content-sub-header">จัดการข้อมูลส่วนตัวเพื่อความปลอดภัยของบัญชีนี้</div>
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-detail-header">ชื่อ</div>
                        <input className="profile-detail-input" value={this.props.userReducer.name} onChange={e => this.handleChangeWithKey("name", e)} />
                        <div className="profile-detail-header">นามสกุล</div>
                        <input className="profile-detail-input" value={this.props.userReducer.surname} onChange={e => this.handleChangeWithKey("surname", e)} />
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-detail-header">E-mail</div>
                        <input className="profile-detail-input" value={this.props.userReducer.email} onChange={e => this.handleChangeWithKey("email", e)} />
                        <div className="profile-detail-header">โทรศัพท์มือถือ</div>
                        <input className="profile-detail-input" value={this.props.userReducer.phone} onChange={e => this.handleChangeWithKey("phone", e)} />
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-detail-header">บริษัท</div>
                        <input className="profile-detail-input" value={this.props.userReducer.company} onChange={e => this.handleChangeWithKey("company", e)} />
                        <div className="profile-detail-header">บ้านเลขที่</div>
                        <input className="profile-detail-input" value={this.props.userReducer.address} onChange={e => this.handleChangeWithKey("address", e)} />
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-detail-header">ตำบล</div>
                        <input className="profile-detail-input" value={this.props.userReducer.subdistrict} onChange={e => this.handleChangeWithKey("subdistrict", e)} />
                        <div className="profile-detail-header">อำเภอ</div>
                        <input className="profile-detail-input" value={this.props.userReducer.district} onChange={e => this.handleChangeWithKey("district", e)} />
                    </div>
                    <div className="profile-content-row">
                        <div className="profile-detail-header">จังหวัด</div>
                        <input className="profile-detail-input" value={this.props.userReducer.province} onChange={e => this.handleChangeWithKey("province", e)} />
                        <div className="profile-detail-header">รหัสไปรษณีย์</div>
                        <input className="profile-detail-input" value={this.props.userReducer.zipcode} onChange={e => this.handleChangeWithKey("zipcode", e)} />
                    </div>
                    <div className="profile-content-button-group">
                        <button className="profile-content-button" onClick={() => this.editProfile()}>ยืนยัน</button>
                        <button className="profile-content-button" onClick={() => this.props.dispatch(setMenu("profile"))}>ยกเลิก</button>
                    </div>
                </div>
            )
        }
        if(menu == "history") {
            return (
                <div className="profile-content-box-wrapper">
                <Tabs className="shopping-modal-tab-wrapper"
                        activeLinkStyle={{ background: "#7FD0DA", color: "#FFFFFF" }}>
                        <div className="shopping-modal-tab-header-wrapper">
                            <TabLink className="shopping-modal-tab" to="unpaid">
                                ที่ต้องชำระ
                            </TabLink>
                            <TabLink className="shopping-modal-tab" to="processing">
                                ระหว่างดำเนินการ
                            </TabLink>
                            <TabLink className="shopping-modal-tab" to="finish">
                                เสร็จสิ้น
                            </TabLink>
                        </div>
                        <TabContent for="unpaid">
                        </TabContent>
                        <TabContent for="processing">
                        </TabContent>
                        <TabContent for="finish">
                        </TabContent>
                </Tabs>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="profile-wrapper">
                <Header active="main" />
                <div className="profile-content">
                    <ProfileNav className="profile-nav" />
                    <div className="profile-content-box">
                        {this.renderContent()}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect(state => state)(Home)