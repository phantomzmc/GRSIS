import React, { Component } from 'react'
import ImageUploader from 'react-images-upload';
import { Image } from 'semantic-ui-react';
import './tranfer.css'


class TranferPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            image : "https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png"
        };
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
            image : this.state.pictures.concat(picture)[0].name
        });
        console.log(this.state.pictures.concat(picture)[0].name)
    }
    render() {
        return (
            <div>
                <h3>หลักฐานการชำระค่าสั่งซื้อภาพ</h3>
                <ImageUploader
                    label="* หมายเหตุ : กรุณาแนบหลักฐานการชำระค่าสั่งซื้อภาพ ไฟล์ที่สามารถ upload ได้คือ JPG, PNG ขนาดไม่เกิน 3 MB"
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
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
            </div>
        )
    }
}

export default TranferPayment