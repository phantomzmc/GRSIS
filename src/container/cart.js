import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import { Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import dataCart from '../data/dataCart';
import dataOrderList from '../data/dataOrderList'
import dataPrice from '../data/dataPrice'
import Summary from '../component/items/summary'
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
    // testRefreshProps(){
    //     this.setState({ totalPrice : parseInt(this.state.totalPrice) + parseInt(10)})
    //     setTimeout(()=>{
    //         this.testRefreshProps()
    //     },2000)
    // }
    sumPriceBuy() {
        console.log(dataPrice)
        if (dataPrice == "") {
            dataPrice.push(parseFloat(0.0).toFixed(1))
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
            this.setState({ listview: true })
            this.sumPriceBuy()
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
            this.setState({ listview: true })
            this.sumPriceBuy()
            // alert("price : " + dataCart[i].Price, "quantity : " + dataCart[i].Quantity)
        }, 100)
    }
    render() {
        let { quantity } = this.state
        return (
            <div>
                <h2 style={{ fontFamily : 'kanit'}}>รายการสั่งซื้อทั้งหมด</h2>
                {this.state.listview &&
                    <Table responsive>
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
                            {dataCart.length != 0 ?
                                dataCart.map((dynamicData, i) =>
                                    <tr>
                                        {/* <th scope="row"></th> */}
                                        <td>
                                            <div className="icon-del">
                                                <Button color="danger" onClick={() => this.deleteItem(i)}>
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
                                                <Button onClick={() => this.addQuantityItem(i)}> + </Button>
                                                {dynamicData.Quantity}
                                                <Button onClick={() => this.disQuantityItem(i)}> - </Button>
                                            </div>
                                        </td>
                                        <td>{dynamicData.Price} บาท</td>

                                    </tr>
                                )
                                :
                                <tr>
                                    <td colSpan="6">
                                        <h3>ยังไม่มีรายการสั่งซื้อ</h3>
                                    </td>
                                </tr>
                            }

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="6" >
                                    <Summary total={this.state.totalPrice} />
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                }
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        cartImage: state.cartImage,
        order : state.order
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setTotalPrice: (totalPrice) => {
            dispatch({
                type: "setTotalPrice",
                payload: totalPrice
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartImages)