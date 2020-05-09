import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'
import { Hello } from './Hello'

describe('Testing front-end', () => {
  it('renders app', () => {
    const { getByText } = render(<App />)
    const hello = getByText(/hello/i)
    expect(hello).toBeInTheDocument()
  })

  it('renders form fields', () => {
    const { getByLabelText } = render(<App />)

    const name = getByLabelText('name-input', { selector: 'input' })
    const email = getByLabelText('email-input', { selector: 'input' })
    const password = getByLabelText('password-input', { selector: 'input' })

    expect(name).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
  })

  it('renders form field inputs', () => {
    const { getByLabelText } = render(<App />)

    const name = getByLabelText('name-input', { selector: 'input' })
    const email = getByLabelText('email-input', { selector: 'input' })
    const password = getByLabelText('password-input', { selector: 'input' })

    fireEvent.change(name, { target: { value: 'test name' } })
    fireEvent.change(email, { target: { value: 'testname@gmail.com' } })
    fireEvent.change(password, { target: { value: 'whatlieshere?' } })

    expect(name.value).toEqual('test name')
    expect(email.value).toEqual('testname@gmail.com')
    expect(password.value).toEqual('whatlieshere?')
  })

  test('Hello component renders "Hello Stranger!" by default', () => {
    const { getByText } = render(<Hello />)

    const greetingName = getByText(/Hello Stranger/i)

    expect(greetingName.textContent).toEqual('Hello Stranger!')
  })

  test('Hello component returns input as name if input is passed to prompt modal', () => {
    const { getByText, getByLabelText } = render(<Hello />)

    const greetingName = getByLabelText(/greeting-name/i)
    const editNameBtn = getByText(/Change name/i)

    window.prompt = jest.fn().mockReturnValue('NAME CHANGED')

    fireEvent.click(editNameBtn)
    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' })

    expect(greetingName.textContent).toEqual('Hello NAME CHANGED!')

    window.prompt = jest.fn().mockReturnValue('')

    fireEvent.click(editNameBtn)
    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' })

    expect(greetingName.textContent).toEqual('Hello !')
  })

  test('Hello component returns localStorage name when component is rerendered/refreshed', () => {
    const { getByText, getByLabelText, rerender } = render(<Hello />)

    const greetingName = getByLabelText(/greeting-name/i)
    const editNameBtn = getByText(/Change name/i)

    window.prompt = jest.fn().mockReturnValue('SECOND SWAP')

    fireEvent.click(editNameBtn)
    fireEvent.keyDown(window, { key: 'Enter', code: 'Enter' })

    expect(greetingName.textContent).toEqual('Hello SECOND SWAP!')

    Object.defineProperty(window.location, 'reload', {
      configurable: true
    })

    window.location.reload = jest.fn()

    expect(jest.isMockFunction(window.location.reload)).toBe(true)

    const reloadFn = () => {
      window.location.reload(true)
    }

    reloadFn(true)

    expect(window.location.reload).toHaveBeenCalledWith(true)
    expect(greetingName.textContent).toEqual('Hello SECOND SWAP!')

    rerender(<Hello />)

    expect(greetingName.textContent).toEqual('Hello SECOND SWAP!')
  })
})
