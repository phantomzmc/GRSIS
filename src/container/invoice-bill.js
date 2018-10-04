import React, { Component } from 'react'
import {
    Card, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Container, Row, Col, CardFooter
} from 'reactstrap';
import { Image, Table, Header, Icon, Button } from 'semantic-ui-react';
import CartImages from "../container/cart";
import { connect } from "react-redux"
import dataPrice from '../data/dataPrice'
import '../css/invoice-bill.css'


class Invoice extends Component {
    constructor(props) {
        super(props)

        let stored = this.props.address.address

        this.state = {
            // orderid: this.props.order.invoice.OrderID == "" || undefined ? "เกิดข้อผิดพลาด" : this.props.order.invoice.OrderID,
            // orderStatus: this.props.order.invoice.OrderStatus == 1 ? "จ่ายแล้ว" : "รอดำเนินการ",
            fullname: stored.fullname == "" || undefined ? "" : stored.fullname,
            email: stored.email == "" || undefined ? "" : stored.email,
            address: stored.address == "" || undefined ? "" : stored.address,
            soi: stored.street == "" || undefined ? "" : stored.street,
            tumpon: stored.tumpon == "" || undefined ? "" : stored.tumpon,
            amphoe: stored.amphoe == "" || undefined ? "" : stored.amphoe,
            province: stored.province == "" || undefined ? "" : stored.province,
            country: stored.country == "" || undefined ? "" : stored.country,
            passcode: stored.passcode == "" || undefined ? "" : stored.passcode,
            tel: stored.tel == "" || undefined ? "" : stored.tel,
            // date: new Date
        }
    }

    componentWillMount() {

    }
    print() {
        var content = document.getElementById('printarea');
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    render() {
        let { address, soi, tumpon, amphoe, province, country, passcode } = this.state
        return (
            <div>
                <div className="content-head">
                    <div classname="head-bill">
                        <div className="logo-head-bill">
                            <Image src="http://shutterrunning.com/assets/img/logos/str-logo-sm.png" size='tiny' />
                        </div>
                        <Header as='h1' className="text-head-bill">Shutter Running ImageService</Header>
                        <Header as='h6' className="text-head-bill">7 Market Today krungthepkreetra 7 Huamark<br />Bangkapi Bangkok , Thailand 10240</Header>
                    </div>
                    <Col>
                        <CardDeck className="card-item">
                            <Card >
                                <CardBody>
                                    <CardSubtitle>
                                        <h4 className="card-date">หมายเลขใบเสร็จ : {this.props.order.invoice.OrderID} </h4>
                                    </CardSubtitle>
                                    <CardTitle>
                                        <h2 className="card-title">ใบเสร็จการชำระเงิน</h2>
                                    </CardTitle>
                                </CardBody>
                                <CardBody>
                                    <CardBody>
                                        <Container>
                                            <Row>
                                                <Col xs={12} sm={6} md={6}>
                                                    <Table celled>
                                                        <Table.Body>
                                                            {this.props.payment.statusPayment == 2 ?
                                                                <Table.Row positive>
                                                                    <Table.Cell>สถานะ</Table.Cell>
                                                                    <Table.Cell>จ่ายแล้ว</Table.Cell>
                                                                </Table.Row>
                                                                :
                                                                <Table.Row negative>
                                                                    <Table.Cell>สถานะ</Table.Cell>
                                                                    <Table.Cell>รอการตรวจสอบ</Table.Cell>
                                                                </Table.Row>
                                                            }
                                                            <Table.Row >
                                                                <Table.Cell>วันที่ออกใบเสร็จ</Table.Cell>
                                                                <Table.Cell className="card-date">ชำระวันที่ </Table.Cell>
                                                            </Table.Row>
                                                            <Table.Row>
                                                                <Table.Cell>จำนวน</Table.Cell>
                                                                <Table.Cell>{dataPrice.length}</Table.Cell>
                                                            </Table.Row>
                                                            <Table.Row>
                                                                <Table.Cell>รูปแบบการชำระเงิน</Table.Cell>
                                                                {this.props.payment.type == 1 ?
                                                                    <Table.Cell>Credit/Debit</Table.Cell> :
                                                                    <Table.Cell>ATM Tranfer</Table.Cell>
                                                                }
                                                            </Table.Row>
                                                            <Table.Row active>
                                                                <Table.Cell>รวมทั้งสิ้น</Table.Cell>
                                                                <Table.Cell>{this.props.order.totalPrice} บาท</Table.Cell>
                                                            </Table.Row>
                                                        </Table.Body>
                                                    </Table>
                                                </Col>
                                                <Col xs={12} sm={6} md={6}>
                                                    <div className="card-detail2">
                                                        <CardSubtitle className="card-sub-detail">
                                                            <Header as='h5'>
                                                                <Icon name="user" />
                                                                <Header.Content>Fullname : {this.state.fullname}</Header.Content>
                                                            </Header>
                                                            <Header as='h5'>
                                                                <Icon name="mail" />
                                                                <Header.Content>Email : {this.state.email}</Header.Content>
                                                            </Header>
                                                            <Header as='h5'>
                                                                <Icon name="map marker alternate" />
                                                                <Header.Content>Address : {address} {soi} {tumpon} {amphoe} {province} {country} {passcode}</Header.Content>
                                                            </Header>
                                                            <Header as='h5'>
                                                                <Icon name="call" />
                                                                <Header.Content>Tel : {this.state.tel}</Header.Content>
                                                            </Header>
                                                        </CardSubtitle>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </CardBody>
                                </CardBody>
                                <CardBody>
                                    <div>
                                        <CartImages
                                            statusBtn={false}
                                        />
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <CardBody>
                                        <Table>
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell textAlign="center">หมายเหตุ : </Table.Cell>
                                                    <Table.Cell>1. ไฟล์ภาพจะจัดส่งทันที ที่ตรวจสอบการชำระเงินเรียบร้อย กรุณาตรวจสอบใน Junk หรือ Spam mail</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell></Table.Cell>
                                                    <Table.Cell>2. รูปอย่างเดียวจะจัดส่งทุกวันศุกร์สำหรับออเดอร์ที่สั่งซื้อภายในวันพุธ</Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell></Table.Cell>
                                                    <Table.Cell>3. รูปภาพพร้อมกรอบจะใช้เวลาประมาณ 25 วันโดยประมาณ เสร็จเรียบร้อยจะจัดส่งทางไปรษณีย์</Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </CardBody>
                                    <CardBody>
                                        <div className="footer-contai">
                                            <div className="save-file">
                                                <Button color='green' onClick={() => window.print()}>
                                                    <Icon name="print" /> <p>พิมพ์เอกสาร</p>
                                                </Button>
                                                <Button color='green'>
                                                    <Icon name="download" /> <p>ดาวน์โหลด</p>
                                                </Button>
                                            </div>
                                            <Button color='red'>
                                                <p>ปิดหน้านี้</p>
                                            </Button>
                                        </div>
                                    </CardBody>
                                </CardFooter>
                            </Card>
                        </CardDeck>
                    </Col>
                </div >
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        order: state.order,
        address: state.address,
        payment: state.payment
    }
}

export default connect(mapStateToProps)(Invoice)