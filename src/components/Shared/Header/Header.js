import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { StyledNavLink } from './styles';


const Header = () => {


  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Infuri<b>Rating</b></Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <StyledNavLink to="/" exact>Home</StyledNavLink>
            <StyledNavLink to="/controlpanel" exact>Control Panel</StyledNavLink>
            <StyledNavLink to="/scenarios" exact>Scenarios</StyledNavLink>
            <StyledNavLink to="/categories" exact>Categories</StyledNavLink>
            <StyledNavLink to="/about"> About</StyledNavLink>
          </Nav>

          <Nav><Nav.Link href="#deets">Log off</Nav.Link></Nav>
        </Navbar.Collapse>
      </Navbar>


    </React.Fragment>
  );
}

export default Header;
