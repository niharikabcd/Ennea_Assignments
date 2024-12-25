import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const Nav = styled.nav`
  background-color: #f8f9fa;
  padding: 10px;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 0 10px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;

  &.active {
    font-weight: bold;
  }

  &:hover {
    color: #007bff;
  }
`;
//Using React Router for seamless Navigation
const Header = () => {
  return (
    <Nav>
      <List>
        <ListItem>
          <StyledNavLink exact to='/'>
            <b>Tech Courses</b>
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to='/admin_login'>
            Admin
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to='/s_signup'>
            Student Signup
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to='/s_login'>
            Student Login
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to='/studentprofile'>
            Student Profile
          </StyledNavLink>
        </ListItem>
      </List>
    </Nav>
  );
}

export default Header;