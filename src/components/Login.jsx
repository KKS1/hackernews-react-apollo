import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router";
import { AUTH_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
        password
        links {
          id
          url
          description
        }
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        password
        links {
          id
          url
          description
        }
      }
    }
  }
`;

const Login = (props) => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    login: true,
    name: "",
    email: "",
    password: "",
  });

  const [loginAction] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      history.push("/");
    },
  });

  const [signupAction] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      history.push("/");
    },
  });

  const changeHandler = (field, value) =>
    setFormState({ ...formState, [field]: value });

  const submitHandler = (e) => {
    e.preventDefault();
    if (formState.login) {
      loginAction();
    } else {
      signupAction();
    }
  };

  return (
    <div>
      <h4>{formState.login ? "Login" : "Sign Up"}</h4>

      <Form onSubmit={submitHandler}>
        {!formState.login && (
          <FormGroup>
            <Label for="name_input">Name</Label>
            <Input
              id="name_input"
              value={formState.name}
              onChange={(e) => changeHandler("name", e.target.value)}
            />
          </FormGroup>
        )}

        <FormGroup>
          <Label for="email_input">Email</Label>
          <Input
            id="email_input"
            value={formState.email}
            onChange={(e) => changeHandler("email", e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="password_input">Password</Label>
          <Input
            id="password_input"
            value={formState.password}
            onChange={(e) => changeHandler("password", e.target.value)}
          />
        </FormGroup>

        <Button type="submit">{formState.login ? "Login" : "Signup"}</Button>

        <Button
          className="mx-3"
          onClick={(e) => changeHandler("login", !formState.login)}
        >
          {formState.login
            ? "Need to create an account?"
            : "Already have an account?"}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
