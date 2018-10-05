import React, { Component } from 'react'
import ImageUploader from 'react-images-upload';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Form } from 'reactstrap'
import { Image, Button, Icon, Header } from 'semantic-ui-react';
// import Modal from "react-responsive-modal";
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
            file: null,
            uploadImg: false,
            fileImage: ""
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
                this.setState({ img: responseJson.data.files[0], uploadImg: false })
                this.props.setSlip(responseJson.data.files[0])
            }).catch((error) => {
            });
    }
    onChange(e) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({ fileImage: e.target.result });
        };
        reader.readAsDataURL(e.target.files[0]);
        this.setState({ file: e.target.files[0] });
        setTimeout(() => {
            console.log(this.state.image)
        }, 100)
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
                    {this.state.fileImage === "" ?
                        <div>
                            <Header as='h2' icon>
                                <Icon name='images' />
                                <p>หลักฐานการชำระค่าสั่งซื้อภาพ</p>
                                {/* <Header.Subheader>Manage your account settings and set e-mail preferences.</Header.Subheader> */}
                            </Header>
                        </div>
                        :
                        <img src={this.state.img} width="250px" height="250px" />
                    }
                </div>
                {/* <ImageUploader
                    label="* หมายเหตุ : กรุณาแนบหลักฐานการชำระค่าสั่งซื้อภาพ ไฟล์ที่สามารถ upload ได้คือ JPG, PNG ขนาดไม่เกิน 3 MB"
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onChange}
                    type="file"
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                /> */}
                <div className="body-slip">
                    <span style={{ marginBottom: 20, marginTop: 20 }}>* หมายเหตุ : กรุณาแนบหลักฐานการชำระค่าสั่งซื้อภาพ ไฟล์ที่สามารถ upload ได้คือ JPG, PNG ขนาดไม่เกิน 3 MB</span>
                    <Button inverted color='orange' onClick={() => this.setState({ uploadImg: true })} className="btn-prev">
                        <p>แนบหลักฐานการโอนเงิน</p>
                    </Button>
                </div>

                <Modal isOpen={this.state.uploadImg} toggle={() => this.setState({ uploadImg: false })} size="sm">
                    <Form onSubmit={this.onFormSubmit}>
                        <ModalHeader toggle={() => this.setState({ uploadImg: false })}><p>อัพโหลดรูปภาพ</p></ModalHeader>
                        <ModalBody className="body-slip">
                            <p>แนบเฉพาะหลักฐานการโอนเงิน .jpg, .png ขนาดไม่เกิน 3 MB . แนะนำที่ขนาดที่เหมาะสม 350 x 350 px.</p>
                            <div className="img-slip">
                                <div>
                                    {this.state.fileImage === "" ?
                                        <div id="input-file">
                                            <Input type="file" name="myImage" onChange={this.onChange} maxLength={5242880} placeholder="แนบหลักฐานการโอนเงิน" />
                                        </div>
                                        :
                                        <img src={this.state.fileImage} width="200px" height="200px" />
                                    }
                                </div>
                            </div>
                            <div>
                                {this.state.fileImage !== "" ?
                                    <Button color="gray" onClick={() => this.setState({ fileImage: "" })}>เอาออก</Button>
                                    :
                                    <div></div>
                                }
                                {/* <Input type="file" name="myImage" onChange={this.onChange} maxLength={5242880} placeholder="แนบหลักฐานการโอนเงิน" /> */}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="orange" type="submit">Upload</Button>{' '}
                            <Button color="gray" onClick={() => this.setState({ uploadImg: false })}>ปิดหน้านี้</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                <div id="btn-submit">
                    <Button inverted color='red' onClick={() => this.props.clickPrev()} className="btn-prev">
                        <p>ย้อนกลับ</p>
                    </Button>
                    {this.state.fileImage === "" ?
                        <Button inverted color='green' onClick={() => this.submitUpImg()} className="btn-next" type="submit" disabled>
                            <p>ชำระค่าบริการ</p>
                        </Button>
                        :
                        <Button inverted color='green' onClick={() => this.submitUpImg()} className="btn-next" type="submit">
                            <p>ชำระค่าบริการ</p>
                        </Button>
                    }


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