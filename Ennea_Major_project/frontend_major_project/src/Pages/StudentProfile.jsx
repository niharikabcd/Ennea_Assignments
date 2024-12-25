import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { Button, List, Card, message, Descriptions } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// Styled Components
const ProfileContainer = styled.div`
  max-width: 2000px;
  margin: 2rem auto;
  padding: 1rem;
  background: #f0f2f5;
  border-radius: 8px;
`;

const Header = styled.h2`
  text-align: center;
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

// API Calls using Fetch API
const fetchProfileData = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token available.");
  }

  const response = await fetch("http://localhost:8080/profile/fetchprofiledetails", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    if(response.json().error ==="Invalid token or unauthorized access"){
        throw new Error("only for logged in students");
    }
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch profile data.");
  }

  return response.json();
};

const cancelEnrollment = async (courseId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:8080/courses/delete-enrollment/${courseId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to cancel enrollment.");
  }
};

const StudentProfile = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  
    // Fetching Profile Data from dto
    const { data: profile, isLoading, error } = useQuery({
      queryKey: ["studentProfile"],
      queryFn: fetchProfileData,
      onError: (err) => {
        if (err.message === "Unauthorized") {
          localStorage.removeItem("token");
          message.error("Session expired. Please log in again.");
          navigate("/s_login"); // Redirect to login page
        } else {
          message.error(err.message);
        }
      },
    });
  
    // Cancel Enrollment Mutation
    const { mutate: cancelCourse } = useMutation({
      mutationFn: cancelEnrollment,
      onSuccess: () => {
        message.success("Enrollment canceled successfully.");
        queryClient.invalidateQueries(["studentProfile"]);
      },
      onError: () => {
        message.error("Failed to cancel enrollment.");
      },
    });
  
    // Handle Logout
    const handleLogout = () => {
      localStorage.removeItem("token");
      message.success("Logged out successfully.");
      navigate("/s_login"); // Redirect to login page
    };
    if (isLoading) {
      return <p>Loading the page...</p>;
    }
    if (error) {
        if(error.message=="No token available."){
           return <p>Please login as a student to view this page</p> ;
        }
      return <p>Error: {error.message}</p>;
    }
  
    // Checking if profile is empty or error
    if (!profile || profile.error) {
      return (
        <ProfileContainer>
          <Header>Student Profile</Header>
          <Card>
            <p>{profile?.error || "No profile data available."}</p>
          </Card>
          <LogoutButton icon={<LogoutOutlined />} onClick={handleLogout}>
            Log Out
          </LogoutButton>
        </ProfileContainer>
      );
    }
  
    return (
      <ProfileContainer>
        <Header>Student Profile</Header>
  
        <Card title="Profile Details" style={{ marginBottom: "1rem" }}>
          <Descriptions bordered>
            <Descriptions.Item label="FullName" span={3}>
              {profile.fullName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={3}>
              {profile.email || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Discipline" span={3}>
              {profile.discipline || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="College">
              {profile.college || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
  
        <Card title="Enrolled Courses">
          <List
            dataSource={profile.enrolledCourses || []} 
            renderItem={(course) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    danger
                    onClick={() => cancelCourse(course.id)}
                  >
                    Cancel Enrollment
                  </Button>,
                ]}
              >
                <List.Item.Meta title={course.title} description={course.shortIntro} />
              </List.Item>
            )}
          />
          {(!profile.enrolledCourses || profile.enrolledCourses.length === 0) && (
            <p>No courses enrolled.</p>
          )}
        </Card>
  
        <LogoutButton icon={<LogoutOutlined />} onClick={handleLogout}>
          Log Out
        </LogoutButton>
      </ProfileContainer>
    );
  };

export default StudentProfile;