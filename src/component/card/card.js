import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Container, Row, Col
} from 'reactstrap';
import { BrowserRouter, Link, withRouter } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import dataEvent from '../../data/dataEvent'
import axios from 'axios'
import { connect } from 'react-redux'
import './card.css'
import Pagenation from '../pagenation/pagenation'

class CardEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataSource: [],
            pageOfItems: []

        }
        this.gotoShowimage = this.gotoShowimage.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.getEvent()
        }, 3000)
    }
    getEvent() {
        let token = this.props.token.token
        axios.get("http://api.shutterrunning2014.com/api/v2/stris/_table/Main.Events", {
            headers: {
                "X-DreamFactory-API-Key": "36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88",
                "X-DreamFactory-Session-Token": token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ isLoading: false, dataSource: response.data.resource });
                console.log(this.state.dataSource)
            }).catch((error) => {
                setTimeout(() => {
                    this.getEvent()
                }, 2000)
                // this.props.navigation.navigate('EventList')
            });
    }
    gotoShowimage() {
        this.props.history.push("/showimage")
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    render() {
        let i = 32
        return (
            <div>
                <Container>
                    <Row>
                        {
                            this.state.pageOfItems.map((dynamicData, i) =>
                                <Col xs="12" sm="6" md="4">
                                    <CardDeck className="card-item">
                                        <Card >
                                            <CardImg top width="100%" src="" alt="Card image cap" />
                                            <CardBody>
                                                <CardTitle>{dynamicData.EventName}</CardTitle>
                                                <CardSubtitle>
                                                    <label className="card-date">Date :</label> {dynamicData.EventDate}
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
                <div className="pagenation">
                    <Pagenation items={this.state.dataSource} onChangePage={this.onChangePage} />
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}


export default withRouter(connect(mapStateToProps)(CardEvents))