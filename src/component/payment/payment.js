import React, { Component } from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Container, Button } from "reactstrap";
import { Icon } from "semantic-ui-react";
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
    componentWillMount(){
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
            this.props.setCreditCharge(parseFloat(creditCharge).toFixed(2))

        }
        else if (tab === '2') {
            const price = this.state.totalPrice
            const creditPrice = price
            console.log(parseFloat(creditPrice))
            this.props.setTotalPrice(parseFloat(creditPrice).toFixed(2))
            this.props.setCreditCharge(parseFloat(0))
        }

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
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggle('1'); }}>
                                                <Icon name='credit card outline' size='large' inverted color='black' /> บัตรเครดิตเเละเดบิต
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggle('2'); }} >
                                                <Icon name='money bill alternate' size='large' inverted color='black' /> ชำระด้วยเงินสด
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                // className={classnames({ active: this.state.activeTab === this.state.activeTab })}
                                                onClick={() => { this.setState({ layoutCart: true }) }} >
                                                <Icon name='list ul' size='large' inverted color='black' /> รายละเอียดการชำระเงิน
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </Col>
                                <Col xs={12} sm={12} md={12}>
                                    <Modal open={this.state.layoutCart} onClose={() => this.setState({ layoutCart: false })} center>
                                        <DetailPayment />
                                    </Modal>
                                </Col>
                            </Row>
                        </Container>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12" md="12" xs="12">
                                        <CreditPayment
                                            onNextPages={this.props.onNextPage}
                                            addOrder={this.props.onAddOreder}
                                        />
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12" md="12" xs="12">
                                        <TranferPayment
                                            addOrder={this.props.onAddOreder}
                                        />
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                    {/* <Col xs="12" sm="12" md="12">
                        <h4>รายละเอียดการชำระเงิน</h4>
                        <Cart />
                    </Col> */}
                </Row>

            </div>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentLaout);