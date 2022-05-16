import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SearchDetail extends Component {
  render() {
    return (
      <Row className="search-detail">
        <Col md={1}>
          Id: {this.props.search.id}
        </Col>
        <Col md={8}>
          Sequence: {this.props.search.sequence}
        </Col>
        <Col md={3}>
          {this.props.search.status}
        </Col>
      </Row>
    );
  };
};

export default SearchDetail;
