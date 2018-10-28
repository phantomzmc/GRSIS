import React, { Component } from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Container } from "reactstrap";
import { Icon, Button, Segment } from "semantic-ui-react";
import classnames from 'classnames';
import { connect } from 'react-redux'
import CreditPayment from './credit/credit'
import TranferPayment from './tranfer/tranfer'
import Cart from '../../container/cart'
import Modal from "react-responsive-modal";
import DetailPayment from '../payment/detailPayment/detailPayment'


class PaymentLaout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            layoutCart: false,
            totalPrice: this.props.order.totalPrice
        };
        this.toggle = this.toggle.bind(this);
        this.creditSumPrice = this.creditSumPrice.bind(this)
    }
    componentWillMount() {
        this.creditSumPrice(this.state.activeTab)
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
        this.creditSumPrice(tab)
        this.props.setTypePayment(tab)
    }
    creditSumPrice(tab) {
        if (tab === '1') {
            const price = this.state.totalPrice
            const creditPrice = (price * 105) / 100
            const creditCharge = (creditPrice - price)
            console.log(parseFloat(creditPrice))
            console.log(creditCharge)
            this.props.setTotalPrice(parseFloat(creditPrice).toFixed(2))
            this.props.setStatusPayment(2)
            this.props.setCreditCharge(parseFloat(creditCharge).toFixed(2))

        }
        else if (tab === '2') {
            const price = this.state.totalPrice
            const creditPrice = price
            console.log(parseFloat(creditPrice))
            this.props.setTotalPrice(parseFloat(creditPrice).toFixed(2))
            this.props.setStatusPayment(1)
            this.props.setCreditCharge(parseFloat(0))
        }
    }
    getSlip(silp) {
        this.props.setSlip(silp)
    }
    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" sm="12" md="12">
                        <h2>ชำระเงิน</h2>
                        <Container>
                            <Row>
                                <Col xs="12" sm="12" md="12" className="nav-style">
                                    <Button.Group attached='top' color="#f1f1f1">
                                        <Button onClick={() => this.toggle('1')} active>
                                            <Icon name='credit card outline' size='large' inverted color='black' />
                                            <p id="captionType">บัตรเครดิตเเละเดบิต</p>
                                        </Button>
                                        <Button onClick={() => this.toggle('2')}>
                                            <Icon name='money bill alternate' size='large' inverted color='black' />
                                            <p id="captionType">ชำระด้วยเงินสด</p>
                                        </Button>

                                    </Button.Group>
                                    <Segment attached>
                                        {this.state.activeTab == "1" ?
                                            <Row>
                                                <Col sm="12" md="12" xs="12">
                                                    {parseInt(this.props.order.totalPrice) < 100 ?
                                                        <div></div>
                                                        :
                                                        <CreditPayment
                                                            onNextPages={this.props.onNextPage}
                                                            addOrder={this.props.onAddOreder}
                                                            clickPrev={this.props.clickPrev.bind(this)}
                                                            clickNext={this.props.clickNext.bind(this)}
                                                        />
                                                        }
                                                </Col>
                                            </Row>
                                            :
                                            <Row>
                                                <Col sm="12" md="12" xs="12">
                                                    <TranferPayment
                                                        onNextPages={this.props.onNextPage}
                                                        addOrder={this.props.onAddOreder}
                                                        clickPrev={this.props.clickPrev.bind(this)}
                                                        clickNext={this.props.clickNext.bind(this)}
                                                        setSlip={this.getSlip.bind(this)}
                                                    />
                                                </Col>
                                            </Row>
                                        }
                                    </Segment>
                                </Col>
                            </Row>
                        </Container>
                    </Col>

                </Row>

            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        order: state.order
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTypePayment: (type) => {
            dispatch({
                type: "setTypePayment",
                payload: type
            })
        },
        setTotalPrice: (total) => {
            dispatch({
                type: "setTotalPrice",
                payload: total
            })
        },
        setCreditCharge: (credit) => {
            dispatch({
                type: "setCreditCharge",
                payload: credit
            })
        },
        setStatusPayment: (status) => {
            dispatch({
                type: "setStatusPayment",
                payload: status
            })
        },
        setSlip: (slip) => {
            dispatch({
                type: "setSlip",
                payload: slip
            })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentLaout);