import React from 'react';
import styled from 'styled-components';
//styled Components
const FooterWrapper = styled.footer`
  background-color: #fac0c0;
  padding: 20px 0;
  text-align: center;
  font-family: Arial, sans-serif;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #0f0d0d;
  margin: 5px 0;
  font-style: italic;
`;

const FooterLink = styled.a`
  color: #cf079d;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;


const Footer = () => {
  return (
    <FooterWrapper>
      <FooterText>Contact us <FooterLink>makeupproducts@hotmail.com</FooterLink></FooterText>
      <FooterText>You have reached end of the page</FooterText>
    </FooterWrapper>
  );
}

export default Footer;
