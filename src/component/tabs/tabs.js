import React, { Component } from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Container } from "reactstrap";
import { Icon  } from "semantic-ui-react";
import classnames from 'classnames';


class TabsControl extends Component {
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
                <Container>
                    <Row>
                        <Col xs="12" sm="12" md="12" className="nav-style">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}>
                                        <Icon name='align justify' size='small' inverted color='black' /> ทั้งหมด
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }} >
                                        <Icon name='angle right' size='small' inverted color='black' />ช่างหน่อง
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
                                {/* <h4>Tab 1 Contents</h4> */}
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                {/* <h4>Tab 2 Contents</h4> */}
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default TabsControl;