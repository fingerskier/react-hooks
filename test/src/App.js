import { useState } from "react"
import K from './Constants'
import TestMQTT from "./gui/TestMQTT"
import TestWebUSB from "./gui/TestWebUSB"


function App() {
  const [visibility, setVisibility] = useState([])
  
  
  const setVisible = index=>{
    const I = Object.keys(K).findIndex(X=>K[X]===index)
    
    visibility.fill(false)
    visibility[I] = true

    console.log('VIZ', index, I, visibility)
    
    setVisibility([...visibility])
  }
  
  
  function AccordionFold({
    children,
    index,
    title,
    visible=false,
  }) {
    if (visible) return <div>
      {children}
    </div>
    else return <button onClick={E=>setVisible(index)}>
      Show {title}
    </button>
  }
  
  
  return <>
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