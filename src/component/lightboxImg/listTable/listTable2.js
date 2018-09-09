import React from 'react';
import { Table, Button, Input } from 'reactstrap';

class ListTable2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSouce: ""
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
    render() {
        return (
            <div xs="12" sm="12" md="12">
                {this.state.dataSouce == "" ?
                    <div></div>
                    :
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
                            {this.state.dataSouce.map((item, index) =>
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
                                    <td>{item.Detail}</td>
                                    <td>
                                        {/* <Button outline color="primary">S</Button> */}
                                        {item.Size}
                                    </td>
                                    <td>{item.PriceDisplay}</td>
                                </tr>
                            )
                            }
                        </tbody>
                    </Table>
                }

            </div>
        );
    }
}

export default ListTable2