import React, { useState, useEffect } from 'react'

export const Hello = () => {
  const [name, setName] = useState(() => {
    const storedName = JSON.parse(localStorage.getItem('name'))
    if (!storedName) {
      return 'Stranger'
    } else {
      return storedName
    }
  })

  const handleSetName = (e) => {
    e.preventDefault()
    setName(prompt('Enter your name'))
    localStorage.setItem('name', JSON.stringify(name))
  }

  const handleResetName = () => {
    setName('Stranger')
    localStorage.setItem('name', JSON.stringify(name))
  }

  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(name))
  }, [name])

  return (
    <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center', padding: '10px' }}>
      <h1 aria-label="greeting-name">Hello {name}!</h1>
      <div style={{ display: 'flex', padding: '10px', margin: 'auto' }}>
        <button
          onClick={handleSetName}
          style={{ display: 'block', marginRight: '10px' }}>
      Change name
        </button>
        <button
          onClick={handleResetName}
          style={{ display: 'block', marginLeft: ' 10px' }}>
      Reset name
        </button>
      </div>
    </div>
  )
}
