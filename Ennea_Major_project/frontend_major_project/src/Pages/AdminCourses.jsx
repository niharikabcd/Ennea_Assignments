import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Button, Table, Modal, Form, Input, message, Popconfirm } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  background: #f0f2f5;
  border-radius: 8px;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const LogoutButton = styled(Button)`
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
  background-color: #f5222d;
  color: white;
  &:hover {
    background-color: #d32029;
  }
`;

const AdminCourses = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [form] = Form.useForm(); 
  const navigate = useNavigate();

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/courses/fetchcourses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch courses.");
      }
      return response.json();
    },
    onError: () => {
      message.error("Failed to fetch courses.");
    },
  });

  const { mutate: addNewCourse } = useMutation({
    mutationFn: async (course) => {
      const response = await fetch("http://localhost:8080/courses/addCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(course),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        throw new Error("Failed to add course.");
      }
    },
    onSuccess: () => {
      message.success("Course added successfully.");
      queryClient.invalidateQueries(["courses"]);
      setIsModalOpen(false);
    },
    onError: () => {
      message.error("Failed to add course.");
    },
  });

  const { mutate: updateCourse } = useMutation({
    mutationFn: async ({ id, course }) => {
      const response = await fetch(`http://localhost:8080/courses/editCourse/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(course),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        throw new Error("Failed to edit course.");
      }
    },
    onSuccess: () => {
      message.success("Course updated successfully.");
      queryClient.invalidateQueries(["courses"]);
      setIsModalOpen(false);
    },
    onError: (err) => {
      console.log(err.message);
      message.error("Failed to update course.");
    },
  });

  const { mutate: removeCourse } = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`http://localhost:8080/courses/deleteCourse/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete course.");
      }
    },
    onSuccess: () => {
      message.success("Course deleted successfully.");
      queryClient.invalidateQueries(["courses"]);
    },
    onError: () => {
      message.error("Failed to delete course.");
    },
  });

  const handleFormSubmit = (values) => {
    console.log("Form values:", values);
    if (editingCourse) {
      updateCourse({ id: editingCourse.id, course: values });
    } else {
      const existingIds = courses.map(course => course.id);
    console.log(existingIds);
    console.log(existingIds.includes(Number(values.id)));
    if (existingIds.includes(Number(values.id))) {
    message.error("A course with this ID already exists.");
    return;
    }
      addNewCourse(values);
    }
  };

  const openModal = (course) => {
    if (course) {
      setEditingCourse(course);
      form.setFieldsValue(course); // Set form values with course data
    } else {
      setEditingCourse(null);
      form.resetFields(); // Clear form for adding a new course
    }
    setIsModalOpen(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out successfully.");
    navigate("/admin_login"); // Redirect to login page
  };
  if (isLoading) {
    return <p>Loading courses...</p>;
  }

  return (
    <AdminContainer>
      <Header>Admin - Manage Courses</Header>

      <Modal
        title={editingCourse ? "Edit Course" : "Add Course"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="id"
            label="Course ID"
            rules={[{ required: true, message: "Please enter the course ID." }]}
          >
            <Input type='number' disabled={!!editingCourse}/>
          </Form.Item>
          <Form.Item
            name="title"
            label="Course Title"
            rules={[{ required: true, message: "Please enter the course title." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="shortIntro" label="Short Introduction">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="category"
            label="Course Category"
            rules={[{ required: true, message: "Please enter the course category." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="subCategory" label="Sub-Category">
            <Input />
          </Form.Item>
          <Form.Item name="courseType" label="Course Type">
            <Input />
          </Form.Item>
          <Form.Item name="language" label="Language">
            <Input />
          </Form.Item>
          <Form.Item name="subtitleLanguages" label="Subtitle Languages">
            <Input />
          </Form.Item>
          <Form.Item name="skills" label="Skills">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="instructors" label="Instructors">
            <Input />
          </Form.Item>
          <Form.Item name="duration" label="Duration">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            {editingCourse ? "Update Course" : "Add Course"}
          </Button>
        </Form>
      </Modal>

      <Table
        dataSource={courses}
        rowKey="id"
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Course Title",
            dataIndex: "title",
            key: "title",
          },
          { title: "Category", dataIndex: "category", key: "category" },
          { title: "Sub-Category", dataIndex: "subCategory", key: "subCategory" },
          { title: "Course Type", dataIndex: "courseType", key: "courseType" },
          { title: "Language", dataIndex: "language", key: "language" },
          { title: "Instructors", dataIndex: "instructors", key: "instructors" },
          { title: "Duration", dataIndex: "duration", key: "duration" },
          {
            title: "Actions",
            key: "actions",
            render: (_, course) => (
              <>
                <Button type="link" onClick={() => openModal(course)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this course?"
                  onConfirm={() => removeCourse(course.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </>
            ),
          },
        ]}
      />

      <Button type="primary" style={{ marginTop: "1rem" }} onClick={() => openModal(null)}>
        Add Course
      </Button>
      <LogoutButton icon={<LogoutOutlined />} onClick={handleLogout}>
          Log Out
        </LogoutButton>
    </AdminContainer>
    
  );
};

export default AdminCourses;
