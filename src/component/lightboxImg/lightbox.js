import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import './lightbox.css'
import Lightbox from 'lightbox-react';
import TabsLightBox from './tabs/tabs'
import { Icon } from "semantic-ui-react";



class LigthBoxImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.image,
            imgDetail: this.props.detail,
            isOpen1: true,
            isOpen: false,
            layoutCart: false
        };
    }
    componentDidMount() {
        console.log(this.props.keyImage)
        console.log(this.state.imgDetail)
    }
    render() {
        return (
            <div className="row-style">
                {this.state.isOpen1 &&
                    // <Card>
                    //     <Row>
                    //         <Col md={12} sm={12} xs={12}>
                    //             <div className="img-ligth">
                    //                 <CardTitle>
                    //                     <div className="click-full">
                    //                         <Button color="secondary" size="sm" onClick={() => this.setState({ isOpen: true, isOpen1: false })}>
                    //                             <Icon name="expand arrows alternate" className="icon-full" />
                    //                             ดูภาพขนาดใหญ่
                    //                     </Button>
                    //                     </div>
                    //                     <span>{this.props.keyImage} / 35</span>

                    //                 </CardTitle>
                    //                 <CardSubtitle>
                    //                     <div className="img-view">
                    //                         <img src={this.state.img} id="img-worker" />
                    //                     </div>
                    //                     <div className="btn-buy">
                    //                     <Button color="success" block onClick={() => this.setState({ layoutCart: true, isOpen1: false })}>
                    //                             <Icon name="cart" className="icon-full" />
                    //                             <span id="text-buy">สั่งซื้อภาพ</span>
                    //                     </Button>
                    //                     </div>
                    //                 </CardSubtitle>
                    //             </div>
                    //         </Col>
                    //     </Row>
                    // </Card>
                    <img src={this.state.img} />

                }
                {this.props.onOpenTab &&
                    <Lightbox
                        mainSrc={
                            <div className="ligthboxTab-style">
                                <TabsLightBox
                                    detail={this.state.imgDetail}
                                    nextPages={() => this.props.nextPage()}
                                />
                            </div>

                        }
                        onCloseRequest={() => this.setState({ layoutCart: false, isOpen1: true })}
                    />
                }
                {/* <Modal open={this.state.layoutCart} onClose={() => this.setState({ layoutCart: false, isOpen1: true })} center>
                    <div className="tab-ligth">
                        <CardBody>
                            <TabsLightBox
                                detail={this.state.imgDetail}
                                nextPages={() => this.props.nextPage()}
                            />
                        </CardBody>
                    </div>
                </Modal> */}
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