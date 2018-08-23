import React, { Component } from 'react';

class SubCrad extends Component {
    state = {
       imgPhoGra : [],
       imgPhoGra2 : {} 
    }
    componentDidMount(){
        console.log(this.props.photographer)
        

    }

    render() {
        return (
            <div>
                {this.props.photographer.map((item) =>
                    <label>
                        {item.Name}
                    </label>
                )
                }

            </div>

        );
    }
}

export default SubCrad;