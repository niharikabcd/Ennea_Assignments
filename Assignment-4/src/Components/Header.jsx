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
  color: #333;

  &.active {
    font-weight: bold;
    color: hotpink
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
            Home
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to='/fitmelip'>
            Lipliner
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to='/Blush'>
            Blush
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to='/foundation'>
            Foundation
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to='/eyeshadow'>
            EyeShadow
          </StyledNavLink>
        </ListItem>
      </List>
    </Nav>
  );
}

export default Header;
