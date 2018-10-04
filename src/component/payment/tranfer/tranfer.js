import React, { Component } from 'react'
import ImageUploader from 'react-images-upload';
import { Image, Button } from 'semantic-ui-react';
import Modal from "react-responsive-modal";
import DetailPayment from '../detailPayment/detailPayment'
import axios from 'axios'
import './tranfer.css'

// let url_imgprofile = "https://upload.i-bitz.co.th/upload/"

class TranferPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            image: "https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png",
            layoutCart: false,
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Cache-Control': 'no-cache'
            },
            responseType: 'json'
        };
        axios.post("https://upload.i-bitz.co.th/upload/", formData, config)
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({ img: responseJson.data.files[0] })
                this.props.setSlip(responseJson.data.files[0])
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        console.log(this.state.pictures.concat(picture)[0])
        this.upimageToServe(this.state.pictures.concat(picture)[0])
    }
    upimageToServe(response) {
        var photo = {
            uri: response.uri,
            type: 'image/jpeg',
            name: response.name,
            size: response.size,
        };
        console.log(photo)
        this.setState({ img: response.name })
        var form = new FormData();
        form.append("imageLink", photo.name);

        let uri = "https://upload.i-bitz.co.th/upload/"
        axios.post(uri, form, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Cache-Control': 'no-cache'
            },
            responseType: 'json'
        })
            .then((responseJson) => {
                console.log(responseJson)
            }).catch((error) => {
                console.error(error)
            });
    }
    submitUpImg() {
        this.props.addOrder()
        setTimeout(() => {
            this.props.clickNext()
        }, 2000)
    }
    render() {
        return (
            <div>
                <div className="title-credit">
                    <h3 className="title">หลักฐานการชำระค่าสั่งซื้อภาพ</h3>
                    <Button size='medium' color='blue' id="btn-detailPay" onClick={() => this.setState({ layoutCart: true })}>
                        <p>รายละเอียดการชำระ</p>
                    </Button>
                    <img src={this.state.img} width="100%" />
                </div>
                {/* <ImageUploader
                    label="* หมายเหตุ : กรุณาแนบหลักฐานการชำระค่าสั่งซื้อภาพ ไฟล์ที่สามารถ upload ได้คือ JPG, PNG ขนาดไม่เกิน 3 MB"
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                /> */}
                <form onSubmit={this.onFormSubmit}>
                    <h1>File Upload</h1>
                    <input type="file" name="myImage" onChange={this.onChange} />
                    <button type="submit">Upload</button>
                </form>
                <div id="btn-submit">
                    <Button inverted color='red' onClick={() => this.props.clickPrev()} className="btn-prev">
                        <p>ย้อนกลับ</p>
                    </Button>
                    <Button inverted color='green' onClick={() => this.submitUpImg()} className="btn-next" type="submit">
                        <p>ชำระค่าบริการ</p>
                    </Button>

                </div>
                <div className="container-tabel">
                    <table>
                        <tr>
                            <td>
                                <div>
                                    <Image src={this.state.image} width="100" className="image-logo" />
                                </div>
                            </td>
                            <td>
                                <label className="text-bank">ธนาคารกสิกรไทย สาขาอ่อนนุช บัญชีออมทรัพย์ เลขที่ 06 02 80 95 87 ชื่อบัญชี อนุทิน น้อยศิริ</label>
                            </td>
                        </tr>
                        <tr>
                            <td><Image src="http://www.dg-arts.com/media/img/bank/kru.png" width="150" className="image-logo" /></td>
                            <td>
                                <label className="text-bank">ธนาคารกรุงศรี สาขาสุขุมวิท 101/1 (ปิยรมย์เพลส) บัญชีออมทรัพย์ เลขที่ 18 51 37 29 24 ชื่อบัญชี อนุทิน น้อยศิริ</label>
                            </td>
                        </tr>
                        <tr>
                            <td><Image src="https://www.it24hrs.com/wp-content/uploads/2016/07/prompt-pay-thai-e-payment-01.png" width="150" className="image-logo" /></td>
                            <td>
                                <label className="text-bank">พร้อมเพย์ (PromptPay) ชื่อบัญชี อนุทิน น้อยศิริ 081 817 9056</label>
                            </td>
                        </tr>

                    </table>
                </div>
                <Modal open={this.state.layoutCart} onClose={() => this.setState({ layoutCart: false })} center>
                    <DetailPayment />
                </Modal>
            </div>
        )
    }
}

export default TranferPayment