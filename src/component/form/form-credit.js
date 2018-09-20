import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Omise from '../../config/omisePayment'
// import './Form.css'

const test_pkey = 'pkey_test_5ctl7h1r2lazhxd1ovk'
const test_skey = 'skey_test_5ctl7j62s80mqyznvd3'
Omise.config(test_pkey, test_skey, '2015-11-17');


class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            cardNumber: "",
            expMonth: "",
            expYear : "",
            passCVC: ""
        }
    }
    componentDidMount() {
    }
    async genTokenCredit() {
        let { name , cardNumber ,expMonth ,expYear ,passCVC} = this.state
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
            name : this.getName.value,
            cardNumber : this.getCardNumber.value,
            expMonth : this.getExpMonth.value,
            expYear : this.getExpYear.value,
            passCVC : this.getCVC.value
        })
        setTimeout(()=>{
            this.genTokenCredit()
        })
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
                                    <Col sm={10}>
                                        <Input
                                            placeholder="Ex.Thunnathorn"
                                            innerRef={(input) => this.getName = input} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="username" sm={2}>Card Number : </Label>
                                    <Col sm={10}>
                                        <Input
                                            placeholder="Ex.5555 9999 0000 9999"
                                            innerRef={(input) => this.getCardNumber = input} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="lastname" sm={2}>วันหมดอายุ : </Label>
                                    <Col sm={5}>
                                        <Input
                                            placeholder="Ex.May 2018"
                                            innerRef={(input) => this.getExpMonth = input} />
                                    </Col>
                                    <Col sm={5}>
                                        <Input
                                            placeholder="Ex.May 2018"
                                            innerRef={(input) => this.getExpYear = input} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="tel" sm={2}>รหัสความปลอดภัย : </Label>
                                    <Col sm={10}>
                                        <Input
                                            placeholder="Ex.XXX"
                                            innerRef={(input) => this.getCVC = input} />
                                    </Col>
                                </FormGroup>
                                <Button block type="submit">ok</Button>
                            </Form>
                        </Col>
                        
                    </Row>
                </Container>
            </div >
        );
    }
}

export default FormRegister;