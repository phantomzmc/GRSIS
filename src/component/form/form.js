import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './form.css'

class FormRegister extends Component {

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={12} sm={12}>
                            <h2>กรุณากรอกรายละเอียด</h2>
                            <Form className="form-register">
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>Email : </Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Ex.Abc@gmail.com" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="username" sm={2}>ชื่อ : </Label>
                                    <Col sm={10}>
                                        <Input type="text" name="username" id="username" placeholder="Ex.ชื่อ............" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="lastname" sm={2}>นามสกุล : </Label>
                                    <Col sm={10}>
                                        <Input type="text" name="lastname" id="lastname" placeholder="Ex.นามสกุล..........." />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="tel" sm={2}>โทรศัพท์ : </Label>
                                    <Col sm={10}>
                                        <Input type="text" name="tel" id="tel" placeholder="Ex.090-3198XXX" />
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