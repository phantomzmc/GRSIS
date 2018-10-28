import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, ButtonGroup } from 'reactstrap';
import { Button } from 'semantic-ui-react'
import Stepper from 'react-stepper-horizontal';
import '../css/steper.css'
import Navbar from '../component/nav/nav'
import VdoHeader from '../component/header/header'
import { connect } from 'react-redux'
import CartImages from './cart'
import FormRegister from '../component/form/form'
import PaymentLayout from '../component/payment/payment'
import Invoice from '../container/invoice-bill'
import Footer from '../component/footer/footer'
import req from '../config/uri_req'
import apikey from '../config/apikey'
import axios from 'axios'
import dataCart from '../data/dataCart'
import dataPrice from '../data/dataPrice'
import dataQuantity from '../data/dataQuantity'


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
            isOpenInvoice: false,
            showButton: true,
            statusForm: false,
            listOrder: true
        }
        this.cancelOrder = this.cancelOrder.bind(this)
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this)
    }
    componentDidMount() {
        console.log(dataQuantity)
        let data = {
            email: "grs@guurun.com",
            password: "1f5ZIAEbhLg2GF6"
        }
        axios.post("http://api.shutterrunning2014.com/api/v2/user/session", data, {
            headers: {
                "api_key": "36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88",
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, token: response.data.session_token });
                console.log(this.state.token)
                this.props.setToken(this.state.token)
            }).catch((error) => {
                console.error(error)
            });
    }
    addOrder() {
        let uri = req[0].uspAddOrder
        let api_key = apikey[0].apikey
        let stored = this.props
        let data = ({
            params: [
                { name: "PaymentType", value: stored.payment.statusPayment },
                { name: "PaymentStatus", value: stored.payment.type },
                { name: "PaymentSlip", value: "" },
                { name: "Email", value: stored.address.email },
                { name: "FirstName", value: stored.address.address.firstname },
                { name: "LastName", value: stored.address.address.lastname },
                { name: "Address", value: stored.address.address.address },
                { name: "Soi", value: stored.address.address.street },
                { name: "SubDistric", value: stored.address.address.tumpon },
                { name: "Distric", value: stored.address.address.amphoe },
                { name: "Province", value: stored.address.address.province },
                { name: "PostCode", value: stored.address.passcode },
                { name: "Country", value: stored.address.address.country },
                { name: "Phone", value: stored.address.address.tel },
                { name: "Notes", value: stored.address.address.help },
                { name: "TransactionID", value: stored.payment.transaction },
                { name: "ChargesID", value: stored.payment.changeid },
                { name: "UsernameGRS", value: "" },
                { name: "OrderLists", value: JSON.stringify(stored.order.orderlist) },
            ]
        })
        axios.post(uri, data, {
            mode: 'no-cors',
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": this.props.token.token
            },
            responseType: 'json'
        })
            .then((response) => {
                setTimeout(() => {
                    this.setState({
                        dataSource: response.data[0],
                        isOpenCart: false,
                        isOpenForm: false,
                        isOpenPayment: false,
                        isOpenInvoice: true
                    })
                })
                console.log(response.data)
                this.props.invoiceOrder(response.data[0])
            }).catch((error) => {
                console.error(error)
            });
    }
    e_showButton(dataAddress) {
        console.log(dataAddress)
        // this.setState({ showButton: true })
    }
    onClickNext() {
        const { step, currentStep } = this.state;
        this.setState({
            currentStep: currentStep + 1,
            isOpenCart: false,
            showButton: false
        });
        setTimeout(() => {
            this.controlPage()
        }, 100)
    }

    onClickPrev() {
        const { step, currentStep } = this.state;
        this.setState({
            currentStep: currentStep - 1,
            isOpenCart: false,
            showButton: false
        });
        setTimeout(() => {
            this.controlPage()
        }, 100)
    }
    cancelOrder = () => {
        dataCart.splice(0, dataCart.length)
        dataPrice.splice(0, dataPrice.length)
        this._disCancel()
        this.setState({ listOrder: !this.state.listOrder })
    }
    _disCancel() {
        this.props.addImage(dataCart)
        this.props.addOrderList(dataCart)
        this.props.addOrderlistFull(dataCart)
        this.props.setTotalPrice(0)
        this.props.setQuantity(0)
    }
    controlPage() {
        let { currentStep } = this.state
        console.log(currentStep)
        if (currentStep === 0) {
            this.setState({
                isOpenCart: true,
                isOpenForm: false,
                isOpenPayment: false,
                isOpenInvoice: false,
                showButton: true
            })
        }
        else if (currentStep === 1) {
            this.setState({
                isOpenCart: false,
                isOpenForm: true,
                isOpenPayment: false,
                isOpenInvoice: false
            })
        }
        else if (currentStep === 2) {
            this.setState({
                isOpenCart: false,
                isOpenForm: false,
                isOpenPayment: true,
                isOpenInvoice: false
            })
        }
        else if (currentStep === 3) {
            // this.setState({
            //     isOpenCart: false,
            //     isOpenForm: false,
            //     isOpenPayment: false,
            //     isOpenInvoice: true
            // })
            this.props.setCurrentPage(false)
        }
    }
    passQuantity(value) {
        console.log(value)
        this.setState({ quantity: value })
    }
    render() {
        return (
            <div className="App">
                <div className="nav-bar">
                    <Navbar
                        quantity={this.props.order.quantity}
                    />
                </div>
                {/* <header className="App-header"></header> */}
                <VdoHeader />
                <Container>
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <div className="event-container">
                                <h2>Order <b>Summary</b></h2>
                                <hr className="hr-style1" />
                                <hr className="hr-style2" />
                                <div>
                                    <Stepper steps={this.state.step} activeStep={this.state.currentStep} />
                                </div>
                                <div className="cart-images">
                                    {this.state.isOpenCart &&
                                        <CartImages
                                            statusBtn={true}
                                            statusButton={false}
                                            refersh={this.state.listOrder}
                                            onSentQuantity={this.passQuantity.bind(this)}
                                        />
                                    }
                                    {this.state.isOpenForm &&
                                        <FormRegister
                                            onNextPage={this.e_showButton.bind(this)}
                                            clickNext={this.onClickNext.bind(this)}
                                            clickPrev={this.onClickPrev.bind(this)}
                                        />
                                    }
                                    {this.state.isOpenPayment &&
                                        <PaymentLayout
                                            onNextPage={this.e_showButton.bind(this)}
                                            onAddOreder={this.addOrder.bind(this)}
                                            clickNext={this.onClickNext.bind(this)}
                                            clickPrev={this.onClickPrev.bind(this)}

                                        />
                                    }
                                    {this.state.isOpenInvoice &&
                                        <Invoice />
                                    }
                                </div>
                                {dataCart.length != 0 ?
                                    <div className="btn-groud">
                                        {this.state.isOpenCart &&
                                            <Button inverted color='red' onClick={this.cancelOrder} className="btn-prev">
                                                <p>ยกเลิกรายการทั้งหมด</p>
                                            </Button>
                                        }
                                        {this.state.isOpenCart &&
                                            <Button inverted color='green' onClick={this.onClickNext} className="btn-next">
                                                <p>ไปชำระค่าบริการ</p>
                                            </Button>
                                        }
                                    </div>
                                    :
                                    <div></div>
                                }
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

const mapStateToProps = state => {
    return {
        event: state.event,
        address: state.address,
        order: state.order,
        token: state.token,
        payment: state.payment
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setToken: (token) => {
            dispatch({
                type: "setToken",
                payload: token
            })
        },
        invoiceOrder: (invoice) => {
            dispatch({
                type: "invoiceOrder",
                payload: invoice
            })
        },
        setCurrentPage: (currentStep) => {
            dispatch({
                type: "setCurrentPage",
                payload: currentStep
            })
        },
        addImage: (image) => {
            dispatch({
                type: "addImage",
                payload: image
            })
        },
        addOrderList: (image) => {
            dispatch({
                type: "addOrderList",
                payload: image
            })
        },
        addOrderlistFull: (image) => {
            dispatch({
                type: "addOrderlistFull",
                payload: image
            })
        },
        setTotalPrice: (totalprice) => {
            dispatch({
                type: "setTotalPrice",
                payload: totalprice
            })
        },
        setQuantity: (quantity) => {
            dispatch({
                type: "setQuantity",
                payload: quantity
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepControl);
