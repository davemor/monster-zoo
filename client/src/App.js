import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let cards = [1,2,3,4,5,6,7,8,9,10].map(i =>{
   return( <div key={i.toString()} class='card'>
      <p>{i.toString()}</p>
    </div>);
  });
  return (
    <div className="App">
      <header>
        <h1>Monster Zoo!</h1>
      </header>
      {cards}
    </div>
  );
}

export default App;
