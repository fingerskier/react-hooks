import React from 'react'
import useLocation from '../hooks/useLocation.js'


export default function() {
  const {hash, location} = useLocation()

  return <div>
    <h3>Location & Hash Watching</h3>

    <a href="#test">Test Hash</a>
    <br />
    <a href="#flarn">Flarn Hash</a>
    <br />
    <a href="#ghibbet">Ghibbet Hash</a>
    <br />
    <br />
    <a href="/asdf">asdf path</a>
    <br />
    <a href="/asdf/qwer">asdf qwer path</a>
  </div>
}
