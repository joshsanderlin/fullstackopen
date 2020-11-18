import React from 'react';
import ReactDOM from 'react-dom';

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/joshsanderlin">joshsanderlin</a>
    </div>
  )
}

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old!</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Mushu'
  const age = 16
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Higgs" age={5 + 1}/>
      <Hello name={name} age={age}/>
      <Footer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
