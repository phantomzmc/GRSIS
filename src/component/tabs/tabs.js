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
        const namephotogra = this.props.namePhotoGra
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
                                {namephotogra.map((item) =>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === item.ID })}
                                            onClick={() => { this.toggle(item.ID); }} >
                                            <Icon name='angle right' size='small' inverted color='black' />{item.Name}
                                        </NavLink>
                                    </NavItem>
                                )}
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