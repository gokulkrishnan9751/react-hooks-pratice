import React, { useState } from 'react'

export default function Home() {

  let normalCount = 0

  const [stateCount, setStateCount] = useState(0)

  function incrementNormal() {
    normalCount = normalCount + 1
    console.log("Normal variable value:", normalCount) 
  }

  function incrementState() {
    setStateCount(stateCount + 1)
    console.log("State value:", stateCount)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>

      <h2>Normal variable vs useState</h2>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Normal variable</h3>
        <p>Value on screen: {normalCount}</p>
        <button onClick={incrementNormal}>
          Click me (normal)
        </button>
      </div>

      <div style={{ padding: '1rem', border: '1px solid #4CAF50', borderRadius: '8px' }}>
        <h3>useState</h3>
        <p>Value on screen: {stateCount}</p>
        <button onClick={incrementState}>
          Click me (useState)
        </button>
      </div>

    </div>
  )
}