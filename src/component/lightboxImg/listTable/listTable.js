import React from 'react';
import { Table, Button ,Input} from 'reactstrap';

class ListTable1 extends React.Component {
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
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </td>
                            <td>ไฟล์ภาพนามสกุล .PNG</td>
                            <td><Button outline color="primary">S</Button><Button outline color="success">M</Button></td>
                            <td>100.00 บาท</td>
                        </tr>

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ListTable1