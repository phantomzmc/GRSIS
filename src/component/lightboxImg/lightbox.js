import React, { Component } from 'react'
import { Container, Row, Col } from "reactstrap";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './lightbox.css'
import Lightbox from 'lightbox-react';
import TabsLightBox from './tabs/tabs'
import { Icon } from "semantic-ui-react";

import orderlist from '../../json/orderlist' //json orderlist
import orderlistFull from '../../json/orderlistFull'

class LigthBoxImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.image,
            imgDetail: this.props.datail,
            isOpen1: true,
            isOpen: false
        };
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        let { imgDetail } = this.state
        console.log(this.props.detail)
        let dataOrder = {
            ImageID: this.props.detail.ImageID,
            PropertyBuyImageID: "",
            Quantity: ""
        }
        let dataOrderFull = {
            ImageID: this.props.detail.ImageID,
            ImageURL: this.props.detail.ImageURL,
            PropertyBuyImageID: "",
            Quantity: ""
        }
        orderlist.push(dataOrder)
        orderlistFull.push(dataOrderFull)
        console.log(orderlist)
        this.props.nextPage()
    }
    render() {
        return (
            <div className="row-style">
                <Row>
                    <div className="close-click">
                        <Icon name="close" id="icon-close" onClick={() => this.setState({ isOpen1: !this.state.isOpen1 })} />
                    </div>
                </Row>
                {
                    this.state.isOpen1 &&
                    <Row >
                        <Col xs="12" sm="12" md="12">
                            <Card className="card-items">

                                {/* <CardTitle className="cards-title"><h3 style={{ color: '#fff' }}>รายละเอียด</h3></CardTitle> */}
                                <div>
                                    <Row>
                                        <Col xs="12" sm="6" md="6">
                                            <div className="img-ligth">
                                                <div className="click-full">
                                                    <Button color="secondary" size="sm" onClick={() => this.setState({ isOpen: true, isOpen1: false })}>
                                                        <Icon name="expand arrows alternate" className="icon-full" />
                                                        ดูภาพขนาดใหญ่
                                            </Button>                                            </div>
                                                <CardImg style={{ width: "100%" }} src={this.state.img} alt="Card image cap" />
                                            </div>
                                            <div>
                                            </div>
                                        </Col>
                                        <Col xs="12" sm="6" md="6">
                                            <CardBody >
                                                <TabsLightBox />
                                                <Button color="success" size="lg" block onClick={this.handleClick}>สั่งซื้อรายการนี้</Button>
                                            </CardBody>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                }

                {
                    this.state.isOpen &&
                    <Lightbox
                        mainSrc={this.state.img}
                        onCloseRequest={() => this.setState({ isOpen: false, isOpen1: true })}

                    />

                }

            </div>
        )
    }
}

export default LigthBoxImage