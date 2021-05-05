import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router";
import { FEED_QUERY } from "./LinkList";
import { LINKS_PER_PAGE } from "../constants";

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
  const history = useHistory();

  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      url: formState.url,
      description: formState.description,
    },
    onCompleted: () => history.push("/"),
    update: (cache, { data: { link } }) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: "desc" };

      const { feed } = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      cache.writeQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
        data: {
          feed: {
            links: [link, ...feed.links],
          },
        },
      });
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
