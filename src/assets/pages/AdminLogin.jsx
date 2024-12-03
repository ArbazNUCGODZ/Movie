// import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  LoginContainer,
  FormWrapper,
  FormTitle,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  Button,
} from "./../components/Styles";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/v1/user/admin-login", data);
      navigate("/allTicket");

      // Navigate to admin dashboard or another protected route
    } catch (error) {
      console.error("Admin Login Error:", error.response.data);
      alert("Tu Admin He, Teri Aukat He");
    }
  };

  return (
    <LoginContainer>
      <FormWrapper>
        <FormTitle>Admin Login</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Username:</Label>
            <Input
              type="text"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </FormGroup>
          <Button type="submit">Login</Button>
        </Form>
      </FormWrapper>
    </LoginContainer>
  );
};

export default AdminLogin;
