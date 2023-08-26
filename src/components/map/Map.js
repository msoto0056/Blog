import React from "react";
import { ComposableMap, Geographies, Geography,  Graticule, ZoomableGroup } from "react-simple-maps"
import { geoOrthographic } from "d3-geo"
import { timer } from "d3"
// import { Motion, spring } from "@serprex/react-motion";
import ReactTooltip from "react-tooltip";

const mapStyles = {
  width: "100%",
  height: "500px"
};



// const geoUrl = // "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
// const geoUrl = "https://unpkg.com/world-atlas@1.1.4/world/110m.json"
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"
  export default function Map({center,setTooltipContent}) {
    const handleMouseEnter = (geo) => {
      console.log("Mouse enter:", geo.properties.name);
      setTooltipContent(geo.properties.name);
    };
  
    const handleMouseLeave = () => {
      console.log("Mouse leave");
      setTooltipContent("la repicha");
    };
    const handleMouseClick = (geo) => {
      console.log("Mouse Click", geo.properties.name);
      setTooltipContent(geo.properties.name);
    };
    return (
          <ComposableMap
            projection="geoOrthographic"
            projectionConfig={{
              rotate: [center[0], center[1], 0],
              center: [0, 0],
              scale: 250,
            }}
            style={mapStyles}
          >
          <ZoomableGroup center={[0,0]} zoom={1}>
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => handleMouseEnter(geo)}
                  onMouseLeave={handleMouseLeave}
                  onMouseClick={() => handleMouseClick(geo)}
                  fill="#4682B4"
                  stroke="#2F4F4F"
                  strokeWidth={1}
                  className="country" // Add this line
                  style={{
                    default: { fill: "#4682B4" },
                    hover: { fill: "#708090" },
                    pressed: { fill: "#008080" },
                  }}
                />
              ))
            }
          </Geographies>
          </ZoomableGroup>
      </ComposableMap>
    )
  }


