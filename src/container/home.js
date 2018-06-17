import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../css/home.css';

import Navbar from '../component/nav/nav'
import VdoHeader from '../component/header/header'
import SearchEvent from '../component/search/search'
import CardEvents from '../component/card/card';
import Pagenation from '../component/pagenation/pagenation'
import Footer from '../component/footer/footer'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleSearch: "ค้นหารายการวิ่ง",
      text1: "Shutter Running ",
      text2: " ImageSevice"
    }
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
                  text1={this.state.text1}
                  text2={this.state.text2}
                />
              </div>
            </Col>
            <Col xs="12" sm="12" md="12">
              <div className="event-container">
                <h2>Events <b>Running</b></h2>
                <hr className="hr-style1" />
                <hr className="hr-style2" />
                <div className="event-card">
                  <CardEvents />
                </div>
                <div>
                  <Pagenation />
                </div>
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

export default Home;
