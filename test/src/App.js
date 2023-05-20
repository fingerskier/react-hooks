import { useState } from "react"
import K from './Constants'
import TestHash from "./gui/TestHash"
import TestMQTT from "./gui/TestMQTT"
import TestStateMachine from "./gui/TestStateMachine"
import TestWebUSB from "./gui/TestWebUSB"


function App() {
  const [visibility, setVisibility] = useState({})
  
  
  const setVisible = index=>{
    visibility[index] = !visibility[index]
    
    setVisibility({...visibility})
  }
  
  
  function AccordionFold({
    children,
    index,
    title,
    visible=false,
  }) {
    return <div>
      <hr />
      <h2>{title}</h2>
      <button onClick={E=>setVisible(index)}>
        {visible? 'Hide' : 'Show'}
      </button>
      
      {visible && children? children : <></>}
      <hr />
    </div>
  }
  
  
  return <>
    <h1>fingerskier React hooks</h1>
    
    <AccordionFold 
      index={K.HASH}
      title="useHash"
      visible={visibility[K.HASH]}
    >
      <TestHash />
    </AccordionFold>
    
    <AccordionFold 
      index={K.STATEMACHINE}
      title="useStateMachine"
      visible={visibility[K.STATEMACHINE]}
    >
      <TestStateMachine />
    </AccordionFold>
    
    <AccordionFold 
      index={K.MQTT}
      title="MQTT Client"
      visible={visibility[K.MQTT]}
    >
      <TestMQTT />
    </AccordionFold>
    
    <AccordionFold 
      index={K.WEBUSB}
      title="Web USB"
      visible={visibility[K.WEBUSB]}
    >
      <TestWebUSB />
    </AccordionFold>
  </>
}


export default App