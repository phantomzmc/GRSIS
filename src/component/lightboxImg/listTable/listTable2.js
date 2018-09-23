import React from 'react';
import { Table, Button, Input } from 'reactstrap';

import orderlist from '../../../json/orderlist' //json orderlist
import orderlistFull from '../../../json/orderlistFull'
import dataCart from '../../../data/dataCart'
import dataPrice from '../../../data/dataPrice'

class ListTable2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSouce: "",
            order: {
                quantity: 0,
                buyTyoeID: 0,
                detail: "",
                price: 0,
                priceDisplay: "",
                size: ""
            }
        }
        this.handleClick = this.handleClick.bind(this)
    }

    // componentWillUpdate(nextProps) {
    //     if (nextProps.propertyImg != this.props.propertyImg) {
    //         console.log(nextProps.propertyImg)
    //         setTimeout(() => {
    //             this.setState({ dataSouce: nextProps.propertyImg })
    //             console.log(this.state.dataSouce)
    //         }, 100)
    //         this.setState({ dataSouce: nextProps.propertyImg })
    //         console.log(this.state.dataSouce)
    //     }
    // }
    handleChange(e) {
        this.setState({
            quantity: e.target.value
        })
        setTimeout(() => {
            this.getPrice()
        }, 200)
    }
    getPrice() {
        let { quantity, price } = this.state
        const sumPrice = parseFloat(price * quantity)
        dataPrice.push(sumPrice)
        this.setState({ price: sumPrice })
        console.log("price" + sumPrice)
    }
    handleClick() {
        console.log(orderlist)
        let dataOrder = {
            ImageID: this.props.details.ImageID,
            PropertyBuyImageID: this.state.buyTyoeID,
            Quantity: this.state.quantity
        }
        let dataOrderFull = {
            ImageID: this.props.details.ImageID,
            ImageURL: this.props.details.ImageURL,
            PropertyBuyImageID: this.state.buyTyoeID,
            Quantity: this.state.quantity,
            Detail: this.state.detail,
            Price: this.state.price,
            PriceDisplay: this.state.priceDisplay,
            FormatBuyImageID : this.state.FormatBuyImageID,
            Size: this.state.size
        }
        orderlist.push(dataOrder)
        orderlistFull.push(dataOrderFull)
        dataCart.push(dataOrderFull)
        this.props.nextPage()
    }
    handleArray(item, index) {
        orderlist.ImageID = this.props.details.ImageID
        orderlist.PropertyBuyImageID = item.PropertyBuyImageID
        orderlist.Quantity = this.state.quantity
    }

    render() {
        const { quantity } = this.state
        return (
            <div xs="12" sm="12" md="12">
                {this.props.propertyImg == "" ?
                    <div></div>
                    :
                    <Table hover>
                        <thead>
                            <tr>
                                <td><p>จำนวน</p></td>
                                <td><p>รายละเอียด</p></td>
                                <td><p>ขนาด</p></td>
                                <td><p>ราคา</p></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.propertyImg.map((item, index) =>
                                <tr>
                                    <td>
                                        <Input type="select" name="select" id="exampleSelect"
                                            onChangeCapture={() => this.setState({
                                                buyTyoeID: item.PropertyBuyImageID,
                                                detail: item.Detail,
                                                price: item.Price,
                                                priceDisplay: item.PriceDisplay,
                                                FormatBuyImageID : item.FormatBuyImageID,
                                                size: item.Size
                                            })}
                                            // onChangeCapture={() => this.handleArray(item, index)}
                                            onChange={this.handleChange.bind(this)}
                                        >
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Input>
                                    </td>
                                    <td><p>{item.Detail}</p></td>
                                    <td>
                                        {/* <Button outline color="primary">S</Button> */}
                                        <p>{item.Size}</p>
                                    </td>
                                    <td><p>{item.PriceDisplay}</p></td>
                                </tr>
                            )
                            }
                        </tbody>
                    </Table>
                }
                <Button block color="success" onClick={() => this.handleClick()}>
                    <p>สั่งซื้อภาพนี้</p>
                </Button>
            </div>
        );
    }
}

export default ListTable2