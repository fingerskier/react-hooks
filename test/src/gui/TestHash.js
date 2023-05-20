import {useEffect, useState} from 'react'
import useHash from '../hooks/useHash.js'


export default function() {
  const {hash, on} = useHash()
  
  const [state, setState] = useState()
  
  
  useEffect(()=>{
    on('flarn', res=>{
      setState('flarn callback')
    })
    on('ghibbet', res=>{
      setState('ghibbet callback')
    })
  }, [])
  
  
  return <div>
    <h3>Location & Hash Watching</h3>
    
    Current hash: {hash}
    <br />
    On hash-change: {state}
    
    <br />
    <br />
    <a href="#test">Test Hash</a>
    <br />
    <a href="#flarn">Flarn Hash</a>
    <br />
    <a href="#ghibbet">Ghibbet Hash</a>
  </div>
}
