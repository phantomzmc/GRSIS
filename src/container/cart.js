import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import { Image, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import '../css/cart.css'


class CartImages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // image: this.props.cartImage.image
            image: [{
                ImageURL: "http://stocks.shutterrunning.com/photos/BB-01/POK%200031.jpg"
            }]
        }
    }
    componentDidMount() {
        console.log(this.state.image)
    }
    render() {
        let { image } = this.state
        return (
            <div>
                <h1>รายการสั่งซื้อทั้งหมด</h1>
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
                            image.map((dynamicData, i = 1) =>
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
                                            <h5>Digital File .JPG</h5>
                                            <p>Size : ไฟล์ต้นฉบับ <br /> Price : 100.00 ฿ </p>
                                        </div>
                                    </td>
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