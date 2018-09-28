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

class SugestCountry extends Component {
    static propTypes = {
        searchTerm: PropTypes.string
    }
    constructor(props) {
        super(props)
        this.state = {
            query: "หนอง",
            isItems: false,
            dataCountry: ["test", 1, 2]
        }
    }
    componentWillMount() {
        this.loadData()
    }

    loadData() {
        const uri = req[0].uspGetCountryLists
        const api_key = apikey[0].apikey
        const token = this.props.token.token
        axios.get(uri, {
            headers: {
                "X-DreamFactory-API-Key": api_key,
                "X-DreamFactory-Session-Token": token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ dataCountry: response.data });
                setTimeout({
                    isItems: true
                }, 100)
                console.log(this.state.dataCountry)
            }).catch((error) => {
                console.error(error)
                // this.props.navigation.navigate('EventList')
            });
    }
    handleChang = (e) => {
        this.props.setCountry(e.target.value)
        console.log(e.target.value)
    }

    render() {

        return (
            <div>
                <Form >
                    <Input type="select" onChange={this.handleChang.bind(this)}>
                        {this.state.dataCountry.map((item) =>
                            <option value={item.Value}>{item.Label}</option>
                        )}
                    </Input>
                </Form>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(SugestCountry)
