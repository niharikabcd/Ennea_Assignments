import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, message } from 'antd';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode'; 

// Styled Components
const Container = styled.div`
  max-width: 2000px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #1890ff;
`;

const Welcome=styled.h1`
  text-shadow: center;
  color:blueviolet;
`

// Fetch Courses Function
const fetchCourses = async () => {
  const response = await fetch('http://localhost:8080/courses/fetchcourses');
  if (!response.ok) throw new Error('Failed to fetch courses');
  return response.json();
};

// Enroll in Course Function
const enrollInCourse = async (courseId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:8080/courses/enroll/${courseId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(response.text().message);

  const data = await response.text();
  return data.message; 
};

const CoursePage = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');
  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      const isExpired = Date.now() >= decoded.exp * 1000;
      if (isExpired) {
        message.error('Session expired. Please log in again.');
        localStorage.removeItem('token');
        role = null;
      }
    } catch (err) {
      console.error('Invalid token', err);
      role = null;
    }
  }

 
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const mutation = useMutation({
    mutationFn: enrollInCourse,
    onSuccess: (messageText) => {
      message.success(messageText || 'Successfully enrolled in course!');
      queryClient.invalidateQueries(['courses']);
    },
    onError: (error) => {
      console.error('Enrollment Failed:', error.message);
      message.error(error.message || 'Failed to enroll in course');
    },
  });

  const handleEnroll = (courseId) => {
    if (!token || role !== 'Student') {
      message.warning('Only students can enroll in courses.');
      return;
    }
    mutation.mutate(courseId);
  };

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Failed to load courses.</p>;

  const columns = [
    {
      title: 'Course Title',
      dataIndex: 'title', 
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'shortIntro', 
      key: 'shortIntro',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Instructors',
      dataIndex: 'instructors',
      key: 'instructors',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleEnroll(record.id)}
          disabled={role !== 'Student'}
        >
          Enroll
        </Button>
      ),
    },
  ];

  return (
    <>
    <Welcome>Welcome to Tech Courses</Welcome>
    <Container>
      <Title>Available Courses</Title>
      {isLoading && <p>Loading courses...</p>}
      {error && <p>Failed to load courses.</p>}
      {!isLoading && !error && (
        <Table
          columns={columns}
          dataSource={courses}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      )}
    </Container>
    </>
  );
};

export default CoursePage;
