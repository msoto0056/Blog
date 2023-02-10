import React from 'react';
import {GlobeVis} from "./GlobeVis";
// import useResizeObserver from "use-resize-observer";
import {useData} from './useData';
import "./estilo.css";

const pase="Aqui estoy"
console.log(pase)

export const Mapita = () => {
  const data = useData();
  // const [ref, width, height] = useResizeObserver();
  
  return (
    <React.Fragment>
      <GlobeVis data={data} />
    </React.Fragment>
  );
};


