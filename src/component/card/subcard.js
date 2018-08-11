import React, { Component } from 'react';

class SubCrad extends Component {
    state = {
       imgPhoGra : [],
       imgPhoGra2 : {} 
    }
    componentDidMount(){
        // console.log(this.props.PhotoGrapher)
        this.setState({
            imgPhoGra : this.props.photographer.PhotoGrapher,
            imgPhoGra2 : this.props.photographer.PhotoGrapher
        })
        console.log(this.state.imgPhoGra)
        console.log(this.state.imgPhoGra2)

    }

    render() {
        return (
            <div>
                {/* {this.props.photographer.map((item) =>
                    <label>
                        {item.Name}
                    </label>
                )
                } */}

            </div>

        );
    }
}

export default SubCrad;