import React, { Component } from 'react'
// import { Table, Button, Container } from 'reactstrap';
import { Icon, Image, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import dataCart from '../../../data/dataCart';
import dataOrderList from '../../../data/dataOrderList'
import dataPrice from '../../../data/dataPrice'
import './detailPayment.css'

class DetailPayment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalPrice: this.props.order.totalPrice,
            creditCharge : this.props.order.credit,
            pricePost : this.props.order.pricePost,
            listview: true
        }
    }
    componentWillMount() {
        console.log(dataCart)
    }

    render() {
        return (
            <div className="contai-table">
                <Table color="orange" key="orange">
                    <Table.Header>
                        <Table.Row textAlign='center' >
                            <Table.HeaderCell colSpan='3'>สรุปการสั่งซื้อทั้งหมด</Table.HeaderCell> 
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {dataCart.map((dynamicData, i) =>

                        <Table.Row>
                            <Table.Cell>{dynamicData.Detail} {dynamicData.Size}</Table.Cell>
                            <Table.Cell> - </Table.Cell>
                            <Table.Cell>{dynamicData.Price} บาท</Table.Cell>
                        </Table.Row>
                    )}
                        <Table.Row positive>
                            <Table.Cell>ค่าจัดส่ง</Table.Cell>
                            <Table.Cell> - </Table.Cell>
                            <Table.Cell textAlign='right'>{this.state.pricePost} บาท</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>ค่าธรรมเนียมการใช้บัตรเครดิต/เดบิต</Table.Cell>
                            <Table.Cell> - </Table.Cell>
                            <Table.Cell textAlign='right'>{this.state.creditCharge} บาท</Table.Cell>
                        </Table.Row>
                        <Table.Row active>
                            <Table.Cell>ยอดชำระทั้งหมด</Table.Cell>
                            <Table.Cell> - </Table.Cell>
                            <Table.Cell textAlign='right'>{this.state.totalPrice} บาท</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        order: state.order
    }
}

export default connect(mapStateToProps)(DetailPayment);