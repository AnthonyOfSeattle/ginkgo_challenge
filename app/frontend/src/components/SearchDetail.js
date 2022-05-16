import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SearchDetail extends Component {
  constructor(props) {
    super(props);

    this.fullStatusCodes = {P : 'PENDING',
	                    R : 'RUNNING',
	                    C : 'COMPLETE',
	                    E : 'ERROR'};

    this.statusClasses = {P : 'search-status search-status-pending',
                          R : 'search-status search-status-running',
                          C : 'search-status search-status-complete',
                          E : 'search-status search-status-error'};
  };

  getFullStatus() {
    return this.fullStatusCodes[this.props.search.status];
  };

  getStatusClass() {
    return this.statusClasses[this.props.search.status];
  };

  render() {
    return (
      <Row className='search-detail'>
	<Col md={6}>
	  <Row className='search-meta'>
            <Col md={6} className={this.getStatusClass()}>
              <p>{this.getFullStatus()}</p>
	    </Col>
	  </Row>
	  <Row className='search-sequence-header'>
	    <p>Sequence</p>
	  </Row>
	  <Row  className='search-sequence'>
	    <p>{this.props.search.sequence}</p>
	  </Row>
	</Col>
	<Col md={6} className='search-results'>
          <Row className='search-results-header'>
            Results
	  </Row>
	</Col>
      </Row>
    );
  };
};

export default SearchDetail;
