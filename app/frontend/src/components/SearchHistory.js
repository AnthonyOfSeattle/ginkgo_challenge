import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchDetail from './SearchDetail';

class SearchHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searches: []
    };
  };

  componentDidMount() {
    this.fetchSearches();
    this.timerID = setInterval(
      () => this.fetchSearches(),
      5000
    );
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  };

  fetchSearches() {
    fetch('searches/')
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: 'Something went wrong!' };
          });
        };
        return response.json();
      })
      .then(searches => {
        this.setState(() => {
          return {
            searches
          };
        });
      });
  };

  render() {
    const searches = this.state.searches.map(search => {
      return (
        <li key={search.id}>
          <SearchDetail search={search}/>
        </li>
      );
    });

    return (
      <Row className="search-history justify-content-md-center">
        <Col md={8}>
          <ul>
            {searches}
          </ul>
        </Col>
      </Row>
    );
  };
};

export default SearchHistory;
