import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;
function Login() {
  const loc = useLocation();
  const ndata = loc.state?.data || {}; 
  const navigate=useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.text(); 
      if (data.includes('.') && data.split('.').length === 3) {
        // Check if the response looks like a JWT token (3 parts separated by dots)
        localStorage.setItem('token', data);
        console.log(data)
        message.success('Login successful!');
        navigate("/")
      } else {
        throw new Error(data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledContainer>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        email: ndata.email || '', // Provided fallback value
        password: ndata.password || '', // Provided fallback value
      }}
    >
      <Form.Item
        label="Student Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    </StyledContainer>
  );
}

export default Login;
