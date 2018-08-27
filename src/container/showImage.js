import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../css/home.css';
import { connect } from 'react-redux'
import Navbar from '../component/nav/nav'
import VdoHeader from '../component/header/header'
import SearchEvent from '../component/search/search'
import TabsControl from '../component/tabs/tabs'
import ImageGrid from '../component/imageGrid/image-grid';
import Pagenation from '../component/pagenation/pagenation'
import LigthBoxImage from '../component/lightboxImg/lightbox'
import Footer from '../component/footer/footer'

class ShowImageEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titleSearch: "BIB Number",
        }
    }
    sendIdPhotogra(id) {
        var id = id
        console.log(id)
        this.setState({ photograid: id, showimage: false })
        this.props.setPhotoGraID(id)
    }
    render() {
        return (
            <div className="App">
                <div className="nav-bar">
                    <Navbar />
                </div>
                {/* <header className="App-header"></header> */}
                <VdoHeader />
                <Container>
                    <Row>
                        <Col xs="12" sm="12" md="12">
                            <div className="content-container">
                                <SearchEvent
                                    title={this.state.titleSearch}
                                    text1="Search "
                                    text2=" BIB Number"
                                />
                            </div>
                        </Col>
                        <Col xs="12" sm="12" md="12">
                            <div className="event-container">
                                <h2>รูปภาพ <b>รายการวิ่ง</b></h2>
                                <hr className="hr-style1" />
                                <hr className="hr-style2" />
                                <div className="">
                                    <TabsControl
                                        namePhotoGra={JSON.parse(this.props.event.event.PhotoGrapher)}
                                        photograID={this.sendIdPhotogra.bind(this)}
                                    />
                                </div>
                                <div className="event-card">
                                    <ImageGrid
                                        photograID={this.state.photograid}
                                        showimage={this.state.showimage}
                                    />
                                </div>
                                {/* <div>
                                    <Pagenation />
                                </div> */}
                                {/* <div>
                                    <LigthBoxImage />
                                </div> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
                <footer className="footer">
                    <Footer />
                </footer>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowImageEvent);
