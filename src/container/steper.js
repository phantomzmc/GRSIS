import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button, ButtonGroup } from 'reactstrap';
import Stepper from 'react-stepper-horizontal';

import '../css/steper.css'

import Navbar from '../component/nav/nav'
import VdoHeader from '../component/header/header'
import CartImages from './cart'
import FormRegister from '../component/form/form'
import PaymentLayout from '../component/payment/payment'
import Invoice from '../container/invoice-bill'
import Footer from '../component/footer/footer'

class StepControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleSearch: "ค้นหารายการวิ่ง",
            step: [
                { title: 'Step 1 : รายการสั่งซื้อทั้งหมด' },
                { title: 'Step 2 : กรอกรายละเอียด' },
                { title: 'Step 3 : ชำระเงิน' },
                { title: 'Step 4 : ชำระเงินเสร็จสิ้น' }
            ],
            currentStep: 0,
            isOpenCart: true,
            isOpenForm: false,
            isOpenPayment: false,
            isOpenInvoice: false
        }
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this)
    }
    onClickNext() {
        const { steps, currentStep } = this.state;
        this.setState({
            currentStep: currentStep + 1,
            isOpenCart: false
        });
        this.controlPage()
    }
    onClickPrev() {
        const { steps, currentStep } = this.state;
        this.setState({
            currentStep: currentStep - 1,
            isOpenCart: false
        });
        this.controlPage()
    }
    controlPage() {
        let { currentStep } = this.state
        if (currentStep == 0) {
            this.setState({ isOpenForm: true })
        }
        else if (currentStep == 1) {
            this.setState({
                isOpenForm: false,
                isOpenPayment: true
            })
        }
        else if (currentStep == 2) {
            this.setState({
                isOpenPayment: false,
                isOpenInvoice: true
            })
        }
    }
    render() {
        return (
            <div className="App">
                <div className="nav-bar">
                    <Navbar />
                </div>
                {/* <header className="App-header"></header> */}
                <VdoHeader />
                <Container>
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <div className="event-container">
                                <h2>Images <b>Cart</b></h2>
                                <hr className="hr-style1" />
                                <hr className="hr-style2" />
                                <div>
                                    <Stepper steps={this.state.step} activeStep={this.state.currentStep} />
                                </div>
                                <div className="cart-images">
                                    {this.state.isOpenCart && <CartImages />}
                                    {this.state.isOpenForm && <FormRegister />}
                                    {this.state.isOpenPayment && <PaymentLayout />}
                                    {this.state.isOpenInvoice && <Invoice />}
                                </div>
                                <div className="btn-groud">
                                    <ButtonGroup>
                                        {!this.state.isOpenCart &&
                                            <Button color="danger" size="lg" onClick={this.onClickPrev} className="btn-prev"> ย้อนหลัง </Button>
                                        }
                                        {this.state.isOpenCart &&
                                            <Button color="danger" size="lg"> ยกเลิกรายการทั้งหมด </Button>
                                        }
                                        <Button color="success" size="lg" onClick={this.onClickNext} className="btn-next"> ไปชำระค่าบริการ </Button>

                                    </ButtonGroup>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <footer className="footer">
                    <Footer />
                </footer>
            </div>
        );
    }
}

export default StepControl;
