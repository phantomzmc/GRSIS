import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
// import { Button } from 'reactstrap';



import './search.css'

class SearchEvent extends Component {
    render() {
        return (
            <div className="seach-haeder">
                <h1 className="text-seach">Shutter Running <b>ImageSevice</b></h1>
                <hr className="hr-style1"/>
                <hr className="hr-style2"/>
                <div className="input-seach">
                    <InputGroup size="lg">
                        <InputGroupAddon addonType="prepend">ค้นหารายการวิ่ง</InputGroupAddon>
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