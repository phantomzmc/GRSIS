import React, { Component } from 'react'
import { Container, Row, Col } from "reactstrap";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './lightbox.css'
import TabsLightBox from './tabs/tabs'

class LigthBoxImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.image,
        };
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        // this.props.close()
        this.props.nextPage()
    }
    render() {
        return (
            <div className="row-style">
                <Container>
                    <Row >
                        <Col xs="12" sm="12" md="12">
                            <Card className="card-items">
                                <CardTitle className="cards-title"><h3 style={{ color: '#fff' }}>รายละเอียด</h3></CardTitle>
                                <div className="content">
                                    <Col xs="12" sm="7" md="7">
                                        <div className="img-ligth">
                                            <CardImg width="200px" src={this.state.img} alt="Card image cap" />
                                        </div>
                                    </Col>
                                    <Col xs="12" sm="5" md="5">
                                        <CardBody >
                                            <CardTitle>Card title</CardTitle>
                                            <TabsLightBox />
                                            <Button color="success" size="lg" block onClick={this.handleClick}>สั่งซื้อรายการนี้</Button>
                                        </CardBody>
                                    </Col>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default LigthBoxImage