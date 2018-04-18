import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


import logo from './logo.svg';
import './App.css';

import Navbar from '../src/component/nav/nav'
import VdoHeader from '../src/component/header/header'
import SearchEvent from '../src/component/search/search'
import CardEvents from '../src/component/card/card';

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
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
