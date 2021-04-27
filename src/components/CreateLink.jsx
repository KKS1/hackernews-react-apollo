import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const CreateLink = (props) => {
  const [formState, setFormState] = useState({
    description: "",
    url: "",
  });

  const changeHandler = (field, value) =>
    setFormState({ ...formState, [field]: value });

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <FormGroup>
        <Label for="description_input">Description</Label>
        <Input
          id="description_input"
          value={formState.description}
          onChange={(val) => changeHandler("description", val)}
        />
      </FormGroup>

      <FormGroup>
        <Label for="url_input">URL</Label>
        <Input
          id="url_input"
          value={formState.url}
          onChange={(val) => changeHandler("url", val)}
        />
      </FormGroup>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CreateLink;
