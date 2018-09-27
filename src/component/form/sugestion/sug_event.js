import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from "axios";
import SearchInput, { createFilter } from 'react-search-input'
import { connect } from "react-redux";
import req from '../../../config/uri_req'
import apikey from '../../../config/apikey'
import './sugest.css'
const KEYS_TO_FILTERS = ['EventName'];

class SugestEvent extends Component {
    static propTypes = {
        searchTerm: PropTypes.string
    }
    constructor(props) {
        super(props)
        this.state = {
            query: "หนอง",
            emails: [],
            searchTerm: '',
            isItems: false,
            event: "",

        }
        this.searchUpdated = this.searchUpdated.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.event && prevState.event) {
            this.loadData = false

        }
        else if (this.state.searchTerm && prevState.searchTerm) {
            console.log("loadData")
            this.loadData()
        }
    }

    loadData() {
        const uri = req[0].uspGetEventSuggestion
        const api_key = apikey[0].apikey
        // const token = this.props.token.token
        const token = this.props.token.token

        let data = ({
            params: [
                {
                    name: "Keyword", value: this.state.searchTerm
                }
            ]
        })

        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ emails: response.data });
                console.log(this.state.emails)
            }).catch((error) => {
                console.error(error)
                // this.props.navigation.navigate('EventList')
            });
    }
    setValue(email) {
        this.setState({ event: email.EventName, id: email.EventID, isItems: false })
        this.props.getEventID(email.EventID)
        console.log(email)
    }
    searchUpdated(term) {
        this.setState({ searchTerm: term, isItems: true })
    }
    render() {
        const { emails } = this.state
        const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        return (
            <div>
                <Form>
                    <SearchInput
                        placeholder="ค้นหารายการวิ่ง"
                        value={this.state.event}
                        className="search-input"
                        onChange={(term) => { this.searchUpdated(term) }} />
                </Form>
                {this.state.isItems &&
                    <div>
                        {filteredEmails.map(email => {
                            return (
                                <div className="list" key={email.EventName}>
                                    <li
                                        className="list-items"
                                        style={{ listStyleType: "none" }}
                                        onClick={() => this.setValue(email)}>
                                        <span>{email.EventName}</span>
                                    </li>
                                </div>
                            )
                        })
                        }
                    </div>
                }
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(SugestEvent)
