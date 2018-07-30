import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios'
import './App.css';
import Navbar from '../src/component/nav/nav'
import VdoHeader from '../src/component/header/header'
import SearchEvent from '../src/component/search/search'
import CardEvents from '../src/component/card/card';
import Pagenation from '../src/component/pagenation/pagenation'
import Footer from '../src/component/footer/footer'

class App extends Component {
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
                <SearchEvent />
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

export default App;
