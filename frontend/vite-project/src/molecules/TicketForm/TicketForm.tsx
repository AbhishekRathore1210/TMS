import React, { useState } from 'react';
// import 'rsuite/dist/styles/rsuite-default.css';
import { Form, ButtonToolbar, Button, SelectPicker, DatePicker ,Input } from 'rsuite';

const TicketForm = () => {
  // Define state variables for form fields
  const [formData, setFormData] = useState({
    email: '',
    type: 'story',
    summary: '',
    description: '',
    dueDate: null,
    file: null
  });

  // Handle form field changes and update state
  const handleFormChange = (value:any, name:any) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    // You can access form data from formData state
    setFormData({
        email: '',
        type: 'story',
        summary: '',
        description: '',
        dueDate: null,
        file: null
      });
    console.log(formData);
    // Add your submission logic here
  };

  return (
    <Form>
      <Form.Group controlId="type">
        <Form.ControlLabel>Type</Form.ControlLabel>
        <SelectPicker
          name="type"
          defaultValue="story"
          data={[
            { label: 'Story', value: 'story' },
            { label: 'Bug', value: 'bug' },
            { label: 'Task', value: 'task' }
          ]}
          onChange={value => handleFormChange(value, 'type')}
        />
      </Form.Group>
      <Form.Group controlId="summary">
        <Form.ControlLabel>Summary</Form.ControlLabel>
        <Input name="summary" value={formData.summary} onChange={value => handleFormChange(value, 'summary')} />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.ControlLabel>Assignee Email</Form.ControlLabel>
        <Form.Control name="email" value={formData.email} type="email" onChange={value => handleFormChange(value, 'email')} />
        <Form.HelpText tooltip>Email is required</Form.HelpText>
      </Form.Group>

      <Form.Group controlId="description">
        <Form.ControlLabel>Description</Form.ControlLabel>
        <textarea className="rs-input" rows={5} value={formData.description} name="description" onChange={e => handleFormChange(e.target.value, 'description')} />
      </Form.Group>
      <Form.Group controlId="dueDate">
        <Form.ControlLabel>Due Date</Form.ControlLabel>
        <DatePicker name="dueDate" value={formData.dueDate} onChange={value => handleFormChange(value, 'dueDate')} />
      </Form.Group>
      {/* <Form.Group controlId="file">
        <Form.ControlLabel>Attach File</Form.ControlLabel>
        <Uploader
          name="file"
          accept="image/jpeg,image/jpg,application/pdf"
          multiple={false}
          autoUpload={false}
          listType="picture-text"
          action="/upload_endpoint" // Replace '/upload_endpoint' with your actual endpoint
          onChange={file => handleFormChange(file, 'file')}
        />
        <Form.HelpText>Supported formats: jpg, jpeg, pdf</Form.HelpText>
      </Form.Group> */}
      <Form.Group>
        <ButtonToolbar>
          <span><Button appearance="primary" onClick={handleSubmit}>Submit</Button></span>
          <span><Button appearance="default">Cancel</Button></span>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default TicketForm;
