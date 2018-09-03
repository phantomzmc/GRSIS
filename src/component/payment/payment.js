import React, { Component } from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Container } from "reactstrap";
import { Icon  } from "semantic-ui-react";
import classnames from 'classnames';

import CreditPayment from './credit/credit'
import TranferPayment from './tranfer/tranfer'

class PaymentLaout extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div>
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
                            </Nav>
                        </Col>
                    </Row>
                </Container>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <CreditPayment />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <TranferPayment />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default PaymentLaout;