import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import { Image, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import dataCart from '../data/dataCart';
import dataOrderList from '../data/dataOrderList'
import '../css/cart.css'


class CartImages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // image: this.props.cartImage.image
            image: [
                {
                    ImageURL: "http://stocks.shutterrunning.com/photos/BB-01/POK%200031.jpg"
                }
            ],
            quantity: 1
        }
    }
    componentDidMount() {
        console.log(dataOrderList)
        console.log(this.state.image)
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
                            dataCart.map((dynamicData, i = 1) =>
                                <tr>
                                    {/* <th scope="row"></th> */}
                                    <td>
                                        <Button color="danger">
                                            <Icon name="cancel" />
                                        </Button>
                                    </td>
                                    <td className="image-in-cart">
                                        <Image src={dynamicData.ImageURL} width="125" height="200" />
                                    </td>
                                    <td className="detail-in-cart">
                                        <div>
                                            <h5>{dynamicData.Detail}</h5>
                                            <p>Size : {dynamicData.Size}<br /> Price : {dynamicData.PriceDisplay} </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="quantity">
                                            <Button onClick={() => this.setState({ quantity: quantity + 1 })}> + </Button>
                                            {this.state.quantity}
                                            <Button onClick={() => this.setState({ quantity: quantity - 1 })}> - </Button>
                                        </div>
                                    </td>
                                    <td>{dynamicData.PriceDisplay}</td>

                                </tr>
                            )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6" >
                                <h4>ยอดชำระทั้งหมด 100.00 บาท</h4>
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