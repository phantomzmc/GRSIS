import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import { Tooltip } from 'reactstrap';


class SubCrad extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgPhoGra: [],
            imgPhoGra2: {},
        }
    }

    render() {
        let url = "https://shutterrunning.com/assets/img/Photographer/"
        return (
            <div>
                {this.props.photographer.map((item) =>
                    <Image src={url + item.Pic} avatar />
                )}
            </div>

        );
    }
}

export default SubCrad;