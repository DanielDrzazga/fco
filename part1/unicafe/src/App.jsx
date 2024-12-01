import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  </>
)
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = ((good - bad) / total) || 0;
  const positive = ((good / total) * 100) || 0;

  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="total" value={total}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>given feedback</h3>
      <div>
        <Button handleClick={() => setGood(good +1)} text="good"/>
        <Button handleClick={() => setNeutral(neutral +1)}  text="neutral"/>
        <Button handleClick={() => setBad(bad +1)}  text="bad"/>
      </div>
      <h3>statistics</h3>
      { good + bad + neutral == 0 ? <p>No feedback given</p> : <Statistics good={good} bad={bad} neutral={neutral}/>}
    </div>
  )
}

export default App