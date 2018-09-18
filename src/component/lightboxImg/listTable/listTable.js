import React from 'react';
import { Table, Button, Input } from 'reactstrap';

import orderlist from '../../../json/orderlist' //json orderlist
import orderlistFull from '../../../json/orderlistFull'
import './listTable.css'

class ListTable1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSouce: "",
            quantity: 0,
            index: 0
        }
    }
    componentWillUpdate(nextProps) {
        if (nextProps.propertyImg != this.props.propertyImg) {
            console.log(nextProps.propertyImg)
            setTimeout(() => {
                this.setState({ dataSouce: nextProps.propertyImg })
                console.log(this.state.dataSouce)
            }, 100)
            this.setState({ dataSouce: nextProps.propertyImg })
            console.log(this.state.dataSouce)
        }
    }
    handleChange(e) {
        this.setState({
            quantity: e.target.value
        })
    }
    handleClick() {
        const { index } = this.state
        console.log(this.props.details)
        let dataOrder = {
            ImageID: this.props.details.ImageID,
            PropertyBuyImageID: this.state.dataSouce[index].PropertyBuyImageID,
            Quantity: this.state.quantity
        }
        let dataOrderFull = {
            ImageID: this.props.details.ImageID,
            ImageURL: this.props.details.ImageURL,
            PropertyBuyImageID: this.state.dataSouce[index].PropertyBuyImageID,
            Quantity: this.state.quantity
        }
        orderlist.push(dataOrder)
        orderlistFull.push(dataOrderFull)
        console.log(orderlist)
        this.props.nextPage()
    }
    render() {
        const { index } = this.state
        return (
            <div xs="12" sm="12" md="12">
                {this.state.dataSouce == "" ?
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
                            {
                                this.state.dataSouce.map((item, index) =>
                                    <tr>
                                        <td>
                                            <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange.bind(this)} value={this.state.quantity}>
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

export default ListTable1