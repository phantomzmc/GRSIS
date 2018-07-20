import React from 'react';
import { Table, Button,Input } from 'reactstrap';

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
                            <td>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </td>
                            <td>ภาพพร้อมกรอบตั้งโต๊ะ</td>
                            <td>
                                <Button outline color="primary">S</Button>
                            </td>
                            <td>350.00 บาท</td>
                        </tr>
                        <tr>
                            <td>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </td>
                            <td>ภาพพร้อมกรอบลอยเคลือบฟิล์ม</td>
                            <td>
                                <Button outline color="primary">M</Button>

                            </td>
                            <td>450.00 บาท</td>
                        </tr>
                        <tr>
                            <td>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </td>
                            <td>ภาพพร้อมกรอบลอยเคลือบฟิล์ม</td>
                            <td>
                                <Button outline color="primary">L</Button>

                            </td>
                            <td>600.00 บาท</td>
                        </tr>
                        
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListTable3