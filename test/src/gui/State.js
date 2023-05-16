import React from 'react'


export default function State({
  goto,
}) {
  return <div
    name="A"
    onEnter={E=>console.log('enter A')}
    onExit={E=>console.log('exit A')}
  >
    <h2>State A</h2>
  </div>
}