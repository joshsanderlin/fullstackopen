import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = ((good * 1) + (bad * -1)) / total
  const positive = 100 * good / total

  if(total === 0) {
    return (
      <div><p>No feedback given</p></div>
    )
  }

  return (
    <div>
      <h1>Statistics:</h1>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={total} />
          <Statistic text='average' value={average.toFixed(2)} />
          <Statistic text='positive' value={positive.toFixed(2) + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const FeedbackButton = ({ text, value, setter }) => {
  return (
    <button onClick={() => setter(value + 1)}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give us your Feedback!</h1>
      <div>
        <FeedbackButton text='good' value={good} setter={setGood} />
        <FeedbackButton text='neutral' value={neutral} setter={setNeutral} />
        <FeedbackButton text='bad' value={bad} setter={setBad} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
