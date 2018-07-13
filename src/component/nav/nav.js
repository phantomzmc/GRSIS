import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import NotificationBadge from 'react-notification-badge';
import CartImage from '../../container/cart'
import { Effect } from 'react-notification-badge';
import './nav.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      open: false,
      count: 1
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  componentDidMount() {
    console.log(this.props.cartImage.counter)
    this.setState({ count: this.props.cartImage.counter })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.count != this.props.cartImage.counter) {
      console.log("update")
      this.setState({ count: this.props.cartImage.counter })
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
                <NavLink href="/components/">หน้าแรก</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">รายการวิ่ง</NavLink>
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
                <NotificationBadge count={this.state.count} effect={Effect.SCALE} frameLength={120.0} />
              </div>
              <Icon name='shopping cart' size='big' inverted color='white' />
            </NavItem>
          </Nav>
        </Navbar>
      </div >
    );
  }
}
const mapStateToProps = state => {
  return {
    cartImage: state.cartImage
  }
}

export default connect(mapStateToProps)(NavBar)