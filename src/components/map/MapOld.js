import React from "react";
import { ComposableMap, Geographies, Geography,  Graticule, ZoomableGroup, ZoomableGlobe } from "react-simple-maps"
// import { geoOrthographic } from "d3-geo"
// import { timer } from "d3"
// import { Motion, spring } from "@serprex/react-motion";

const mapStyles = {
  width: "90%",
  height: "auto"
};



// const geoUrl =
// "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
  const geoUrl = "https://unpkg.com/world-atlas@1.1.4/world/110m.json";
  const geoUrl0="https://unpkg.com/world-atlas@2.0.2/countries-110m.json";
  const geoUrl1="https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
  export default function Map({setTooltipContent}) {
    return (
      <>
      <ComposableMap 
        width={500}
        height={500}
        projection="orthographic"
        projectionConfig={{ scale: 220 }}
        style={mapStyles} 
        >
          <ZoomableGlobe>
            <circle cx={250} cy={250} r={220} fill="transparent" stroke="#CFD8DC" />
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            <Geographies 
              disableOptimization
              geography={geoUrl0}
            >
              {( geos, proj ) =>
                  geos.map((geo, i) => (
                    <Geography 
                      key={geo.id + i} 
                      geography={geo}
                      projection={proj} 
                      onMouseEnter={()=>{
                        setTooltipContent(`${geo.properties.name}`);
                      }}
                      onMouseLeave={()=>{
                        setTooltipContent("");
                      }}

                    // fill="#06F"
                    fill="#4682B4"
                    // "#FFF"
                    stroke="#2F4F4F"
                    strokeWidth={1} 
                    style={{
                      default: { fill: "#4682B4" },
                      hover: { fill: "#708090" },
                      pressed: { fill: "#008080" },mapStyles
                    }}
                    />
                  
                ))
              }
            </Geographies>
          {/* </ZoomableGroup> */}
          </ZoomableGlobe>
      </ComposableMap>
      </>
    )
  }


