/* eslint-disable no-unused-vars */
// import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
  SignUpPrompt,
} from "./../components/Styles";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Confirm Passwords do not match!");
      return;
    }
    console.log(data);

    try {
      await axios.post("http://localhost:3000/api/v1/user/signup", data);
      alert("User Created");
      navigate("/login");
    } catch (error) {
      console.error("Sign-Up Error:", error.response.data);
      alert("Invalid Information");
    }
  };

  return (
    <LoginContainer>
      <FormWrapper>
        <FormTitle>Sign Up</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Name:</Label>
            <Input
              type="string"
              {...register("name", { required: "Email is required" })}
            />
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
          <FormGroup>
            <Label>Confirm Password:</Label>
            <Input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </FormGroup>
          <Button type="submit">Sign Up</Button>
        </Form>
        <SignUpPrompt>
          Already have an account? <Link to="/login">Sign In</Link>
        </SignUpPrompt>
      </FormWrapper>
    </LoginContainer>
  );
};

export default SignUp;
