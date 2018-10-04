import React, { Component } from 'react'
import axios from 'axios'

class Test extends Component {
    componentDidMount() {
        var dataString = {
            'amount': '100000',
            'currency': 'thb',
            'card': "tokn_test_5dh28jevhm4mj1e8vuf"
        }
        var options = {
            url: 'https://api.omise.co/charges',
            method: 'POST',
            body: dataString,
            auth: {
                'user': 'skey_test_5b7nwwrac7mvps7l3mp',
            }
        };
        fetch('https://api.omise.co/charges',{
            method: 'POST',
            body: dataString,
            auth: {
                'user': 'skey_test_5b7nwwrac7mvps7l3mp',
            },
        }).then((response) => {
            if (response.ok && response.status === 200) {
                console.log(response)
                // response.json();
            } else {
                console.log("response not ok", response);
                // response.json();
            }
        }).catch((error) => {
            console.error(error)
        })
        // axios.post(options)
        //     .then((response) => {
        //         this.setState({ dataSource: response.data });
        //         console.log(this.state.dataSource)
        //     }).catch((error) => {
        //         console.error(error)
        //     });
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Test