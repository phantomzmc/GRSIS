import React, { Component } from 'react'
import { Icon, Image, Table, Button } from 'semantic-ui-react';
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
        if (this.props.order.invoice === "") {
            this.sumPriceBuy()
        }
        else if (this.props.order.invoice !== "") {
            console.log(dataPrice)
            console.log(dataCart)
        }
    }

    componentWillReceiveProps(prevProps) {
        const { refersh, nav_refersh } = this.props;
        if ((prevProps.refersh !== refersh) || (prevProps.nav_refersh !== nav_refersh)) {
            console.log(refersh)
            console.log(prevProps.dataCart)
        }
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
    cancelOrder() {
        dataCart.splice(0, dataCart.length)
        dataPrice.splice(1, 0)
        this.setState({ listview: false })
        setTimeout(() => {
            this.props.addImage(dataCart)
            this.props.setTotalPrice(0)
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
            this.sendQuantity()
        }, 100)
    }
    disQuantityItem = (i) => {
        if (parseInt(dataCart[i].Quantity) > 1) {
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
                this.sendQuantity()
            }, 100)
        }
        else {
            console.log(parseInt(dataCart[i].Quantity))
        }

    }
    sumQuantity() {
        const add = (a, b) => a + b
        const sum = dataQuantity.reduce(add)
        this.setState({ quantity: sum })
        this.props.setQuantity(sum)
        console.log(sum)
    }
    sendQuantity() {
        console.log(this.props.order.quantity)
        this.props.onSentQuantity(this.props.order.quantity)
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
                            {/* {dataCart.length === 0 ? */}
                            {this.props.order.quantity === 0 ?
                                <Table.Row negative>
                                    <Table.Cell textAlign='center' colSpan='6'>
                                        <h3 style={{ padding: 20 }}>ยังไม่มีรายการสั่งซื้อ</h3>
                                    </Table.Cell>
                                </Table.Row>
                                :
                                dataCart.map((dynamicData, i) =>
                                    <Table.Row>
                                        <Table.Cell textAlign='center'>
                                            <div className="icon-del">
                                                {this.props.statusBtn &&
                                                    <Button size='tiny' color="red" onClick={() => this.deleteItem(i)} icon>
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
                                                <p textAlign="center">Size : {dynamicData.Size}<br /> Price : {dynamicData.PriceDisplay} </p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            {this.props.statusBtn === true ?
                                                <div className="quantity">
                                                    {this.props.statusBtn &&
                                                        <Button size='mini' color='black' onClick={() => this.addQuantityItem(i)} icon> + </Button>
                                                    }
                                                    <p textAlign='center'>{dynamicData.Quantity}</p>
                                                    {this.props.statusBtn &&
                                                        <Button size='mini' color='black' onClick={() => this.disQuantityItem(i)} icon> - </Button>
                                                    }
                                                </div>
                                                :
                                                <div className="quantity2">
                                                    <p textAlign='center'>{dynamicData.Quantity}</p>
                                                </div>
                                            }

                                        </Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            {parseFloat(dynamicData.Price).toFixed(1)} บาท
                                    </Table.Cell>
                                    </Table.Row>
                                )

                            }

                        </Table.Body>
                        {this.props.statusButton &&
                            <Table.Footer fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='6'>
                                        <Button inverted color='red' onClick={this.props.onCancel()} className="btn-prev">
                                            <p>ยกเลิกรายการทั้งหมด</p>
                                        </Button>
                                        <Button inverted color='green' onClick={this.props.onGotoStepper()} className="btn-next">
                                            <p>ไปชำระค่าบริการ</p>
                                        </Button>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        }
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
                type: "setQuantity",
                payload: quantity
            })
        },
        addImage: (image) => {
            dispatch({
                type: "addImage",
                payload: image
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartImages)