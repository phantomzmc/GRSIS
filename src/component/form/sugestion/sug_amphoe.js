import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from "axios";
import SearchInput, { createFilter } from 'react-search-input'
import { connect } from "react-redux";
import req from '../../../config/uri_req'
import apikey from '../../../config/apikey'
import './sugest.css'
const KEYS_TO_FILTERS = ['Value'];

class SugestTambon extends Component {
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
            tumporn: "",

        }
        this.searchUpdated = this.searchUpdated.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.tumporn && prevState.tumporn) {
            this.loadData = false

        }
        else if (this.state.searchTerm && prevState.searchTerm) {
            console.log("loadData")
            this.loadData()
        }
    }

    loadData() {
        const uri = req[0].uspGetAmphoeSuggestions
        const api_key = apikey[0].apikey
        // const token = this.props.token.token
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjcsInVzZXJfaWQiOjcsImVtYWlsIjoiZ3JzQGd1dXJ1bi5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvYXBpLnNodXR0ZXJydW5uaW5nMjAxNC5jb21cL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE1MzQyMTI1MDgsImV4cCI6MTUzNDIxNjEwOCwibmJmIjoxNTM0MjEyNTA4LCJqdGkiOiI0ODExNWFiNmRiOGFhNTdhYmY2YTQ4MTY4Mzk2MTk5YSJ9.WBiaueVNnkAH0z34fCGruynSiTK7IlPnJNMwEIUxMr0"

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
                        placeholder={this.state.emails}
                        className="search-input"
                        onChange={(term) => { this.searchUpdated(term) }} />
                </Form>
                {this.state.isItems &&
                    <div>
                        {filteredEmails.map(email => {
                            return (
                                <div className="list" key={email.Value}>
                                    <li className="list-items" style={{ listStyleType: "none" }}>{email.Value}</li>
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
export default connect(mapStateToProps)(SugestTambon)
