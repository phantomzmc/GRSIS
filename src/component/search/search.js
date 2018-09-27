import React, { Component } from 'react'
import { Col, Row, InputGroup, InputGroupAddon, Input, Button, Form, FormGroup, Label } from 'reactstrap';
import axios from "axios";
import { connect } from 'react-redux'
import { BrowserRouter, Link, withRouter } from 'react-router-dom'
import req from '../../config/uri_req'
import apikey from '../../config/apikey'
import './search.css'
import SuggestEvent from '../form/sugestion/sug_event'

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
            typeSearch: 0
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
                this.setEventSugest(response.data[0])
            }).catch((error) => {
                console.error(error)
            });
    }
    setSugestEvent(event) {
        this.setState({ value: event })

    }
    setEventSugest(eventSugest) {
        this.props.setEvent(eventSugest)
        this.props.history.push("/showimage")
    }

    handleChange(e) {
        this.setState({
            typeSearch: e.target.value
        })
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
        const min = this.getMin.value
        const timeSearch = time + ":" + min
        console.log(timeSearch)
        this.props.getValueBib(timeSearch, type)
    }
    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            className: 'input-sugges',
            placeholder: this.state.titleInput,
            value,
            onChange: this.onChange
        };
        return (
            this.props.pages == true ?
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

                    <div className="btn-goevent">
                        <Button outline color="warning" size="lg" onClick={() => this.segesEvent()}> Go to Event </Button>{' '}
                    </div>
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
                                            id="typeInput"
                                            bsSize="lg"
                                            placeholder=" ชั่วโมง Ex.06"
                                            innerRef={(input) => this.getTime = input}
                                        />
                                        <div id="in-time">
                                            <Label >  :  </Label>
                                        </div>
                                        <Input
                                            id="typeInput"
                                            bsSize="lg"
                                            placeholder=" นาที Ex. 45"
                                            innerRef={(input) => this.getMin = input}
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