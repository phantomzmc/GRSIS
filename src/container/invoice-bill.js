import React, { Component } from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Container, Row, Col
} from 'reactstrap'; import { Image } from 'semantic-ui-react';
import CartImages from "../container/cart";
import { connect } from "react-redux"
import '../css/invoice-bill.css'


class Invoice extends Component {
    constructor(props) {
        super(props)
        
        let stored = this.props.address.address

        this.state = {
            orderid: this.props.order.invoice.OrderID,
            orderStatus: this.props.order.invoice.OrderStatus == 1 ? "จ่ายแล้ว" : "รอดำเนินการ",
            fullname: stored.fullname,
            email: stored.email,
            address: stored.address,
            soi: stored.street,
            tumpon: stored.tumpon,
            amphoe: stored.amphoe,
            province: stored.province,
            country: stored.country,
            passcode: stored.passcode
        }
    }

    componentWillMount() {

    }

    render() {
        let { address, soi, tumpon, amphoe, province, country, passcode } = this.state
        return (
            <div>
                <div className="content-head">
                    <div classname="head-bill">
                        <div className="logo-head-bill">
                            <Image src="http://shutterrunning.com/assets/img/logos/str-logo-sm.png" size='small' width="100" />
                        </div>
                        <h2 className="text-head-bill">Shutter Running ImageService</h2>
                        <label className="text-head-bill">7 Market Today krungthepkreetra 7 Huamark<br />Bangkapi Bangkok , Thailand 10240</label>
                    </div>
                    <Col>
                        <CardDeck className="card-item">
                            <Card >
                                <CardBody>
                                    <CardSubtitle>
                                        <h4 className="card-date">หมายเลขใบเสร็จ : {this.state.orderid} </h4>
                                    </CardSubtitle>
                                    <CardTitle>
                                        <h2 className="card-title">ใบเสร็จรับเงิน</h2>
                                    </CardTitle>
                                    <CardSubtitle>
                                        <h3 className="card-status-payment">{this.state.orderStatus}</h3>
                                        <h5 className="card-date">ชำระวันที่ 15 มกราคม 2561</h5>
                                    </CardSubtitle>
                                </CardBody>
                                <CardBody>
                                    <div className="card-detail">
                                        <CardSubtitle className="card-sub-detail">
                                            <h5>Fullname :</h5>
                                            <h3>Thunnathorn Yuvasin</h3>
                                        </CardSubtitle>
                                        <CardSubtitle className="card-sub-detail">
                                            <h5>Email : :</h5>
                                            <h3>phantomzmc@gmail.com</h3>
                                        </CardSubtitle>
                                        <CardSubtitle className="card-sub-detail">
                                            <h5>Address :</h5>
                                            <h3>{address} {soi} {tumpon} {amphoe} {province} {country} {passcode}</h3>
                                        </CardSubtitle>
                                    </div>
                                    <div className="">
                                    </div>
                                </CardBody>
                                <CardBody>
                                    <div>
                                        <CartImages />
                                    </div>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </Col>
                </div >
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        order: state.order,
        address: state.address,

    }
}

export default connect(mapStateToProps)(Invoice)