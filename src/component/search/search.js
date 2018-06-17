import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
// import { Button } from 'reactstrap';



import './search.css'

class SearchEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleInput: "ค้นหารายการวิ่ง",
            text1: "Shutter Running ",
            text2: " ImageSevice"
        }
    }

    componentDidMount() {
        this.setState({ titleInput: this.props.title, text1: this.props.text1, text2: this.props.text2 })
    }
    render() {
        return (
            <div className="seach-haeder">
                <h1 className="text-seach">{this.state.text1}<b>{this.state.text2}</b></h1>
                <hr className="hr-style1" />
                <hr className="hr-style2" />
                <div className="input-seach">
                    <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">{this.state.titleInput}</InputGroupAddon>
                        <Input />
                    </InputGroup>
                </div>
                <div className="btn-goevent">
                    <Button outline color="warning" size="lg"> Go to Event </Button>{' '}
                </div>
            </div>
        )
    }
}

export default SearchEvent