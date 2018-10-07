import React, { Component } from 'react'
import { Icon, Image, Table,Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import dataCart from '../data/dataCart';
import dataPrice from '../data/dataPrice'
import dataQuantity from '../data/dataQuantity'
import '../css/cart.css'

class CartImages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalPrice: this.props.order.totalPrice,
            listview: true
        }
    }
    componentDidMount() {
        this.sumPriceBuy()
        console.log(dataPrice)
        console.log(dataCart)
    }
    
    sumPriceBuy() {
        console.log(dataPrice)
        if (dataPrice == "") {
        }
        else {
            const add = (a, b) => a + b;
            const sum = dataPrice.reduce(add)
            this.setState({ totalPrice: parseFloat(sum).toFixed(2) })
            this.props.setTotalPrice(parseInt(sum))
        }
    }
    deleteItem(index) {
        this.sumPriceBuy()
        dataCart.splice(index, 1)
        dataPrice.splice(index, 1)
        this.setState({ listview: false })
        setTimeout(() => {
            this.sumPriceBuy()
            this.setState({ listview: true })
        })
    }
    addQuantityItem = (i) => {
        const quantity = parseInt(dataCart[i].Quantity) + 1
        const fixPrice = parseInt(dataCart[i].PriceDisplay)
        setTimeout(() => {
            const priceItem = parseInt(dataCart[i].Price) + fixPrice
            dataCart[i].Price = parseFloat(priceItem).toFixed(1)
            dataCart[i].Quantity = quantity
            dataPrice[i] = priceItem
            dataQuantity[i] = quantity
            this.setState({ listview: true })
            this.sumPriceBuy()
            this.sumQuantity()
        }, 100)
    }
    disQuantityItem = (i) => {
        const quantity = parseInt(dataCart[i].Quantity) - 1
        const fixPrice = parseInt(dataCart[i].PriceDisplay)
        setTimeout(() => {
            const priceItem = parseInt(dataCart[i].Price) - fixPrice
            dataCart[i].Price = parseFloat(priceItem).toFixed(1)
            dataCart[i].Quantity = quantity
            dataPrice[i] = priceItem
            dataQuantity[i] = quantity
            this.setState({ listview: true })
            this.sumPriceBuy()
            this.sumQuantity()
        }, 100)
    }
    sumQuantity() {
        const add = (a, b) => a + b
        const sum = dataQuantity.reduce(add)
        this.setState({ quantity: sum })
        this.props.setQuantity(sum)
        console.log(sum)
    }
    render() {
        let { quantity } = this.state
        return (
            <div>
                <h3 style={{ fontFamily: 'kanit' }}>รายการสั่งซื้อทั้งหมด</h3>
                {this.state.listview &&
                    <Table color="orange" key="orange">
                        <Table.Header>
                            <Table.Row textAlign='center' >
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>ภาพ</Table.HeaderCell>
                                <Table.HeaderCell>รายละเอียด</Table.HeaderCell>
                                <Table.HeaderCell>จำนวน</Table.HeaderCell>
                                <Table.HeaderCell textAlign='right'>ทั้งหมด</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {dataCart.length != 0 ?
                                dataCart.map((dynamicData, i) =>

                                    <Table.Row>
                                        <Table.Cell textAlign='center'>
                                            <div className="icon-del">
                                                {this.props.statusBtn &&
                                                    <Button size='tiny'color="red" onClick={() => this.deleteItem(i)} icon>
                                                        <Icon name="cancel" />
                                                    </Button>
                                                }
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <div className="image-in-cart">
                                                <Image src={dynamicData.ImageURL} className="img-buy" />
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <div>
                                                <h5>{dynamicData.Detail}</h5>
                                                <p>Size : {dynamicData.Size}<br /> Price : {dynamicData.PriceDisplay} </p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <div className="quantity">
                                                {this.props.statusBtn &&
                                                    <Button size='mini' color='black' onClick={() => this.addQuantityItem(i)} icon> + </Button>
                                                }
                                                <p>{dynamicData.Quantity}</p>
                                                {this.props.statusBtn &&
                                                    <Button size='mini' color='black' onClick={() => this.disQuantityItem(i)} icon> - </Button>
                                                }
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            {dynamicData.Price} บาท
                                    </Table.Cell>
                                    </Table.Row>
                                )
                                :
                                <Table.Row negative>
                                    <Table.Cell textAlign='center' colSpan='6'>
                                        <h3 style={{ padding: 20 }}>ยังไม่มีรายการสั่งซื้อ</h3>
                                    </Table.Cell>

                                </Table.Row>
                            }

                        </Table.Body>
                    </Table>
                }
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        cartImage: state.cartImage,
        order: state.order
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTotalPrice: (totalPrice) => {
            dispatch({
                type: "setTotalPrice",
                payload: totalPrice
            })
        },
        setQuantity: (quantity) => {
            dispatch({
                type : "setQuantity",
                payload : quantity
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartImages)