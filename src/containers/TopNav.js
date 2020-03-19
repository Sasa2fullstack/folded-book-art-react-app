import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Form
} from 'reactstrap';
import { Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { history } from 'store/configure';
import logo from 'static/img/fba-logo.svg';
import imgHome from 'static/img/home.svg';
import imgSilh from 'static/img/silhouette.svg';
import imgSet from 'static/img/settings.svg';
import imgHelp from 'static/img/help.svg';
import imgPlus from 'static/img/newpatternplus.svg';

const menuData = [
  { name: 'Patterns', icon: imgHome, link: '/' },
  { name: 'Sihouette Library', icon: imgSilh, link: '/silhouette-library' },
  { name: 'Settings', icon: imgSet, link: '/settings' },
  { name: 'Help', icon: imgHelp, link: '/help' }
];
class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curMenuLink: '/'
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle(tabLink) {
    this.setState({ curMenuLink: tabLink });
    history.push(tabLink);
  }
  render() {
    const { curMenuLink } = this.state;
    const navItemData = menuData.map((menu, idx) => {
      let className = '';
      if (curMenuLink === menu.link) {
        className += ' active';
      }
      return (
        <NavItem key={idx}>
          <NavLink
            onClick={() => {
              this.toggle(menu.link);
            }}
            className={className}
          >
            <div style={{ minWidth: '60px' }}>
              <img src={menu.icon} className="svg-icon" align="left" />
              {menu.name.toUpperCase()}
            </div>
          </NavLink>
        </NavItem>
      );
    });
    return (
      <Navbar expand="md" style={{ height: '76px', backgroundColor: '#353535' }}>
        {/* <Link to="/"> */}
        <img
          src={logo}
          style={{
            cursor: 'pointer'
          }}
          alt="logo"
          onClick={() => {
            this.toggle('/');
          }}
        />
        {/* </Link> */}

        <Nav>
          {/* <NavItem>
            <Form>
              <input type="text" id="algolia-doc-search" style={{ width: '216px' }} />
            </Form>
          </NavItem> */}
          <NavItem>
            <Button
              color="primary"
              size="sm"
              onClick={() => {
                this.toggle('/pattern-type');
              }}
            >
              <img src={imgPlus} className="svg-icon" />
              New Pattern
            </Button>
          </NavItem>
          {navItemData}
        </Nav>
      </Navbar>
    );
  }
}

export default TopNav;
