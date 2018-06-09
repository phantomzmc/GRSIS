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
                            <Form className="form-register">
                                <FormGroup row>
                                    <Label for="exampleEmail" sm={2}>ชื่อบนบัตร :</Label>
                                    <Col sm={10}>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Ex.Thunnathorn" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="username" sm={2}>Card Number : </Label>
                                    <Col sm={10}>
                                        <Input type="text" name="username" id="username" placeholder="Ex.5555 9999 0000 9999" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="lastname" sm={2}>วันหมดอายุ : </Label>
                                    <Col sm={10}>
                                        <Input type="date" name="lastname" id="lastname" placeholder="Ex.May 2018" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="tel" sm={2}>รหัสความปลอดภัย :</Label>
                                    <Col sm={10}>
                                        <Input type="text" name="tel" id="tel" placeholder="Ex.XXX" />
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