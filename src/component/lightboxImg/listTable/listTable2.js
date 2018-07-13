import React from 'react';
import { Table, Button, Input } from 'reactstrap';

class ListTable2 extends React.Component {
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
                            <td>ภาพอย่างเดียว</td>
                            <td>
                                <Button outline color="primary">S</Button>
                            </td>
                            <td>80.00 บาท</td>
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
                            <td>ภาพอย่างเดียว</td>
                            <td>
                                <Button outline color="primary">M</Button>
                            </td>
                            <td>80.00 บาท</td>
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
                            <td>ภาพอย่างเดียว (เลือบพลาสติก)</td>
                            <td>
                                <Button outline color="primary">S</Button>
                            </td>
                            <td>100.00 บาท</td>
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
                            <td>ภาพอย่างเดียว</td>
                            <td>
                                <Button outline color="primary">L</Button>
                            </td>
                            <td>400.00 บาท</td>
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
                            <td>ภาพอย่างเดียว</td>
                            <td><Button outline color="primary">XL</Button></td>
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
                            <td>ภาพอย่างเดียว (เลือบพลาสติก)</td>
                            <td><Button outline color="primary">XXL</Button></td>
                            <td>500.00 บาท</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListTable2