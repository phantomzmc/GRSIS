import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormText, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Header, Icon } from 'semantic-ui-react'
import Omise from '../../config/omisePayment'
// import Modal from "react-responsive-modal";
import Loader from 'react-loader-spinner'
import Cards from 'react-credit-cards';
import './form-credit.css'
import axios from 'axios'
// import './Form.css'
const base64 = require("base-64");


const ibit_pkey = 'pkey_test_5b7nut5dlzyudruopsl'
const ibit_skey = 'skey_test_5b7nwwrac7mvps7l3mp'
const test_pkey = 'pkey_test_5ctl7h1r2lazhxd1ovk'
const test_skey = 'skey_test_5ctl7j62s80mqyznvd3'
Omise.config(ibit_pkey, ibit_skey, '2015-11-17');


class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "name",
            cardNumber: "number",
            expMonth: "month",
            expYear: "year",
            passCVC: "cvc",
            errorName: false,
            errorCardNumber: false,
            errorExpMonth: false,
            errorExpYear: false,
            errorCVC: false,
            submitBtn: true,
            statusPayment: false,
            statusPaymentError: false,
            checkPayment: false
        }
    }
    componentDidMount() {
    }
    async genTokenCredit() {
        const data = await Omise.createToken({
            'card': {
                'name': this.getName.value,
                'city': 'Bangkok',
                'number': this.getCardNumber.value,
                'expiration_month': this.getExpMonth.value,
                'expiration_year': this.getExpYear.value,
                'security_code': this.getCVC.value
            }
        });
        console.log(data)
        this.setState({ checkPayment: true })
        setTimeout(() => {
            this.getCharges(data.id)
            // this.chargesOmise(data.id)
        }, 100)
        // this.props.onAddOrder()
    }


    async getCharges(tokenId) {
        console.log(tokenId)
        const totalPrice = this.props.totalPrice
        const totalRegis = Number(totalPrice * 100)
        this.setState({
            amount: String(totalRegis)
        })
        const data = await Omise.createSource({
            'amount': totalRegis,
            'currency': 'thb',
            'capture': true,
            'return_url': "",
            'card': tokenId

        });
        console.log(data)
        this.checkPaymentModal(data)
        // this.props.setCharge(data)
    }
    // getCharges(tokenId) {
    //     const uri = "https://api.omise.co/charges";
    //     const totalPrice = this.props.totalPrice
    //     const totalRegis = Number(totalPrice * 100)
    //     this.setState({
    //         amount: String(totalRegis)
    //     })
    //     let data = ({
    //         "amount": totalRegis,
    //         "currency": 'thb',
    //         "capture": true,
    //         "return_url": '',
    //         "card": tokenId
    //     })

    //     axios.post(uri, data, {
    //         headers: {
    //             // 'Access-Control-Allow-Origin': '*',
    //             'Authorization': 'Basic ' + base64.encode(ibit_skey + ":"),
    //             'Content-Type': 'application/json',
    //             // 'Access-Control-Allow-Headers': 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'
    //         },
    //         responseType: 'json',
    //     })
    //         .then((response) => {
    //             this.setState({ dataSource: response.data });
    //             console.log(this.state.dataSource)
    //             console.log(response.data)
    //             this.checkPaymentModal(response.data)
    //         }).catch((error) => {
    //             this.getCharges(tokenId)
    //             console.error(error)
    //         });
    // }
    checkPaymentModal(data) {
        if (data.status == "successful") {
            this.setState({ statusPayment: true })
            this.props.changeID(data.id)
            this.props.transaction(data.transaction)
            this.props.onAddOrder()
            setTimeout(() => {
                this.props.clickNext()
            }, 3000)
        }
        else {
            this.setState({ statusPaymentError: true })
        }

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            name: this.getName.value,
            cardNumber: this.getCardNumber.value,
            expMonth: this.getExpMonth.value,
            expYear: this.getExpYear.value,
            passCVC: this.getCVC.value,
            submitBtn: false
        })

        // this.checkForm()
    }
    setCreditCrad() {
        const dataCredit = {
            name: this.getName.value,
            cardNumber: this.getCardNumber.value,
            expMonth: this.getExpMonth.value,
            expYear: this.getExpYear.value,
            passCVC: this.getCVC.value,
        }
        setTimeout(() => {
            this.props.onsetCreditCard(dataCredit)
        })
    }
    checkForm() {
        console.log(this.state.name)
        if (this.getName.value === "") {
            this.setState({ errorName: true })
        }
        else if ((this.getCardNumber.value === "") && (this.getCardNumber.value.length === 16)) {
            this.setState({ errorCardNumber: true })
        }
        else if (this.getExpMonth.value === "") {
            this.setState({ errorExpMonth: true })
        }
        else if (this.getExpYear.value === "") {
            this.setState({ errorExpYear: true })
        }
        else if (this.getCVC.value === "") {
            this.setState({ errorCVC: true })
        }
        else {
            this.genTokenCredit()
            this.setCreditCrad()
        }
    }



    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={12} sm={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>ชื่อบนบัตร : </Label>
                                    {this.state.errorName == false ?
                                        <Col sm={10}>
                                            <Input
                                                type="text"
                                                name="cardname"
                                                placeholder="Ex.Thunnathorn"
                                                innerRef={(input) => this.getName = input} />
                                        </Col> :
                                        <Col sm={10}>
                                            <Input
                                                type="text"
                                                name="cardname"
                                                placeholder="Ex.Thunnathorn"
                                                innerRef={(input) => this.getName = input}
                                                invalid
                                            />
                                            <FormFeedback>กรุณากรอกชื่อหน้าบัตรเครดิต</FormFeedback>
                                        </Col>
                                    }
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="username" sm={2}>Card Number : </Label>
                                    {this.state.errorCardNumber == false ?
                                        <Col sm={10}>
                                            <Input
                                                name="cardnumber"
                                                type="tel"
                                                maxLength="16"
                                                placeholder="Ex.5555 9999 0000 9999"
                                                innerRef={(input) => this.getCardNumber = input} />
                                        </Col>
                                        :
                                        <Col sm={10}>
                                            <Input
                                                name="cardnumber"
                                                type="tel"
                                                maxLength="16"
                                                placeholder="Ex.5555 9999 0000 9999"
                                                innerRef={(input) => this.getCardNumber = input}
                                                invalid
                                            />
                                            <FormFeedback>กรุณากรอกชื่อหน้าบัตรเครดิต</FormFeedback>
                                        </Col>
                                    }
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="lastname" sm={2}>วันหมดอายุ : </Label>
                                    {this.state.errorExpMonth == false ?
                                        <Col sm={5}>
                                            <Input
                                                name="expmonth"
                                                type="tel"
                                                placeholder="Ex.เดือนที่หมดอายุ"
                                                innerRef={(input) => this.getExpMonth = input} />
                                        </Col>
                                        :
                                        <Col sm={5}>
                                            <Input
                                                name="expmonth"
                                                type="tel"
                                                placeholder="Ex.เดือนที่หมดอายุ"
                                                innerRef={(input) => this.getExpMonth = input}
                                                invalid />
                                            <FormFeedback>กรุณากรอกชื่อหน้าบัตรเครดิต</FormFeedback>
                                        </Col>
                                    }
                                    {this.state.errorExpYear == false ?
                                        <Col sm={5}>
                                            <Input
                                                name="expyear"
                                                type="tel"
                                                placeholder="Ex.ปีที่หมดอายุ"
                                                innerRef={(input) => this.getExpYear = input} />
                                        </Col>
                                        :
                                        <Col sm={5}>
                                            <Input
                                                name="expyear"
                                                type="tel"
                                                placeholder="Ex.ปีที่หมดอายุ"
                                                innerRef={(input) => this.getExpYear = input}
                                                invalid
                                            />
                                            <FormFeedback>กรุณากรอกชื่อหน้าบัตรเครดิต</FormFeedback>
                                        </Col>
                                    }
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="tel" sm={2}>รหัสความปลอดภัย : </Label>
                                    {this.state.errorCVC == false ?
                                        <Col sm={10}>
                                            <Input
                                                name="cvv"
                                                type="tel"
                                                maxLength="4"
                                                placeholder="Ex.XXX"
                                                innerRef={(input) => this.getCVC = input} />
                                        </Col>
                                        :
                                        <Col sm={10}>
                                            <Input
                                                name="cvv"
                                                type="tel"
                                                maxLength="4"
                                                placeholder="Ex.XXX"
                                                innerRef={(input) => this.getCVC = input}
                                                invalid
                                            />
                                            <FormFeedback>กรุณากรอกชื่อหน้าบัตรเครดิต</FormFeedback>
                                        </Col>
                                    }
                                </FormGroup>
                                <div id="btn-submit">
                                    <Button inverted color='red' onClick={() => this.props.clickPrev()} className="btn-prev">
                                        <p>ย้อนกลับ</p>
                                    </Button>
                                    <Button inverted color='green' onClick={() => this.checkForm()} className="btn-next" type="submit">
                                        <p>ชำระค่าบริการ</p>
                                    </Button>

                                </div>

                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={12}>
                            <Modal isOpen={this.state.statusPayment} toggle={() => this.setState({ statusPayment: false })} size="lg">
                                <ModalBody >
                                    <div className="crad-status-payment">
                                        <Header as='h2' icon>
                                            <Icon name='check circle' color="green" />
                                            <p id="status-payment">ชำระสำเร็จ</p>
                                            <Header.Subheader id="status-payment">
                                                <p>ชำระเงินค่าสั่งซื้อสำเร็จ</p>
                                            </Header.Subheader>
                                        </Header>
                                    </div>
                                </ModalBody>
                            </Modal>
                            <Modal isOpen={this.state.statusPaymentError} toggle={() => this.setState({ statusPaymentError: false })} size="lg">
                                <ModalBody >
                                    <div className="crad-status-payment">
                                        <Header as='h2' icon>
                                            <Icon name='close' color="red" />
                                            <p id="status-payment-error">ชำระไม่สำเร็จ</p>
                                            <Header.Subheader id="status-payment-error">
                                                <p>ชำระเงินค่าสั่งซื้อไม่สำเร็จ กรุณาตรวจสอบอีกครั้ง</p>
                                            </Header.Subheader>
                                        </Header>
                                    </div>
                                </ModalBody>
                            </Modal>
                            <Modal isOpen={this.state.checkPayment} toggle={() => this.setState({ statusPaymentError: false })} size="lg">
                                <ModalBody >
                                    <div className="crad-status-payment">
                                        <Loader
                                            type="ThreeDots"
                                            color="#00BFFF"
                                            height="100"
                                            width="100"
                                        />
                                    </div>
                                </ModalBody>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default FormRegister;