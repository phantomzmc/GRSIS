import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle, CardDeck,
    CardSubtitle, CardBody, Container, Row, Col
} from 'reactstrap';
import { Icon } from "semantic-ui-react";
import { BrowserRouter, Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import './card.css'
import Pagenation from '../pagenation/pagenation'
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
            pageNo: 1
        }
        this.gotoShowimage = this.gotoShowimage.bind(this)
        // this.onChangePage = this.onChangePage.bind(this)
    }
    componentDidMount = () => {
        this.getEvent()
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
                setTimeout(() => {
                    this.getEvent()
                }, 2000)
            });
    }
    saveEvent(item) {
        this.props.setEvent(item)
        this.gotoShowimage()
    }
    gotoShowimage() {
        this.props.history.push("/showimage")
    }
    // onChangePage(pageOfItems) {
    //     this.setState({ pageOfItems: pageOfItems });
    // }
    nextPage = () => {
        this.setState({ pageNo: this.state.pageNo + 1 })
        this.getEvent()
    }
    handleChange = (e) => {
        this.setState({ pageNo: e.target.value })
        this.getEvent()
    }
    prePage = () => {
        this.setState({ pageNo: this.state.pageNo - 1 })
        console.log(this.state.pageNo)
        this.getEvent()
    }

    render() {
        let uri = "https://shutterrunning.com/assets/img/eventbanner/"
        return (
            <div>
                <Container>
                    <Row>
                        {
                            this.state.dataSource.map((dynamicData, i) =>
                                <Col xs="12" sm="6" md="4">
                                    <CardDeck className="card-item">
                                        <Card >
                                            <CardImg top width="100%" src="" alt="Card image cap" src={uri + dynamicData.EventPic} />
                                            <CardBody>
                                                <CardTitle>{dynamicData.EventName}</CardTitle>
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
                                                    {/* <SubCard 
                                                        photographer={dynamicData}
                                                    /> */}
                                                </CardSubtitle>
                                                {/* <img width="50px" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                                            </CardBody>
                                        </Card>
                                    </CardDeck>
                                </Col>

                            )
                        }
                    </Row>

                </Container>
                <div className="pagenation">
                    <div>
                        {this.state.pageNo == 1 ?
                            <Button className="btn-page" disabled>
                                <Icon name="backward" />
                            </Button> :
                            <div className="btn-page">
                                <Button
                                    className="btn-page"
                                    onClick={() => this.prePage()}>
                                    <Icon name="backward" />
                                </Button>
                            </div>
                        }
                    </div>
                    <label className="textPage">หน้า</label>
                    <div className="input-page">
                        <form>
                            <input
                                className="style-inputPage"
                                value={this.state.pageNo}
                                onChange={this.handleChange.bind(this)}
                            />
                        </form>
                    </div>
                    <label className="textPage">จากหน้าที่</label>
                    <div className="btn-page">
                        <Button
                            className="btn-page"
                            onClick={() => this.nextPage()}>
                            <Icon name="forward" className="icon-color" />
                        </Button>
                    </div>
                    {/* <Pagenation items={this.state.dataSource} onChangePage={this.onChangePage} /> */}
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