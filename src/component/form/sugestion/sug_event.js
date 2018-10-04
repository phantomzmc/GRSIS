import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Dropdown, Popup } from 'semantic-ui-react'
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
            outputNull: false

        }
        this.searchUpdated = this.searchUpdated.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.event != "") {
        }
        else if ((this.state.searchTerm && prevState.searchTerm) && (this.state.event == "")) {
            console.log("loadData")
            this.loadData()
        }
    }
    loadData() {
        const uri = req[0].uspGetEventSuggestion
        const api_key = apikey[0].apikey
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
                if (response.data == "") {
                    this.setState({ outputNull: true })
                }
                else {
                    this.setState({ emails: response.data, outputNull: false });
                    console.log(this.state.emails)
                }
            }).catch((error) => {
                console.error(error)
                // this.props.navigation.navigate('EventList')
            });
    }

    setValue(email) {
        this.setState({ event: email.EventName, id: email.EventID, isItems: false, emails: [] })
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
                <Popup
                    trigger={
                        <Form>
                            <SearchInput
                                placeholder="ค้นหารายการวิ่ง"
                                value={this.state.event}
                                className={this.state.outputNull == false ? "search-input" : "search-input-error"}
                                onChange={(term) => { this.searchUpdated(term) }} />
                        </Form>}
                    header=
                    {this.state.outputNull == false ?
                        <p> *** เลือกรายการวิ่ง</p> :
                        <p id="textError"> *** ไม่พบรายการที่ค้นหา</p>
                    }
                    content=
                    {this.state.outputNull == false ?
                        <p>ผู้ใช้สามารถเลือกรายการวิ่งได้จากรายการทางด้านล่าง</p> :
                        <p id="textError">รายการที่ค้นหาไม่มีในระบบกรุณากรอกชื่อรายการให้ถูกต้อง</p>
                    }
                    on='focus'
                    position='right center'
                />

                {this.state.isItems &&
                    <div>
                        {/* {this.state.outputNull == false ? */}
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
                            // :
                            // <div className="list">
                            //     <li
                            //         className="list-items"
                            //         style={{ listStyleType: "none" }}>
                            //         <span id="textError">ไม่พบรายการที่ค้นหา</span>
                            //     </li>
                            // </div>
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
const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps)(SugestEvent)
