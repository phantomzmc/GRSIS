import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import axios from "axios";
import { connect } from 'react-redux'
import Autosuggest from 'react-autosuggest';
import theme from "react-autosuggest/dist/theme";
import req from '../../config/uri_req'
import apikey from '../../config/apikey'
import './search.css'
import { relative } from 'path';
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
            suggestions: []
        }
    }

    componentDidMount() {
        this.setState({ titleInput: this.props.title, text1: this.props.text1, text2: this.props.text2 })

    }
    segesEvent = () => {
        let uri = req[0].uspGetEventSuggestion
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
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        this.segesEvent()
    };
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            className: 'input-sugges',
            placeholder: this.state.titleInput,
            value,
            onChange: this.onChange
        };
        return (
            <div className="seach-haeder">
                <h1 className="text-seach">{this.state.text1}<b>{this.state.text2}</b></h1>
                <hr className="hr-style1" />
                <hr className="hr-style2" />
                <div className="input-seach">
                    {/* <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">{this.state.titleInput}</InputGroupAddon>

                    </InputGroup> */}
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                    />
                </div>
                <div className="btn-goevent">
                    <Button outline color="warning" size="lg" onClick={() => this.segesEvent()}> Go to Event </Button>{' '}
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
export default connect(mapStateToProps)(SearchEvent)