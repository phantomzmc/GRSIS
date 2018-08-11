import React, { Component } from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from "axios";


class SugestTambon extends Component {
    state = {
        query: "หนอง",
        results: []
    }
    componentDidMount(){
        let uri = "http://api.shutterrunning2014.com/api/v2/stris/_proc/Main.uspGetTambonSuggestions"
        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjcsInVzZXJfaWQiOjcsImVtYWlsIjoiZ3JzQGd1dXJ1bi5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvYXBpLnNodXR0ZXJydW5uaW5nMjAxNC5jb21cL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE1MzM0OTcyNDAsImV4cCI6MTUzMzUwMDg0MCwibmJmIjoxNTMzNDk3MjQwLCJqdGkiOiJhMDM4MGVjNjdjODhmODQ0ZjA0MjJhNDI4ZTQ2MjJiNSJ9.r0uFg5bDZdGh2kU4_SFVguXAalBry_sUdmmQgDY_CrQ"
        let data = ({
            params: [
                {
                    name: "Keyword", value: this.state.query
                }
            ]
        })

        axios.post(uri, data, {
            headers: {
                "X-DreamFactory-API-Key": "36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88",
                "X-DreamFactory-Session-Token": token
            },
            responseType: 'json'
        })
            .then((response) => {
                this.setState({ results: response.data[0].Value });
                console.log(this.state.results)
            }).catch((error) => {
                console.error(error)
                // this.props.navigation.navigate('EventList')
            });
    }
    handleInputChange(){
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()
                }
            } else if (!this.state.query) {
            }
        })
    }
    render() {
        return (
            <div>
                <Form>
                    <Input
                        placeholder={this.state.results}
                        ref={input => this.search = input}
                        onChange={this.handleInputChange} />
                </Form>

            </div>
        )
    }
}

export default SugestTambon
