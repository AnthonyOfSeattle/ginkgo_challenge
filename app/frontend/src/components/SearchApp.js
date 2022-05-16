import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import SearchHistory from './SearchHistory';
import SearchInput from './SearchInput';

class SearchApp extends Component {
  render() {
    return (
      <Row className="search-app">
	<SearchInput />
        <SearchHistory />
      </Row>
    );
  };
};

export default SearchApp;
