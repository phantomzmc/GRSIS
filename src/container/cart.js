import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../css/cart.css'


class CartImages extends Component {
    render() {
        return (
            <div>
                <h1>รายการสั่งซื้อทั้งหมด</h1>
                <Table>
                    <thead className="table-head">
                        <tr>
                            <th>ลำดับ</th>
                            <th>ภาพ</th>
                            <th>รายละเอียด</th>
                            <th>จำนวน</th>
                            <th>ทั้งหมด</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.cartImage.image.map((dynamicData, i=1) =>
                                <tr>
                                    {/* <th scope="row"></th> */}
                                    <td>{i}</td>
                                    <td className="image-in-cart">
                                        <Image src={dynamicData} width="150" />
                                    </td>
                                    <td>Digital File .JPG</td>
                                    <td>1</td>
                                    <td>100.00 บาท</td>
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