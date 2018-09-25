import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import Omise from '../../config/omisePayment'
import Cards from 'react-credit-cards';
// import './Form.css'

const test_pkey = 'pkey_test_5ctl7h1r2lazhxd1ovk'
const test_skey = 'skey_test_5ctl7j62s80mqyznvd3'
Omise.config(test_pkey, test_skey, '2015-11-17');


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
        }
    }
    componentDidMount() {
    }
    async genTokenCredit() {
        let { name, cardNumber, expMonth, expYear, passCVC } = this.state
        const data = await Omise.createToken({
            'card': {
                'name': name,
                'city': 'Bangkok',
                'number': cardNumber,
                'expiration_month': expMonth,
                'expiration_year': expYear,
                'security_code': passCVC
            }
        });
        console.log("name" + this.getName.value)
        console.log(data)
        // this.openModal()
        this.getCharges(data.id)
    }
    async getCharges(tokenId) {
        console.log(tokenId)
        const totalRegis = Number(1230 * 100)
        this.setState({
            amount: String(totalRegis)
        })
        const data = await Omise.createSource({
            'type': 'internet_banking_bbl',
            'amount': 123000,
            'currency': 'thb',
            'capture': true,
            'card': tokenId

        });
        console.log(data)
        // this.checkPaymentModal(data)
        // this.props.setCharge(data)
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
        setTimeout(() => {
            this.genTokenCredit()
        })
        this.checkForm()
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
    checkForm(){
        if (this.getName.value == null || "") {
            this.setState({ errorName: true })
        }
        else if ((this.getCardNumber.value == null || "") && (this.getCardNumber.value.length == 16)) {
            this.setState({ errorCardNumber: true })
        }
        else if (this.getExpMonth.value == null || "") {
            this.setState({ errorExpMonth: true })
        }
        else if (this.getExpYear.value == null || "") {
            this.setState({ errorExpYear: true })
        }
        else if (this.getCVC.value == null || "") {
            this.setState({ errorCVC: true })
        }
        else {
            this.props.onNextPage()
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
                                                name="name"
                                                placeholder="Ex.Thunnathorn"
                                                innerRef={(input) => this.getName = input} />
                                        </Col> :
                                        <Col sm={10}>
                                            <Input
                                                type="text"
                                                name="name"
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
                                                placeholder="Ex.5555 9999 0000 9999"
                                                innerRef={(input) => this.getCardNumber = input} />
                                        </Col>
                                        :
                                        <Col sm={10}>
                                            <Input
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
                                                placeholder="Ex.เดือนที่หมดอายุ"
                                                innerRef={(input) => this.getExpMonth = input} />
                                        </Col>
                                        :
                                        <Col sm={5}>
                                            <Input
                                                placeholder="Ex.เดือนที่หมดอายุ"
                                                innerRef={(input) => this.getExpMonth = input}
                                                invalid />
                                            <FormFeedback>กรุณากรอกชื่อหน้าบัตรเครดิต</FormFeedback>
                                        </Col>
                                    }
                                    {this.state.errorExpYear == false ?
                                        <Col sm={5}>
                                            <Input
                                                placeholder="Ex.ปีที่หมดอายุ"
                                                innerRef={(input) => this.getExpYear = input} />
                                        </Col>
                                        :
                                        <Col sm={5}>
                                            <Input
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
                                                placeholder="Ex.XXX"
                                                innerRef={(input) => this.getCVC = input} />
                                        </Col>
                                        :
                                        <Col sm={10}>
                                            <Input
                                                placeholder="Ex.XXX"
                                                innerRef={(input) => this.getCVC = input}
                                                invalid
                                            />
                                            <FormFeedback>กรุณากรอกชื่อหน้าบัตรเครดิต</FormFeedback>
                                        </Col>
                                    }
                                </FormGroup>
                                <div id="btn-submit">
                                    {this.state.submitBtn == true ?
                                        <Button block color="primary" type="submit">ตรวจสอบบัตรเครดิต / เดรบิต</Button> :
                                        <Button block color="success" type="submit">ชำระเงิน : บาท</Button>
                                    }

                                </div>

                            </Form>
                        </Col>

                    </Row>
                </Container>
            </div >
        );
    }
}

export default FormRegister;