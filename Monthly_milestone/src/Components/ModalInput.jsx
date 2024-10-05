import { Button, Form, Input, Modal } from 'antd';
import React, { useState,memo } from 'react';
import { useContext } from 'react';
import { NewItemContext } from '../NewItemContext';
import { useNavigate } from "react-router-dom";
const CollectionCreateForm = memo(({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item 
        hasFeedback
        name="id"
        label='Id'
        rules={[
          {
            required: true,
            message: 'Please input the Id of collection!',
          },
        ]}
         >
          <Input type='number'/>
        </Form.Item>
        <Form.Item
          hasFeedback
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
        hasFeedback
        name="Category" label="Category"
        rules={[
          {
            required: true,
            message: 'Please input the Category of collection!',
          },
        ]}>
          <Input />
        </Form.Item>
        
      </Form>
      <Button
        onClick={() => {
            form.resetFields();
            }}
      >
          Clear
      </Button>
    </Modal>
  );
});
const ModalInput = () => {
  console.log('modal input is rendering..')
  const [open, setOpen] = useState(false);
  const {setNewItem}=useContext(NewItemContext);
  const navigate = useNavigate();
  const onCreate = (values) => {
    setNewItem(values)
    navigate("/dashboard", { state: { data : values } });
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
export default memo(ModalInput);