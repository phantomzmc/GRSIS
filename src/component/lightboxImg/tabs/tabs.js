import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardBody, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux'
import axios from 'axios'
import req from '../../../config/uri_req'
import apikey from '../../../config/apikey'
import ListTable1 from '../listTable/listTable'
import ListTable2 from '../listTable/listTable2'
import ListTable3 from '../listTable/listTable3'
import dataQuantity from '../../../data/dataQuantity'

import './tabs.css'

class TabsLightBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            dataSource: "",
            format: [],
            tabFormat: false
        };
        this.toggle = this.toggle.bind(this);
    }
    componentWillMount() {
        // const tab = 1
        this.getFormatBuy()
        // this.getPropertyBuy(tab)
    }
    getFormatBuy() {
        // const tab = 1
        const uri = req[0].uspGetFormatBuyImageLists
        const api_key = apikey[0].apikey
        axios.get(uri, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": this.props.token.token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ format: response.data, tabFormat: true });
                console.log(this.state.format)
                console.log(response.data)
                this.getPropertyBuy(response.data[0].FormatBuyImageID)
            }).catch((error) => {
                console.error(error)
            });
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
                console.log(response.data)
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
    setPostPrice(price){
        this.props.setPricePost(parseInt(price))
    }
    sumQuantity() {
        const add = (a, b) => a + b
        const sum = dataQuantity.reduce(add)
        this.setState({ quantity: sum })
        this.props.setQuantity(sum)
        console.log(sum)
    }

    render() {
        const { format } = this.state
        return (
            <div>
                {this.state.tabFormat &&
                    <div className="contai-tab">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle(format[0].FormatBuyImageID); }}
                                >
                                    <p>{format[0].FormatBuyImageName}</p>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle(format[1].FormatBuyImageID); }}
                                ><p>{format[1].FormatBuyImageName}</p>

                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle(format[2].FormatBuyImageID); }}
                                >
                                    <p>{format[2].FormatBuyImageName}</p>
                                </NavLink>
                            </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col xs="12">
                                        <ListTable1
                                            details={this.props.detail}
                                            propertyImg={this.state.dataSource}
                                            postPrice={format[0].ExtraPostPrice}
                                            sendPost={format[0].ExtraSendPost}
                                            setPostPrice={this.setPostPrice.bind(this)}
                                            sumQuantity={this.sumQuantity.bind(this)}
                                            nextPage={() => this.props.nextPages()}
                                        />
                                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                            <label style={{ fontFamily: "kanit" }}>{format[0].Note}</label>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col xs="12">
                                        <ListTable3
                                            details={this.props.detail}
                                            propertyImg={this.state.dataSource}
                                            postPrice={format[1].ExtraPostPrice}
                                            sendPost={format[1].ExtraSendPost}
                                            setPostPrice={this.setPostPrice.bind(this)}
                                            sumQuantity={this.sumQuantity.bind(this)}
                                            nextPage={() => this.props.nextPages()}

                                        />
                                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                            <label style={{ fontFamily: "kanit" }}>*** {format[1].Note}</label>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col xs="12">
                                        <ListTable2
                                            details={this.props.detail}
                                            propertyImg={this.state.dataSource}
                                            postPrice={format[2].ExtraPostPrice}
                                            sendPost={format[2].ExtraSendPost}
                                            setPostPrice={this.setPostPrice.bind(this)}
                                            sumQuantity={this.sumQuantity.bind(this)}
                                            nextPage={() => this.props.nextPages()}

                                        />

                                        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                            <label style={{ fontFamily: "kanit" }}>*** {format[2].Note}</label>
                                        </div>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div>
                }
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
        setPricePost: (pricepost) => {
            dispatch({
                type: "setPricePost",
                payload: pricepost
            })
        },
        setQuantity : (quantity) => {
            dispatch({
                type : "setQuantity",
                payload : quantity
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabsLightBox)