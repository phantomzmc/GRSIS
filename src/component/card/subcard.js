import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'

class SubCrad extends Component {
    state = {
        imgPhoGra: [],
        imgPhoGra2: {}
    }
    componentDidMount() {
        console.log(this.props.photographer)


    }

    render() {
        let url = "https://shutterrunning.com/assets/img/Photographer/"
        return (
            <div>
                {this.props.photographer.map((item) =>
                    <Image src={url + item.Pic} avatar />

                )
                }

            </div>

        );
    }
}

export default SubCrad;