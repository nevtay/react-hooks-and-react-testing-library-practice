import React from 'react'
import './App.css'
import { useForm } from './hooks/useForm'
import { Hello } from './Hello'

const App = () => {
  const [inputs, setInputs] = useForm({
    name: ' ',
    email: ' ',
    password: ' '
  })

  // useEffect(() => {
  //   console.log('mount 1')
  // }, [])

  // useEffect(() => {
  //   console.log('mount 2')
  // }, [])

  return (
    <div className="App">
      <Hello />
      <form id="form-container"
        style={{ minWidth: '50vw', display: 'flex', flexFlow: 'column wrap', padding: '15px' }}>
        <div style={{ display: 'flex', flexFlow: 'row wrap', margin: 'auto', justifyContent: 'space-between', minWidth: '300px' }}>
          <label
            style={{ alignSelf: 'flex-start' }}
            htmlFor="name">NAME:
          </label>
          <input
            aria-label="name-input"
            name="name"
            value={inputs.name}
            placeholder="enter name"
            onChange={setInputs} />
        </div>

        <br/>
        <div style={{ display: 'flex', flexFlow: 'row wrap', margin: 'auto', justifyContent: 'space-between', minWidth: '300px' }}>
          <label
            style={{ alignSelf: 'flex-start' }}
            htmlFor="email">EMAIL:
          </label>
          <input
            aria-label="email-input"
            name="email"
            value={inputs.email}
            placeholder="enter email"
            onChange={setInputs} />
        </div>
        <br />

        <div style={{ display: 'flex', flexFlow: 'row wrap', margin: 'auto', justifyContent: 'space-between', minWidth: '300px' }}>
          <label
            style={{ display: 'flex', justifyContent: 'flex-start' }}
            htmlFor="password">PASSWORD:
          </label>
          <input
            aria-label="password-input"
            name="password"
            value={inputs.password}
            placeholder="enter password"
            onChange={setInputs} />
        </div>

      </form>
    </div>
  )
}

export default App
