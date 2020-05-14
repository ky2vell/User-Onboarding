import React from 'react';
import Formed from './components/Formed';
import { Container } from 'reactstrap';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Container className='mt-5'>
        <Formed />
      </Container>
    </div>
  );
}

export default App;
