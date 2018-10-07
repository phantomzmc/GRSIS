import React from 'react';
import { Button, Input ,Alert} from 'reactstrap';
import { Table } from 'semantic-ui-react'

import orderlist from '../../../json/orderlist' //json orderlist
import orderlistFull from '../../../json/orderlistFull'
import dataCart from '../../../data/dataCart'
import dataPrice from '../../../data/dataPrice'
import dataQuantity from '../../../data/dataQuantity'
import './listTable.css'

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
                size: "",
                // status : 2
            }
        }
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount(){
        console.log(this.props.propertyImg[0])
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
        this.props.setPostPrice(this.props.postPrice)

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
            FormatBuyImageID: this.state.FormatBuyImageID,
            Size: this.state.size
        }
        dataQuantity.push(parseInt(this.state.quantity))
        orderlist.push(dataOrder)
        orderlistFull.push(dataOrderFull)
        dataCart.push(dataOrderFull)
        this.props.nextPage()
        this.props.sumQuantity()

    }
    handleArray(item, index) {
        orderlist.ImageID = this.props.details.ImageID
        orderlist.PropertyBuyImageID = item.PropertyBuyImageID
        orderlist.Quantity = this.state.quantity
    }

    render() {
        return (
            <div xs="12" sm="12" md="12">
                {this.props.propertyImg === "" ?
                    <div></div>
                    :
                    <Table color="orange" key="orange" size="large">
                        <Table.Header>
                            <Table.Row textAlign='center' >
                                <Table.HeaderCell>จำนวน</Table.HeaderCell>
                                <Table.HeaderCell>รายละเอียด</Table.HeaderCell>
                                <Table.HeaderCell>ขนาด</Table.HeaderCell>
                                <Table.HeaderCell>ราคา</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        {this.props.propertyImg[0].Price !== -1 ?
                            <Table.Body>
                                {
                                    this.props.propertyImg.map((item, index) =>

                                        <Table.Row>
                                            <Table.Cell textAlign='center'>
                                                <Input type="select" name="select" id="exampleSelect"
                                                    onChangeCapture={() => this.setState({
                                                        buyTyoeID: item.PropertyBuyImageID,
                                                        detail: item.Detail,
                                                        price: item.Price,
                                                        priceDisplay: item.PriceDisplay,
                                                        FormatBuyImageID: item.FormatBuyImageID,
                                                        size: item.Size

                                                    })}
                                                    onChange={this.handleChange.bind(this)}
                                                >
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </Input>
                                            </Table.Cell>
                                            <Table.Cell textAlign='center'>
                                                <p>{item.Detail}</p>
                                            </Table.Cell>
                                            <Table.Cell textAlign='center'>
                                                <p>{item.Size}</p>
                                            </Table.Cell>
                                            <Table.Cell textAlign='center'>
                                                <p>{item.PriceDisplay}</p>
                                            </Table.Cell>

                                        </Table.Row>
                                    )}
                            </Table.Body>
                            :
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell colSpan="4">
                                        <div className="choice-contai">
                                            <Alert color="danger">
                                                <p>รายการวิ่งนี้ไม่มีการขายภาพอย่างเดียว</p>
                                            </Alert>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        }
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