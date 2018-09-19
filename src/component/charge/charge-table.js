import React, { Component } from 'react'
import { Table, Col, Row } from 'reactstrap';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ImageResponsive from 'react-image-responsive';
import dataCart from '../../data/dataCart'

import './charge-table.css'

class CartImages extends Component {
    render() {
        return (
            <div className="contai-view">
                <Row>
                    <Col xs="12" sm="12">
                        <Row id="contai-list-head">
                            <Col sm="3"> ลำดับ </Col>
                            <Col sm="3"> รายละเอียด </Col>
                            <Col sm="3"> จำนวน </Col>
                            <Col sm="3"> ราคา </Col>
                        </Row>

                        {
                            dataCart.length != 0 ?
                                dataCart.map((item,i) =>
                                    <div>
                                        <Row id="contai-list">
                                            <Col sm="3"> {i} </Col>
                                            <Col sm="3"> {item.Detail} {item.Size}</Col>
                                            <Col sm="3"> {item.Quantity} </Col>
                                            <Col sm="3"> {item.Price} </Col>
                                        </Row>
                                        <hr />
                                    </div>
                                )
                                :
                                <Row>
                                    <Col id="not-item">
                                        <h5>ยังไม่มีรายการที่สั่งซื้อ</h5>
                                    </Col>
                                </Row>

                        }
                    </Col>
                </Row>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        cartImage: state.cartImage
    }
}

export default connect(mapStateToProps)(CartImages)