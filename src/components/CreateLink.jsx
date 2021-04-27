import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useMutation, gql } from "@apollo/client";

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = (props) => {
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      url: formState.url,
      description: formState.description,
    },
  });

  const changeHandler = (field, value) =>
    setFormState({ ...formState, [field]: value });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        createLink();
      }}
    >
      <FormGroup>
        <Label for="description_input">Description</Label>
        <Input
          id="description_input"
          value={formState.description}
          onChange={(e) => changeHandler("description", e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="url_input">URL</Label>
        <Input
          id="url_input"
          value={formState.url}
          onChange={(e) => changeHandler("url", e.target.value)}
        />
      </FormGroup>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CreateLink;
