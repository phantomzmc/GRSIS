import React, { Component } from 'react'
import FormCredit from '../../form/form-credit'
import './credit.css'

class CreditPayment extends Component {
    
    render() {
        return (
            <div>
                <h4 className="title">บัตรเครดิตหรือเดบิต</h4>
                <div className="content">
                    <div className="credit-card">
                        <h5 className="text-card">Card Number</h5>
                        <h3 className="text-card">5555 9999 0000 9999</h3>
                        <div className="credit-detail">
                            <div className="credit-detail2">
                                <h5 className="text-card">Expiration</h5>
                                <h3 className="text-card">May 2018</h3>
                            </div>
                            <div className="credit-detail2">
                                <h5 className="text-card">CVC</h5>
                                <h3 className="text-card">123</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <FormCredit />
            </div>
        )
    }
}

export default CreditPayment