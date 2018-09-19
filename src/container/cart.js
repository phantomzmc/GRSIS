import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import { Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import dataCart from '../data/dataCart';
import dataOrderList from '../data/dataOrderList'
import dataPrice from '../data/dataPrice'
import ImageResponsive from 'react-image-responsive';

import '../css/cart.css'


class CartImages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalPrice : 0.00
        }
    }
    componentDidMount() {
        this.sumPriceBuy()
        console.log(dataPrice)
        console.log(this.state.image)
    }
    sumPriceBuy() {
        const add = (a, b) => a + b;
        const sum = dataPrice.reduce(add)
        this.setState({ totalPrice: parseFloat(sum).toFixed(2) })
    }
    render() {
        let { quantity } = this.state
        return (
            <div>
                <h2>รายการสั่งซื้อทั้งหมด</h2>
                <Table>
                    <thead className="table-head">
                        <tr>
                            <th></th>
                            <th>ภาพ</th>
                            <th>รายละเอียด</th>
                            <th>จำนวน</th>
                            <th>ทั้งหมด</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataCart.map((dynamicData, i = 0) =>
                                <tr>
                                    {/* <th scope="row"></th> */}
                                    <td>
                                        <div className="icon-del">
                                            <Button color="danger">
                                                <Icon name="cancel" />
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="image-in-cart">
                                            <Image src={dynamicData.ImageURL} className="img-buy" />
                                        </div>
                                    </td>
                                    <td className="detail-in-cart">
                                        <div>
                                            <h5>{dynamicData.Detail}</h5>
                                            <p>Size : {dynamicData.Size}<br /> Price : {dynamicData.PriceDisplay} </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="quantity">
                                            <Button onClick={() => this.setState({ quantity: dynamicData.Quantity + 1 })}> + </Button>
                                            {dynamicData.Quantity}
                                            <Button onClick={() => this.setState({ quantity: dynamicData.Quantity - 1 })}> - </Button>
                                        </div>
                                    </td>
                                    <td>{dynamicData.Price} บาท</td>

                                </tr>
                            )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6" >
                                <h4>ยอดชำระทั้งหมด {this.state.totalPrice} บาท</h4>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
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