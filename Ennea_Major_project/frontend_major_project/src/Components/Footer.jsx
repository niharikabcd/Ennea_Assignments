import React from 'react';
import styled from 'styled-components';
import Icon, { CopyrightOutlined,TwitterOutlined,YoutubeOutlined,InstagramOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
//styled Components
const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
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
    <Row>
    <Col span={8}>
    <FooterText>Contact us <FooterLink>techcourses@hotmail.com</FooterLink></FooterText>
    </Col>
    <Col span={8}> 
      <FooterText><CopyrightOutlined/> 2024 Tech Courses</FooterText>
      </Col>
      <Col span ={8}>
      <FooterText>Follow us on :</FooterText>
      <FooterText>
        <TwitterOutlined /> <YoutubeOutlined /> <InstagramOutlined />
      </FooterText>
     </Col>
      </Row>
      </FooterWrapper>

  );
}

export default Footer;