import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Popover, PopoverHeader, PopoverBody, Col, Row } from 'reactstrap';
import { Icon, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import NotificationBadge from 'react-notification-badge';
import Cart from '../../container/cart'
import DetailPayment from '../payment/detailPayment/detailPayment'
import { Effect } from 'react-notification-badge';
import dataCart from '../../data/dataCart'
import './nav.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      open: false,
      count: 1,
      layoutCart: false
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  componentDidMount() {
    console.log(this.props.order.quantity)
    // this.setState({ count: this.props.cartImage.counter })
    this.setState({ count : this.props.order.quantity})
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.count != this.props.order.quantity) {
      console.log("update")
      this.setState({ count: this.props.order.quantity })
    }
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div className="nav-container">
        <Navbar color="fade" dark>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">หน้าแรก</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">รายการวิ่ง</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="http://guurun.com/">โปรแกรมวิ่ง</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="http://shutterrunning2014.com/">สมัครวิ่ง</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <NavbarBrand href="/" className="mr-auto">shutterruning <b>imageService</b></NavbarBrand>
          <Nav pullRight>

            <NavItem style={{ padding: "10px" }}>
              <div>
                <NotificationBadge count={this.props.order.quantity} effect={Effect.SCALE} frameLength={120.0} />
                <Icon name='shopping cart' size='big' inverted color='white' onClick={() => this.setState({ layoutCart: !this.state.layoutCart })} />
              </div>
              {/* <Popup
                trigger={<Icon name='shopping cart' size='big' inverted color='white' />}
                content={<CartImage />}
                basic
              /> */}

            </NavItem>
          </Nav>
        </Navbar>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <Modal open={this.state.layoutCart} onClose={() => this.setState({ layoutCart: false })} center>
              <Cart 
                statusBtn={true}
              />
            </Modal>
          </Col>
        </Row>

      </div >
    );
  }
}
const mapStateToProps = state => {
  return {
    cartImage: state.cartImage,
    order : state.order
  }
}

export default connect(mapStateToProps)(NavBar)