import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle, CardDeck,
    CardSubtitle, CardBody, Container, Row, Col
} from 'reactstrap';
import { Icon } from "semantic-ui-react";
import ReactLoading from 'react-loading';
import { BrowserRouter, Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import './card.css'
import Pagenation from '../pagenation/pagenation'
import SubCard from './subcard'
import req from '../../config/uri_req'
import apikey from '../../config/apikey'

class CardEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataSource: [],
            pageOfItems: [],
            imgPhoGra: [],
            pageNo: 1,
            isLoad: true,
            isEvent: false
        }
        this.gotoShowimage = this.gotoShowimage.bind(this)
        // this.onChangePage = this.onChangePage.bind(this)
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.getEvent()
        }, 1000)
    }
    componentWillReceiveProps = (nextState) => {
        if (nextState.pageNo != this.state.pageNo) {
            this.setState({
                pageNo: this.state.pageNo
            })
            this.getEvent()
            console.log("upgrade")
        }
    }

    getEvent() {
        let uri = req[0].uspGetEventLists
        let api_key = apikey[0].apikey
        let data = ({
            params: [
                { name: "Keyword", value: "" },
                { name: "EventStatus", value: 1 },
                { name: "PageNo", value: this.state.pageNo },
                { name: "RowPerPage", value: 33 }
            ]
        })
        axios.post(uri, data, {
            mode : 'no-cors',
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": this.props.token.token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ dataSource: response.data });
                setTimeout(() => {
                    this.setState({ isLoad: false, isEvent: true})
                },1000)
                console.log(this.state.dataSource)
            }).catch((error) => {
                console.error(error)
                this.setState({ isLoad: true, isEvent: false })
                setTimeout(() => {
                    this.getEvent()
                }, 1000)
            });
    }
    saveEvent(item) {
        this.props.setEvent(item)
        this.gotoShowimage()
    }
    gotoShowimage() {
        this.props.history.push("/showimage")
    }
    onChangePage = (pageNum) => {
        this.setState({ pageNo: pageNum ,isEvent : false ,isLoad : true });
        console.log("pageNum" + pageNum)
        this.getEvent()
    }

    render() {
        let uri = "https://shutterrunning.com/assets/img/eventbanner/"
        return (
            <div>
                <Container>
                    {this.state.isLoad &&
                        <div className="container-isload">
                            <ReactLoading type="bubbles" color="#000" height={'15%'} width={'15%'} />
                        </div>
                    }
                    {this.state.isEvent &&
                        <Row>
                            {
                                this.state.dataSource.map((dynamicData, i) =>
                                    <Col xs="12" sm="6" md="4">
                                        <CardDeck className="card-item">
                                            <Card >
                                                <CardImg top width="100%" src="" alt="Card image cap" src={uri + dynamicData.EventPic} />
                                                <CardBody>
                                                    <CardTitle className="cerd-title">{dynamicData.EventName}</CardTitle>
                                                    <CardSubtitle>
                                                        <label className="card-date">Date :</label> {dynamicData.EventDate}
                                                    </CardSubtitle>
                                                    {/* <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText> */}
                                                    <div className="card-button">
                                                        {/* <Link to="/showimage"> */}
                                                        <Button outline color="info" onClick={() => this.saveEvent(dynamicData)}>View Image</Button>
                                                        {/* </Link> */}
                                                    </div>
                                                </CardBody>
                                                <CardBody>
                                                    <CardSubtitle>
                                                        <SubCard
                                                            photographer={JSON.parse(dynamicData.PhotoGrapher)}
                                                        />
                                                    </CardSubtitle>
                                                    {/* <img width="50px" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                                                </CardBody>
                                            </Card>
                                        </CardDeck>
                                    </Col>

                                )
                            }
                        </Row>
                    }
                </Container>
                <div className="pagenation">
                    <Pagenation
                        numPage={(pageNum) => this.onChangePage(pageNum)}
                    />
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
const mapDispatchToProps = dispatch => {
    return {
        setEvent: (event) => {
            dispatch({
                type: "setEvent",
                payload: event
            })
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardEvents))