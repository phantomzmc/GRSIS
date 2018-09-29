import React, { Component } from 'react'
import FormCredit from '../../form/form-credit'
import './credit.css'

class CreditPayment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardnumber: "5454 xxxx xxxx 1234",
            monthEXp: "xx",
            yearExp: "xxxx",
            name: "NAME FONT CARD",
            cvc: "xxx"
        }
    }
    setCreditCard(data) {
        console.log(data)
        this.setState({
            cardnumber: data.cardNumber,
            monthEXp: data.expMonth,
            yearExp: data.expYear,
            name: data.name,
            cvc: data.passCVC
        })
    }

    render() {
        return (
            <div>
                <h3 className="title">บัตรเครดิตหรือเดบิต</h3>
                <div className="content">
                    <div className="credit-card">
                        {/* <div className="priceDisplay">
                            <h4 className="text-card">Price : .....</h4>
                        </div> */}
                        <div className="head-credit">
                            <h5 className="text-card">Card Number</h5>
                            <h3 className="text-card">{this.state.cardnumber}</h3>
                            <h5 className="text-card">Name</h5>
                            <h3 className="text-card">{this.state.name}</h3>
                        </div>
                        <div className="credit-detail">
                            <div className="credit-detail2">
                                <p className="text-card">Expiration</p>
                                <div className="credit-detail3">
                                    <h4 className="text-card">{this.state.monthEXp}</h4>
                                    <h4 className="text-card"> / </h4>
                                    <h4 className="text-card">{this.state.yearExp}</h4>
                                </div>
                            </div>
                            <div className="credit-detail2">
                                <p className="text-card">CVC</p>
                                <h4 className="text-card">{this.state.cvc}</h4>
                            </div>
                            <div id="logo">
                                <img src="https://www.eidesissolutions.com/wp-content/uploads/2018/03/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png" width="100px" height="50px" />
                            </div>
                        </div>
                    </div>
                </div>
                <FormCredit
                    onNextPage={this.props.onNextPages}
                    onsetCreditCard={this.setCreditCard.bind(this)}
                    onAddOrder={this.props.addOrder}
                />
            </div>
        )
    }
}


export default CreditPayment