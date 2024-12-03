import styled from "styled-components";

export const LoginContainer = styled.div`
  margin: 2.5rem;
  padding: 2.5rem 5rem;
  background-color: var(--color-dark--1);
  min-height: calc(100vh - 5rem);
`;
export const SignUpPrompt = styled.p`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #ccc;
  text-align: center;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FormWrapper = styled.div`
  background-color: var(--color-dark--2);
  border-radius: 7px;
  padding: 2rem 3rem;
  width: 48rem;
  margin: 8rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormTitle = styled.h2`
  color: white;
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Label = styled.label`
  color: white;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
