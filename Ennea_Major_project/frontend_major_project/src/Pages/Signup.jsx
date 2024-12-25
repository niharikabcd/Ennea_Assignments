import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
`;

function Signup() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
      const formdata=form.getFieldsValue()
      fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname : formdata.fullname,
          email : formdata.email,
          password : formdata.password,
          discipline : formdata.discipline,
          college : formdata.college
        })
      })
      .then(res => res.json())
      .then((res)=>{
        alert(res.message);
        if(res.message == "Signup Successful") {
          navigate("/s_login", { state: { data : values } });
        } 
      });
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      return (
        
        <StyledContainer>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="FullName"
            name="fullname"
            rules={[
              {
                required: true,
                message: 'Please input your FullName!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
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
            label="Discipline"
            name="discipline"
            rules={[
              {
                required: true,
                message: 'Please input your Discipline!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="College"
            name="college"
            rules={[
              {
                required: true,
                message: 'Please input your College Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        </StyledContainer>
      );
}

export default Signup