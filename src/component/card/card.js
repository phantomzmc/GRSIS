import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Container, Row, Col
} from 'reactstrap';
import { BrowserRouter, Link,withRouter } from 'react-router-dom'
import dataEvent from '../../data/dataEvent'
import './card.css'

class CardEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.gotoShowimage = this.gotoShowimage.bind(this)
    }
    componentDidMount = () => {
        this.setState({ data: dataEvent })
    }
    gotoShowimage(){
        this.props.history.push("/showimage")
    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        {
                            this.state.data.map((dynamicData, i) =>
                                <Col xs="12" sm="6" md="4">
                                    <CardDeck className="card-item">
                                        <Card >
                                            <CardImg top width="100%" src={dynamicData.pic} alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle>{dynamicData.name}</CardTitle>
                                                <CardSubtitle>
                                                    <label className="card-date">Date :</label> {dynamicData.detail}
                                                </CardSubtitle>
                                                {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                                                <div className="card-button">
                                                    {/* <Link to="/showimage"> */}
                                                    <Button outline color="info" onClick={this.gotoShowimage}>View Image</Button>
                                                    {/* </Link> */}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </CardDeck>
                                </Col>

                            )
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(CardEvents)