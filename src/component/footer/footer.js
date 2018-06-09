import React, { Component } from 'react'
import { Container, Row, Col } from "reactstrap";
import { Icon, Image } from 'semantic-ui-react'
import './footer.css'

class Footer extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs="12" sm="4">
                            <div className="logo">
                                <Image src='http://shutterrunning.com/assets/img/guurun-logo.png' className="guurun-logo" />
                                <Image src='http://shutterrunning.com/assets/img/i-bitz-logo.png' className="i-bitz-logo" />
                            </div>
                        </Col>
                        <Col xs="12" sm="4" text-center>
                            <Icon circular name='facebook' size='large' inverted color='white' />
                            <Icon circular name='instagram' size='large' inverted color='white' />
                            <Icon circular name='twitter' size='large' inverted color='white' />
                        </Col>
                        <Col className="copyright" xs="12" sm="4" text-rigth>
                            <p className="text-copyrigth">©copyrights Shutter Running Images Service v1.2.5</p>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}

export default Footer