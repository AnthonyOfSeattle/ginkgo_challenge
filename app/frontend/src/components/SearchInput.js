import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      sequence: ''
    };
  };

  handleChange(e) {
    this.setState({ sequence: e.target.value })
  };

  handleSubmit(e) {
    this.postSearch();
    e.preventDefault();
  };

  postSearch() {
    fetch("searches/", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(this.state)
    });
  };

  render() {
    return (
      <Row className="search-input justify-content-md-center">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicText"
          >
            <Form.Label>Sequence Search</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter sequence" 
              value = {this.state.sequence}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
    );
  };
};

export default SearchInput;
