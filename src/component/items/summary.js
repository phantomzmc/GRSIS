import React, { Component } from 'react';

class Summary extends Component {

    render() {
        return (
            <div>
                <h4>ยอดชำระทั้งหมด {this.props.total} บาท</h4>
            </div>
        );
    }
}

export default Summary;