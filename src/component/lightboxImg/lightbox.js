import React, { Component } from 'react'
import { Container, Row, Col } from "reactstrap";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './lightbox.css'
import Lightbox from 'lightbox-react';
import TabsLightBox from './tabs/tabs'
import ImageWorker from 'react-worker-image';

import { Icon } from "semantic-ui-react";



class LigthBoxImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.image,
            imgDetail: this.props.detail,
            isOpen1: true,
            isOpen: false
        };
    }
    componentDidMount(){
        console.log(this.props.keyImage)
        console.log(this.state.imgDetail)
    }
    render() {
        return (
            <div className="row-style">
                <Card>
                    <Row>
                        <Col xs="12" md="6" sm="6">
                            <div className="img-ligth">
                                <CardTitle>
                                    <div className="click-full">
                                        <Button color="secondary" size="sm" onClick={() => this.setState({ isOpen: true, isOpen1: false })}>
                                            <Icon name="expand arrows alternate" className="icon-full" />
                                            ดูภาพขนาดใหญ่
                                        </Button>
                                    </div>
                                    <span>{this.props.keyImage} / 35</span>

                                </CardTitle>
                                <CardSubtitle>
                                    <div className="img-view">
                                        <ImageWorker src={this.state.img} style={{ width: "80%" }} />
                                    </div>
                                </CardSubtitle>
                            </div>
                        </Col>
                        <Col xs="12" md="6" sm="6">
                            <div className="tab-ligth">
                                <CardTitle>
                                    <h3>รายละเอียด</h3>
                                </CardTitle>
                                <CardBody>
                                    <TabsLightBox
                                        detail={this.state.imgDetail}
                                        nextPages={() => this.props.nextPage()}
                                    />
                                </CardBody>
                            </div>
                        </Col>

                    </Row>
                </Card>
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