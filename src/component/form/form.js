import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './form.css'
import dataCart from '../../data/dataCart'

import SugestTambon from './sugestion/sug_tambon'
import SugestAmphoe from './sugestion/sug_amphoe'
import SugestProvince from './sugestion/sug_province'

class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formAddress: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillMount() {
        this.checkFormAddress()
    }

    checkFormAddress() {
        for (const index in dataCart) {
            // console.log(`dataCart.${index} = ${dataCart[index].FormatBuyImageID}`);
            if (dataCart[index].FormatBuyImageID == 2 || dataCart[index].FormatBuyImageID == 3) {
                this.setState({ formAddress: true })
            }
        }

    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            name : this.getName.value,
            lastname : this.getLastname.value,
            email : this.getEmail.value,
            tel : this.getTel.value,
            address : this.getAddress.value,
            street : this.getStreet.value,
            passcode : this.getPasscode.value,
            country : this.getCountry.value,
            help : this.getWarn.value
        })
    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12}>
                            <h2>กรุณากรอกรายละเอียด</h2>
                            <Form className="form-register" onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label for="username" sm={2} md={2} xs={12}>ชื่อ (จำเป็น)</Label>
                                    <Col sm={4} md={4} xs={12}>
                                        <Input
                                            type="text"
                                            placeholder="Ex.ชื่อ............"
                                            innerRef={(input) => this.getName = input} />
                                    </Col>
                                    <Label for="lastname" sm={2} md={2} xs={12}>นามสกุล (จำเป็น)</Label>
                                    <Col sm={4} md={4} xs={12}>
                                        <Input
                                            type="text"
                                            placeholder="Ex.นามสกุล..........."
                                            innerRef={(input) => this.getLastname = input} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email (จำเป็น)</Label>
                                    <Col sm={10}>
                                        <Input
                                            type="email"
                                            placeholder="Ex.Abc@gmail.com"
                                            innerRef={(input) => this.getEmail = input}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="tel" sm={2}>โทรศัพท์ (จำเป็น)</Label>
                                    <Col sm={10}>
                                        <Input
                                            type="text"
                                            placeholder="Ex.090-3198XXX"
                                            innerRef={(input) => this.getTel = input}
                                        />
                                    </Col>
                                </FormGroup>
                                {this.state.formAddress &&
                                    <div>
                                        <FormGroup row>
                                            <Label for="username" sm={2}>บ้านเลขที่/อาคาร :  </Label>
                                            <Col sm={4}>
                                                <Input
                                                    type="text"
                                                    placeholder="Ex.100/xx"
                                                    innerRef={(input) => this.getAddress = input} />
                                            </Col>
                                            <Label for="lastname" sm={2}>ซอย/ถนน : </Label>
                                            <Col sm={4}>
                                                <Input
                                                    type="text"
                                                    placeholder="Ex.ถนน ......"
                                                    innerRef={(input) => this.getStreet = input}
                                                />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="tel" sm={2}>ตำบล : </Label>
                                            <Col sm={4}>
                                                <SugestTambon />
                                                {/* <Input type="text" name="tel" id="tel" placeholder="Ex.090-3198XXX" /> */}
                                            </Col>
                                            <Label for="username" sm={2}>อำเภอ :  </Label>
                                            <Col sm={4}>
                                                <SugestAmphoe />
                                                {/* <Input type="text" name="username" id="username" placeholder="Ex.ชื่อ............" /> */}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="lastname" sm={2}>จังหวัด : </Label>
                                            <Col sm={4}>
                                                <SugestProvince />
                                                {/* <Input type="text" name="lastname" id="lastname" placeholder="Ex.นามสกุล..........." /> */}
                                            </Col>
                                            <Label for="tel" sm={2}>รหัสไปรษณีย์ : </Label>
                                            <Col sm={4}>
                                                <Input
                                                    type="text"
                                                    placeholder="Ex.10160"
                                                    innerRef={(input) => this.getPasscode = input}
                                                />                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="username" sm={2}>ประเทศ :  </Label>
                                            <Col sm={10}>
                                                <Input
                                                    type="text"
                                                    placeholder="Ex.ประเทศ ไทย"
                                                    innerRef={(input) => this.getCountry = input}
                                                />                                            </Col>
                                        </FormGroup>

                                    </div>
                                }
                                {/* <div>
                                    <FormGroup row>
                                        <Label for="address" sm={2}>ที่อยู่การจัดส่ง : </Label>
                                        <Col sm={10} xs={12}>
                                            <Input type="textarea" name="text" id="exampleText" rows="4" />
                                        </Col>
                                    </FormGroup>
                                </div> */}
                                <FormGroup row>
                                    <Label for="tel" sm={2}>หมายเหตุ : </Label>
                                    <Col sm={10}>
                                        <Input
                                            type="text"
                                            placeholder="อยากได้อะไรบอกพี่ตุ้มได้นะจ๊ะ"
                                            innerRef={(input) => this.getWarn = input}
                                        />
                                        {/* <Input type="text" name="tel" id="tel" placeholder="อยากได้อะไรบอกพี่ตุ้มได้นะจ๊ะ" /> */}
                                    </Col>
                                </FormGroup>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default FormRegister;