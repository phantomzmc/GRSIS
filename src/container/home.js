import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios'
import { connect } from 'react-redux'
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
  componentDidMount() {
    let data = {
      email: "grs@guurun.com",
      password: "1f5ZIAEbhLg2GF6"
    }
    axios.post("http://api.shutterrunning2014.com/api/v2/user/session", data, {
      headers: {
        "api_key": "36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88",
      },
      responseType: 'json'
    })
      .then((response) => {
        this.setState({ isLoading: false, token: response.data.session_token });
        console.log(this.state.token)
        this.props.setToken(this.state.token)
      }).catch((error) => {
        console.error(error)
      });
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
                  pages={true}
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

const mapDispatchToProps = dispatch => {
  return {
    setToken: (token) => {
      dispatch({
        type: "setToken",
        payload: token
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Home);
