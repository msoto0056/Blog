import React, { useState }  from 'react'
import {useData2} from './useData2';
import './WorldPage.css'

function D3_GlobeMap() {
  const [enableRotation, setRotation] = useState(false)

  const handleRotation = () => {
    const nextRotation = !enableRotation
    setRotation(nextRotation)
  }

  const data = useData2();
  console.log ("data", data)

  return (
    <div>D3_GlobeMap</div>
  )
}

export default D3_GlobeMap