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

  getSearchRuntime() {
    var started = new Date(this.props.search.started);
    var finished = new Date(Date.now());
    if (this.getFullStatus() == 'COMPLETE') {
      var finished = new Date(this.props.search.finished);
    };

    var runtime = (finished - started)/1000;

    return runtime.toFixed(2);
  }

  renderSearchResults() {
    if (this.getFullStatus() != 'COMPLETE') {
      return (
        <Col md={6} className='search-results' />
      );
    };

    var result = this.props.search.results[0];
    return (
      <Col md={6} className='search-results'>
        <Row className='search-results-header'>
	  <p>Results</p>
	</Row>
	<Row className='search-results-value'>
          <Col md={4}>
            <p>Genome:</p>
	  </Col>
	  <Col md={8}>
            <p>{result.genome}</p>
          </Col>
	</Row>
	<Row className='search-results-value'>
          <Col md={4}>
            <p>Protein:</p>
          </Col>
          <Col md={8}>
            <p>{result.protein}</p>
          </Col>
        </Row>
	<Row className='search-results-value'>
          <Col md={4}>
            <p>Range:</p>
          </Col>
          <Col md={8}>
            <p>{result.start} - {result.end}</p>
          </Col>
        </Row>
	<Row className='search-results-value'>
          <Col md={4}>
            <p>Runtime:</p>
          </Col>
          <Col md={8}>
            <p>{this.getSearchRuntime()} seconds</p>
          </Col>
        </Row>
      </Col>
    );
  }

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
	{this.renderSearchResults()}
      </Row>
    );
  };
};

export default SearchDetail;
