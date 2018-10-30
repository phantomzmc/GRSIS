import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'reactstrap'
import { Icon, Button } from "semantic-ui-react";
import './pagenation.css'


class Pagenation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNo: 0
        }
    }
    componentDidMount() {
        this.setState({
            pageNo: 1
        })
    }
    nextPage = () => {
        const page = this.state.pageNo + 1
        if (this.state.pageNo < this.props.totalPage) {
            this.props.numPage(page)
            this.setState({ pageNo: page })
        }
        else if (this.state.pageNo >= this.props.totalPage) {
            this.setState({ pageNo: this.props.totalPage })
        }
    }
    prePage = () => {
        const page = this.state.pageNo - 1
        if (this.state.pageNo > 1) {
            this.props.numPage(page)
            this.setState({ pageNo: page })
            console.log(this.state.pageNo)
        }
        else if (this.state.page <= 1) {
            this.setState({ pageNo: 1 })
        }

    }
    handleChange = (e) => {
        const page = e.target.value
        this.props.numPage(page)
        this.setState({ pageNo: page })
    }

    render() {

        return (
            <div className="pagination">
                <div>
                    {this.state.pageNo === 1 ?
                        <Button color='orange' disabled >
                            <Icon name="backward" />
                        </Button> :
                        <Button color='orange' onClick={() => this.prePage()}>
                            <Icon name="backward" />
                        </Button>
                    }
                </div>
                <p className="textPage">หน้า</p>
                <div className="input-page">
                    <Form>
                        <Input
                            className="style-inputPage"
                            value={this.state.pageNo}
                            onChange={this.handleChange.bind(this)}
                        />
                    </Form>
                </div>
                <p className="textPage">จากหน้าที่</p>
                <p className="textPage">{this.props.totalPage}</p>
                <div>
                    {this.state.pageNo === this.props.totalPage ?
                        <Button color='orange' disabled>
                            <Icon name="forward" />
                        </Button> :
                        <Button color='orange' onClick={() => this.nextPage()}>
                            <Icon name="forward" />
                        </Button>
                    }
                </div>
            </div>
        )

    }
}

export default Pagenation;