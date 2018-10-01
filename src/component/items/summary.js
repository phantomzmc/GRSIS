import React, { Component } from 'react';
import { Container, Row, Col, Table } from "reactstrap";
import './summary.css'

class Summary extends Component {

    render() {
        return (
                <Table dark>
                    <tbody>
                        <tr>
                            <td>
                                <span>ยอดชำระทั้งหมด </span>
                            </td>
                            <td>
                                <span> {this.props.total} บาท</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>ค่าจัดส่ง</span>
                            </td>
                            <td><span> {this.props.total} บาท</span></td>
                        </tr>
                        <tr>
                            <td>
                                <span>ค่าธรรมเนียมการใช้บัตรเครดิต/เดบิต </span>
                            </td>
                            <td>
                                <span> {this.props.total} บาท</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>ยอดชำระทั้งหมด</span>
                            </td>
                            <td>
                                <span> {this.props.total} บาท</span>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                /* <Row>
                    <Col xs={9} sm={9} md={9}>
                        <span>ยอดชำระทั้งหมด </span>
                    </Col>
                    <Col xs={3} sm={3} md={3}>
                        <span> {this.props.total} บาท</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={9} sm={9} md={9}>
                        <span>ค่าจัดส่ง </span>
                    </Col>
                    <Col xs={3} sm={3} md={3}>
                        <span> {this.props.total} บาท</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={9} sm={9} md={9}>
                        <span>ค่าธรรมเนียมการใช้บัตรเครดิต/เดบิต </span>
                    </Col>
                    <Col xs={3} sm={3} md={3}>
                        <span> {this.props.total} บาท</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={9} sm={9} md={9}>
                        <span>ยอดชำระทั้งหมด </span>
                    </Col>
                    <Col xs={3} sm={3} md={3}>
                        <span> {this.props.total} บาท</span>
                    </Col>
                </Row> */
        );
    }
}

export default Summary;