import React, { Component } from 'react';
import axios from 'axios'
import '../css/Admin.css'
import '../css/ProductCreate.css'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import { connect } from 'react-redux'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'
import route from '../api'

class ProductCreate extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            type: '',
            price: '',
            description: '',
            imagePreviewUrl: '',
        }
    }

    handleChangeWithKey = (key, e) => {
        if (key == "name")
            this.setState({ name: e.target.value })
        if (key == "type")
            this.setState({ type: e.target.value })
        if (key == "price")
            this.setState({ price: e.target.value })
        if (key == "description")
            this.setState({ description: e.target.value })
    }

    async create() {
        await axios.post(route + "productAds", {
            name: this.state.name,
            image: this.state.imagePreviewUrl,
            type: this.state.type,
            price: this.state.price,
            description: this.state.description,
        })
        location.reload()
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

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img className="previewImage" src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">อัพโหลดรูปสินค้า</div>);
        }
        return (
            <div className="product-create-wrapper">
                <div className="product-create-content">
                    <div className="product-create-header">เพิ่ม Product ใหม่ลงไปในเว็บไซต์</div>
                    <div className="product-create-input-content">
                        <div className="product-create-input-left">
                            <div className="product-create-input-text">ชื่อ Product</div>
                            <input className="product-create-input-field"
                                value={this.state.name}
                                onChange={e => this.handleChangeWithKey("name", e)} />
                            <div className="product-create-input-text">หมวดหมู่ Product</div>
                            <input className="product-create-input-field"
                                value={this.state.type}
                                onChange={e => this.handleChangeWithKey("type", e)} />
                            <div className="product-create-input-text">ราคา Product</div>
                            <input className="product-create-input-field"
                                value={this.state.price}
                                onChange={e => this.handleChangeWithKey("price", e)} />
                            <div className="product-create-input-text">คำอธิบาย Product</div>
                            <input className="product-create-input-field"
                                value={this.state.description}
                                onChange={e => this.handleChangeWithKey("description", e)} />
                            <button className="product-create-button" onClick={() => this.create()}>สร้าง Product</button>
                        </div>
                        <div className="product-create-input-right">
                            <div className="product-create-previewcomponent">
                                <form onSubmit={(e) => this.handleSubmit(e)}>
                                    <FileUploader
                                        className="product-create-fileInput"
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
                                <div className="product-create-imgPreview">
                                    {$imagePreview}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ProductCreate