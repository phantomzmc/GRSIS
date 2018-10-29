import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Popover, PopoverHeader, PopoverBody, Col, Row } from 'reactstrap';
import { Icon, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import { BrowserRouter, Link, withRouter } from 'react-router-dom'
import Modal from "react-responsive-modal";
import NotificationBadge from 'react-notification-badge';
import Cart from '../../container/cart'
import DetailPayment from '../payment/detailPayment/detailPayment'
import { Effect } from 'react-notification-badge';
import dataCart from '../../data/dataCart'
import dataPrice from '../../data/dataPrice'
import './nav.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      open: false,
      count: 1,
      layoutCart: false,
      cartItem: true,
      listOrder: true
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  componentDidMount() {
    console.log(this.props.quantity)
    // this.setState({ count: this.props.cartImage.counter })
    this.setState({ count: this.props.quantity })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.quantity !== this.props.quantity) {
      console.log("update")
      this.setState({ cartItem: true })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity != this.props.quantity) {
      console.log("จำนวน" + nextProps.quantity)
      console.log("จำนวน" + this.props.quantity)

    }
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.quantity !== nextProps.quantity) {
      console.log("shouldComponentUpdate")
      return true
    }
    return true
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  cancelOrder = () => {
    dataCart.splice(0, dataCart.length)
    dataPrice.splice(0, dataPrice.length)
    this._disCancel()
    this.setState({ listOrder: !this.state.listOrder })
  }
  _disCancel() {
    this.props.addImage(dataCart)
    this.props.addOrderList(dataCart)
    this.props.addOrderlistFull(dataCart)
    this.props.setTotalPrice(0)
    this.props.setQuantity(0)
  }
  onClickPrev() {
    this.props.history.push("/stepcontrol")
  }
  test() {
    console.log(this.props.quantity)
    this.setState({ cartItem: false })
    setTimeout(() => {
      this.setState({ cartItem: true })
    })
  }
  passQuantity(value) {
    this.props.setQuantity(value)
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
              {/* <NavItem>
                <NavLink href="/">รายการวิ่ง</NavLink>
              </NavItem> */}
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
            {this.state.cartItem &&
              <NavItem style={{ padding: "10px" }}>
                {this.props.order.quantity !== 0 ?
                  <div>
                    <NotificationBadge count={this.props.quantity} effect={Effect.SCALE} frameLength={120.0} />
                    <Icon name='shopping cart' size='big' inverted color='white' onClick={() => this.setState({ layoutCart: !this.state.layoutCart })} />
                  </div>
                  :
                  <div>
                    <NotificationBadge count={this.props.quantity} effect={Effect.SCALE} frameLength={120.0} />
                    <Icon name='shopping cart' size='big' inverted color='white' onClick={() => this.setState({ layoutCart: !this.state.layoutCart })} />
                  </div>
                }
              </NavItem>
            }
          </Nav>
        </Navbar>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <Modal open={this.state.layoutCart} onClose={() => this.setState({ layoutCart: false })} center>
              <Cart
                nav_refersh={this.state.listOrder}
                statusButton={true}
                statusBtn={true}
                onCancel={() => this.cancelOrder.bind(this)}
                onGotoStepper={() => this.onClickPrev.bind(this)}
                onSentQuantity={this.passQuantity.bind(this)}
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
    order: state.order.quantity
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addImage: (image) => {
      dispatch({
        type: "addImage",
        payload: image
      })
    },
    addOrderList: (image) => {
      dispatch({
        type: "addOrderList",
        payload: image
      })
    },
    addOrderlistFull: (image) => {
      dispatch({
        type: "addOrderlistFull",
        payload: image
      })
    },
    setTotalPrice: (totalprice) => {
      dispatch({
        type: "setTotalPrice",
        payload: totalprice
      })
    },
    setQuantity: (quantity) => {
      dispatch({
        type: "setQuantity",
        payload: quantity
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))