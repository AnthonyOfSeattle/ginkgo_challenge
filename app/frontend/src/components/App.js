import React, { Component } from 'react';
import { render } from 'react-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import SearchApp from './SearchApp';

function Banner() {
  return (
    <Navbar bg='primary' variant='dark'>
      <Container>
        <Navbar.Brand>Seqsleuth</Navbar.Brand>
	<Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <strong>Admin</strong>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

class App extends Component {
  render() {
    return (
      <Container>
	<Banner/>
	<SearchApp/>
      </Container>
    );
  };
};

export default App;

const container = document.getElementById('app');
render(<App />, container);
