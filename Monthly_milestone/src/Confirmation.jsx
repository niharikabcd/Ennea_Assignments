import React from 'react'
import { Button, Form, Input,Modal,Flex } from 'antd';
import { useLocation } from 'react-router-dom';
import { ExclamationCircleOutlined,UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Confirmation = () => {
  console.log('confirmation is rendering...')
  const loc=useLocation()
  const data = loc.state.data;
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const { confirm } = Modal;
const showConfirm = () => {
  return(
  confirm({
    title: 'Do you Want to Add these items?',
    icon: <ExclamationCircleOutlined />,
    onOk() {
      console.log('OK');
      const formdata=form.getFieldsValue()
      fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id : formdata.id,
          title: formdata.title,
          category : formdata.Category
        })
      })
      .then(res => res.json())
      .then(()=>{
        Modal.success({
          title:'Success',
          content : 'Product added Successfully'
        })
      });
    },
    onCancel() {
      console.log('Cancel');
    },
  }))
};
  return (
    <>
    <Division>
    <h2>Confirmation Page</h2>
    <h4>Click Submit to add the product</h4>
    <Form
      form={form}
      name='Confirmation'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        id: data.id,
        title : data.title,
        Category: data.Category
      }}
    >
      <Form.Item
        label="Id"
        name="id"
        rules={[
          {
            required: true,
            message: 'Please input Valid Id!',
          },
        ]}
      >
        <Input type='number'/>
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input your Title!',
          },
        ]}
        
      >
        <Input />
      </Form.Item>

      <Form.Item 
      name="Category" label="Category"
        rules={[
          {
            required: true,
            message: 'Please input the Category of collection!',
          },
        ]}>
          <Input />
        </Form.Item>
        

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
         <Flex gap="middle" >
        <Button 
        shape='round'
        onClick={showConfirm}
        htmlType="submit"
        icon = {<UploadOutlined />}>
          Submit
        </Button>
        </Flex>
      </Form.Item>
    </Form>
    </Division>
    </>
  );
};

export default Confirmation;
export const Division=styled.div`
  color : royalblue;
  background-color: #b8e1fd;
  padding: 30px;
  border-radius: 30px;
`