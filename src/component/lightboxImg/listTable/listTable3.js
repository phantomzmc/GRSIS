import React from 'react';
import { Table,Button } from 'reactstrap';

class ListTable3 extends React.Component {
    render() {
        return (
            <div xs="12" sm="12" md="12">
                <Table hover>
                    <thead>
                        <tr>
                            <td>จำนวน</td>
                            <td>รายละเอียด</td>
                            <td>ขนาด</td>
                            <td>ราคา</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>ภาพพร้อมกรอบตั้งโต๊ะ</td>
                            <td>
                                <Button outline color="primary">S</Button>
                            </td>
                            <td>350.00 บาท</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>ภาพพร้อมกรอบลอยเคลือบฟิล์ม</td>
                            <td>
                            <Button outline color="primary">M</Button>

                            </td>
                            <td>450.00 บาท</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>ภาพพร้อมกรอบลอยเคลือบฟิล์ม</td>
                            <td>
                            <Button outline color="primary">L</Button>

                            </td>
                            <td>600.00 บาท</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>ภาพพร้อมกรอบลอยเคลือบฟิล์ม</td>
                            <td> 
                                <Button outline color="primary">XL</Button>
                            </td>
                            <td>750.00 บาท</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>ภาพพร้อมกรอบลอยเคลือบฟิล์ม</td>
                            <td>
                            <Button outline color="primary">XXL</Button>

                            </td>
                            <td>900.00 บาท</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>ภาพพร้อมกรอบลอยเคลือบฟิล์ม</td>
                            <td>
                            <Button outline color="primary">XXXL</Button>

                            </td>
                            <td>900.00 บาท</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListTable3