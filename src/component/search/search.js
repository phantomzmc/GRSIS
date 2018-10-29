import React, { Component } from 'react'
import { Col, Row, Card, CardDeck, CardBody, CardTitle, CardSubtitle, CardImg, Input, Button, Form, FormGroup, Label, Container } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react'
import axios from "axios";
import { connect } from 'react-redux'
import { BrowserRouter, Link, withRouter } from 'react-router-dom'
import req from '../../config/uri_req'
import apikey from '../../config/apikey'
import './search.css'
import SuggestEvent from '../form/sugestion/sug_event'
import VdoHeader from '../header/header'
import Modal from "react-responsive-modal";

const languages = [];
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : languages.filter(lang =>
        lang.EventName.toLowerCase().slice(0, inputLength) === inputValue
    );
};


const getSuggestionValue = (suggestion) => suggestion.EventName;
const renderSuggestion = (suggestion) => (
    <li className="list-sugges-container--open">{suggestion.EventName}</li>
);

class SearchEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleInput: "ค้นหารายการวิ่ง",
            text1: "Shutter Running ",
            text2: " ImageSevice",
            event: "รา",
            selectedOption: "",
            dataSource: [],
            value: '',
            suggestions: [],
            typeSearch: 0,
            statusEventSug: false,
            eventSugestion: "",

        }
    }

    componentDidMount() {
        this.setState({ titleInput: this.props.title, text1: this.props.text1, text2: this.props.text2 })

    }
    segesEvent() {
        let uri = req[0].uspGetEvent
        let api_key = apikey[0].apikey
        let data = ({
            params: [
                { name: "Keyword", value: this.state.value }
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
                this.setState({ suggestions: response.data });
                console.log(this.state.suggestions)
            }).catch((error) => {
                console.error(error)
            });
    }
    // setSugestEvent(eventid) {
    //     // this.setState({ value: event })
    //     const uri = req[0].uspGetEvent
    //     const api_key = apikey[0].apikey
    //     const token = this.props.token.token
    //     let data = ({
    //         params: [
    //             {
    //                 name: "EventID", value: eventid
    //             }
    //         ]
    //     })

    //     axios.post(uri, data, {
    //         headers: {
    //             "X-DreamFactory-API-Key": api_key,
    //             "X-DreamFactory-Session-Token": token
    //         },
    //         responseType: 'json'
    //     })
    //         .then((response) => {
    //             this.setState({ event: response.data });
    //             console.log(this.state.event)
    //             this.setEventSugest(response.data[0])
    //         }).catch((error) => {
    //             console.error(error)
    //             // this.props.navigation.navigate('EventList')
    //         });
    // }

    setSugestEvent(eventname) {
        let uri = req[0].uspGetEventLists
        let api_key = apikey[0].apikey
        let data = ({
            params: [
                { name: "Keyword", value: eventname },
                { name: "EventStatus", value: 1 },
                { name: "PageNo", value: 1 },
                { name: "RowPerPage", value: 15 }
            ]
        })
        axios.post(uri, data, {
            mode: 'no-cors',
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": this.props.token.token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ dataSource: response.data,statusEventSug : true });
                console.log(this.state.dataSource)
                // this.setEventSugest(response.data)
            }).catch((error) => {
                setTimeout(() => {
                    this.getEvent(eventname)
                }, 1000)
            });
    }

    setEventSugest(eventSugest) {
        this.props.setEvent(eventSugest)
        setTimeout(() => {
            this.props.history.push("/showimage")
        }, 100)
    }

    handleChange(e) {
        this.setState({
            typeSearch: e.target.value
        })
        if(e.target.value === 0){
            const type = 0
            this.props.getValueBib(null, type)
        }
        
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ bib: this.getSearch.value })
        const type = 1
        const search = this.getSearch.value
        console.log(search)
        this.props.getValueBib(search, type)
    }
    handleSubmitTime = (e) => {
        e.preventDefault();
        const type = 2
        const time = this.getTime.value
        // const min = this.getMin.value
        // const timeSearch = time + ":" + min
        console.log(time)
        this.props.getValueBib(time, type)
    }
    handleClear = (txt)=> {
        if(txt.target.value === ""){
            console.log("null")
            const type = 0
            this.props.getValueBib(null, type)
        }
    }
    render() {
        const { value, suggestions, eventSugestion, dataSource } = this.state;
        const uri = "https://shutterrunning.com/assets/img/eventbanner/"
        const inputProps = {
            className: 'input-sugges',
            placeholder: this.state.titleInput,
            value,
            onChange: this.onChange
        };
        return (
            <Container>
                {this.props.pages == true ?
                    <div className="seach-haeder">
                        <h1 className="text-seach">{this.state.text1}<b>{this.state.text2}</b></h1>
                        <hr className="hr-style1" />
                        <hr className="hr-style2" />
                        <div className="input-seach">
                            <Row>
                                <Col xs={12} sm={12} md={12}>
                                    <SuggestEvent
                                        getEventID={this.setSugestEvent.bind(this)}
                                    />
                                </Col>
                            </Row>

                        </div>
                        <Modal open={this.state.statusEventSug} onClose={() => this.setState({ statusEventSug: false })} center>
                            <CardDeck className="card-item">
                                {dataSource.map((item, index) =>
                                    <Card >
                                        <CardImg top width="100%" src="" alt="Card image cap" src={uri + item.EventPic} />
                                        <CardBody>
                                            <CardTitle className="cerd-title">{item.EventName}</CardTitle>
                                            <CardTitle>
                                                <label className="card-date">Date :</label> {item.EventDate}
                                            </CardTitle>
                                            <CardTitle>
                                                <div className="card-button">
                                                    {/* <Link to="/showimage"> */}
                                                    <Button outline color="info" onClick={() => this.setEventSugest(item)}>View Image</Button>
                                                    {/* </Link> */}
                                                </div>
                                            </CardTitle>
                                        </CardBody>
                                        <CardBody>
                                            <CardSubtitle>
                                                {/* <SubCard
                                                photographer={JSON.parse(dynamicData.PhotoGrapher)}
                                            /> */}
                                            </CardSubtitle>
                                        </CardBody>
                                    </Card>
                                )}
                            </CardDeck>

                        </Modal>

                    </div>

                    :

                    <div className="seach-haeder">
                        <h1 className="text-seach">{this.state.text1}<b>{this.state.text2}</b></h1>
                        <hr className="hr-style1" />
                        <hr className="hr-style2" />
                        <div className="input-seach">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Input type="select" bsSize="lg" onChange={this.handleChange.bind(this)} id="typeInput">
                                        <option value="0">เลือกกลุ่มการค้นหา</option>
                                        <option value="1">BiB Number</option>
                                        <option value="2">เวลา ชั่วโมง : นาที</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </div>
                        <div className="input-seach">
                            {this.state.typeSearch == 1 ?
                                <div id="formtime">
                                    <Form inline onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <Input
                                                id="typeInput"
                                                bsSize="lg"
                                                placeholder="Ex.A1234"
                                                innerRef={(input) => this.getSearch = input}
                                                onChange={this.handleClear}
                                            />
                                        </FormGroup>
                                        <div className="btn-gobib">
                                            <Button outline color="warning" size="lg" type="submit"> Search BiB </Button>
                                        </div>
                                    </Form>
                                </div>
                                :
                                <div></div>
                            }
                            {this.state.typeSearch == 2 ?
                                <div id="formtime">
                                    <Form inline onSubmit={this.handleSubmitTime}>
                                        <FormGroup>
                                            <Input
                                                type="time"
                                                name="time"
                                                id="typeInputTime"
                                                placeholder="Ex.06:59"
                                                innerRef={(input) => this.getTime = input}
                                                onChange={this.handleClear}
                                            />
                                        </FormGroup>
                                        <div className="btn-gobib">
                                            <Button outline color="warning" size="lg" type="submit"> Search Time </Button>
                                        </div>
                                    </Form>
                                </div>
                                :
                                <div></div>
                            }
                        </div>
                    </div>
                }
            </Container>
        )
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
        setBibCode: (bib) => {
            dispatch({
                type: "setBibCode",
                payload: bib
            })
        },
        setEvent: (id) => {
            dispatch({
                type: "setEvent",
                payload: id
            })
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchEvent))