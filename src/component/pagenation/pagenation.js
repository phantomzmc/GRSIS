import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap'
import { Icon } from "semantic-ui-react";
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
        this.props.numPage(page)
        this.setState({ pageNo: page })

    }
    handleChange = (e) => {
        const page = e.target.value
        this.props.numPage(page)
        this.setState({ pageNo: page })
    }
    prePage = () => {
        const page = this.state.pageNo - 1
        this.props.numPage(page)
        this.setState({ pageNo: page })
        console.log(this.state.pageNo)
    }
    render() {

        return (
            <div className="pagination">
                <div>
                    {this.state.pageNo == 1 ?
                        <Button className="btn-page" disabled>
                            <Icon name="backward" />
                        </Button> :
                        <div className="btn-page">
                            <Button
                                className="btn-page"
                                onClick={() => this.prePage()}>
                                <Icon name="backward" />
                            </Button>
                        </div>
                    }
                </div>
                <label className="textPage">หน้า</label>
                <div className="input-page">
                    <form>
                        <input
                            className="style-inputPage"
                            value={this.state.pageNo}
                            onChange={this.handleChange.bind(this)}
                        />
                    </form>
                </div>
                <label className="textPage">จากหน้าที่</label>
                <div>
                    {this.state.pageNo == 0 ?
                        <Button className="btn-page" disabled>
                            <Icon name="backward" />
                        </Button> :
                        <div className="btn-page">
                            <Button
                                className="btn-page"
                                onClick={() => this.nextPage()}>
                                <Icon name="forward" />
                            </Button>
                        </div>
                    }
                </div>
            </div>
        )

    }
}

export default Pagenation;