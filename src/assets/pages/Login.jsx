/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
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
  SignUpPrompt,
} from "./../components/Styles";
import { UserContext } from "./userContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Sign-In Successful:", response.data);
      alert("Sign-In Successful");
      setUserId(response.data.userId);
      navigate("/movie");
    } catch (error) {
      console.error("Sign-In Error:", error.message);
      // alert(error.message);
      console.log(error.message);
      alert("Invalid UserName or Password");
    }
  };

  return (
    <LoginContainer>
      <FormWrapper>
        <FormTitle>Sign In</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
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
          <Button type="submit">Sign In</Button>
        </Form>
        <SignUpPrompt>
          Don't have an account? <Link to="/signUp">Sign Up</Link>
        </SignUpPrompt>
      </FormWrapper>
    </LoginContainer>
  );
};

export default Login;
