import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../css/home.css';
import { connect } from 'react-redux'
import Navbar from '../component/nav/nav'
import VdoHeader from '../component/header/header'
import SearchEvent from '../component/search/search'
import TabsControl from '../component/tabs/tabs'
import ImageGrid from '../component/imageGrid/image-grid';
import { BrowserRouter, Link, withRouter } from 'react-router-dom'
import Pagenation from '../component/pagenation/pagenation'
import LigthBoxImage from '../component/lightboxImg/lightbox'
import Footer from '../component/footer/footer'

class ShowImageEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleSearch: "BIB Number",
            bib: "",
            time: "",
            imagegrid: true,
            photograname: "",
            statusPhotoname: false
        }
    }
    componentWillMount() {
        if (this.props.event.event.PhotoGrapher === "") {
            this.props.history.push("/")
        }
        else if (this.props.event.event.PhotoGrapher !== "") {
            this.setState({ photograname: JSON.parse(this.props.event.event.PhotoGrapher), statusPhotoname: true })
        }
    }
    sendIdPhotogra(id) {
        var id = id
        console.log(id)
        this.setState({ photograid: id, showimage: false })
        this.props.setPhotoGraID(id)
    }
    sendNamePhotogra(name) {
        var name = name
        console.log(name)
        this.setState({ photograname: name, showimage: false })
    }
    setValueBib(value, type) {
        if (type == 1) {
            this.setState({ bib: value, time: "", imagegrid: true })
            console.log(value)
        }
        else if (type == 2) {
            this.setState({ time: value, bib: "", imagegrid: true })
            console.log(value)
        }
    }
    render() {
        return (
            <div className="App">
                <div className="nav-bar">
                    <Navbar />
                </div>
                {/* <header className="App-header"></header> */}
                <Container>
                    <VdoHeader />
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <div className="content-container">
                                <SearchEvent
                                    title={this.state.titleSearch}
                                    text1="Search "
                                    text2=" BIB Number"
                                    pages={false}
                                    getValueBib={this.setValueBib.bind(this)}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Row>
                    <Col xs="12" sm="12" md="12">
                        <div className="img-event-container">
                            <h2>รูปภาพ <b>รายการวิ่ง</b></h2>
                            <hr className="hr-style1" />
                            <hr className="hr-style2" />
                            <div className="">
                                {this.state.statusPhotoname &&
                                    < TabsControl
                                        namePhotoGra={this.state.photograname}
                                        photograID={this.sendIdPhotogra.bind(this)}
                                        photograName={this.sendNamePhotogra.bind(this)}
                                    />
                                }
                            </div>
                            <div id="show-image">
                                {this.state.imagegrid &&
                                    <ImageGrid
                                        photograID={this.state.photograid}
                                        photograName={this.state.photograname}
                                        showimage={this.state.showimage}
                                        searchBib={this.state.bib}
                                        searchTime={this.state.time}
                                    />
                                }
                            </div>

                        </div>
                    </Col>
                </Row>
                <footer className="footer">
                    <Footer />
                </footer>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        event: state.event
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPhotoGraID: (photograID) => {
            dispatch({
                type: "setPhotoGraID",
                payload: photograID
            })
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowImageEvent));
