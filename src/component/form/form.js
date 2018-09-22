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
    }
    componentWillMount() {
        this.checkFormAddress()
    }

    checkFormAddress() {
        for (const index in dataCart) {
            // console.log(`dataCart.${index} = ${dataCart[index].FormatBuyImageID}`);
            if(dataCart[index].FormatBuyImageID == 2 || dataCart[index].FormatBuyImageID == 3){
                this.setState({ formAddress : true})
            }
        }
        
    }
    
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={12} sm={12}>
                            <h2>กรุณากรอกรายละเอียด</h2>
                            <Form className="form-register">
                                <FormGroup row>
                                    <Label for="username" sm={2} md={2} xs={12}>ชื่อ (จำเป็น)</Label>
                                    <Col sm={4} md={4} xs={10}>
                                        <Input type="text" name="username" id="username" placeholder="Ex.ชื่อ............" />
                                    </Col>
                                    <Label for="lastname" sm={2} md={2} xs={12}>นามสกุล (จำเป็น)</Label>
                                    <Col sm={4} md={4} xs={10}>
                                        <Input type="text" name="lastname" id="lastname" placeholder="Ex.นามสกุล..........." />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email (จำเป็น)</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Ex.Abc@gmail.com" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="tel" sm={2}>โทรศัพท์ (จำเป็น)</Label>
                                    <Col sm={10}>
                                        <Input type="text" name="tel" id="tel" placeholder="Ex.090-3198XXX" />
                                    </Col>
                                </FormGroup>
                                {this.state.formAddress &&
                                    <div>
                                        <FormGroup row>
                                            <Label for="username" sm={2}>บ้านเลขที่/อาคาร :  </Label>
                                            <Col sm={10}>
                                                <Input type="text" name="username" id="username" placeholder="Ex.ชื่อ............" />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="lastname" sm={2}>ซอย/ถนน : </Label>
                                            <Col sm={10}>
                                                <Input type="text" name="lastname" id="lastname" placeholder="Ex.นามสกุล..........." />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="tel" sm={2}>ตำบล : </Label>
                                            <Col sm={10}>
                                                <SugestTambon />
                                                {/* <Input type="text" name="tel" id="tel" placeholder="Ex.090-3198XXX" /> */}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="username" sm={2}>อำเภอ :  </Label>
                                            <Col sm={10}>
                                                <SugestAmphoe />
                                                {/* <Input type="text" name="username" id="username" placeholder="Ex.ชื่อ............" /> */}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="lastname" sm={2}>จังหวัด : </Label>
                                            <Col sm={10}>
                                                <SugestProvince />
                                                {/* <Input type="text" name="lastname" id="lastname" placeholder="Ex.นามสกุล..........." /> */}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="tel" sm={2}>รหัสไปรษณีย์ : </Label>
                                            <Col sm={10}>
                                                <Input type="text" name="tel" id="tel" placeholder="Ex.090-3198XXX" />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label for="username" sm={2}>ประเทศ :  </Label>
                                            <Col sm={10}>
                                                <Input type="text" name="username" id="username" placeholder="Ex.ชื่อ............" />
                                            </Col>
                                        </FormGroup>
                                    </div>
                                }
                                <div>
                                    <FormGroup row>
                                        <Label for="address" sm={2}>ที่อยู่การจัดส่ง : </Label>
                                        <Col sm={10} xs={12}>
                                            <Input type="textarea" name="text" id="exampleText" rows="4" />
                                        </Col>
                                    </FormGroup>
                                </div>

                                <FormGroup row>
                                    <Label for="tel" sm={2}>หมายเหตุ : </Label>
                                    <Col sm={10}>
                                        <Input type="text" name="tel" id="tel" placeholder="อยากได้อะไรบอกพี่ตุ้มได้นะจ๊ะ" />
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