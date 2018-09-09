import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux'
import axios from 'axios'
import req from '../../../config/uri_req'
import apikey from '../../../config/apikey'
import ListTable1 from '../listTable/listTable'
import ListTable2 from '../listTable/listTable2'
import ListTable3 from '../listTable/listTable3'

import './tabs.css'

class TabsLightBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        };
        this.toggle = this.toggle.bind(this);
    }
    componentWillMount() {
        const tab = 1
        this.getPropertyBuy(tab)
    }
    getPropertyBuy(tab) {
        const tabs = tab
        const uri = req[0].uspGetPropertyBuyImageLists
        const api_key = apikey[0].apikey
        let data = ({
            params: [
                { name: "EventID", value: this.props.event.event.EventID },
                { name: "FormatBuyImageID", value: tabs }
            ]
        })

        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": this.props.token.token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ dataSource: response.data });

                console.log(this.state.dataSource)
            }).catch((error) => {
                console.error(error)
            });
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
            this.getPropertyBuy(tab)
        }
    }
    render() {
        return (
            <div xs="12" sm="12" md="12" lg="12">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            ไฟล์ภาพ
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            ภาพอย่างเดียว
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '3' })}
                            onClick={() => { this.toggle('3'); }}
                        >
                            ภาพพร้อมกรอบ
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <ListTable1
                                    propertyImg={this.state.dataSource}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <ListTable2
                                    propertyImg={this.state.dataSource}
                                />
                                <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                    <label style={{ fontFamily: "kanit" }}>*** หมายเหตุ : ราคาต่อหนึ่งภาพพร้อมกรอบ รวมค่าจัดส่งแล้ว</label>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <ListTable3
                                    propertyImg={this.state.dataSource}

                                />
                                <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                    <label style={{ fontFamily: "kanit" }}>*** ภาพอย่างเดียว จะบวกเพิ่มค่าจัดส่ง 20 บาท/การสั่งซื้อ (เลือกมากกว่า 1 ภาพ ก็บวกเพิ่มแค่ 20 บาท)</label>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        event: state.event
    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsLightBox)