import React from "react";
import { ComposableMap, Geographies, Geography,  Graticule, ZoomableGroup } from "react-simple-maps"
import { geoOrthographic } from "d3-geo"
import { timer } from "d3"
// import { Motion, spring } from "@serprex/react-motion";

const mapStyles = {
  width: "100%",
  height: "500px"
};



// const geoUrl =
// "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
  const geoUrl = "https://unpkg.com/world-atlas@1.1.4/world/110m.json"
  export default function Map({center,setTooltipContent}) {
    return (
      <ComposableMap projection="geoOrthographic"
        projectionConfig={{
          // rotate: [-10.0, -52.0, 0],
          rotate: [center[0], center[1], 0],
          center: [-5,-3],
          scale: 250,
        }}
        style={mapStyles} // Update this line
        >
          <ZoomableGroup center={[0,0]} zoom={1}>
            <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography 
                      key={geo.rsmKey} 
                      geography={geo} 
                      onMouseEnter={()=>{
                        setTooltipContent('${geo.properties.name}');
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

// const Map = ({ center }) => (
//   <div>
//     {console.log('center',center)}
//     <Motion
//       defaultStyle={{
//         x: center[0],
//         y: center[1]
//       }}
//       style={{
//         x: spring(center[0]),
//         y: spring(center[1])
//       }}
//     >
//       {({ x, y }) => (
//         <ComposableMap
//           width={500}
//           height={500}
//           projection="orthographic"
//           projectionConfig={{ scale: 220 }}
//           style={mapStyles}
//         >
//           <ZoomableGlobe center={[x, y]}>
//             <circle
//               cx={250}
//               cy={250}
//               r={220}
//               fill="transparent"
//               stroke="#CFD8DC"
//             />
//             <Geographies
//               disableOptimization
//               geography="https://unpkg.com/world-atlas@1.1.4/world/110m.json"
//             >
//               {(geos, proj) =>
//                 geos.map((geo, i) => (
//                   <Geography
//                     key={geo.id + i}
//                     geography={geo}
//                     projection={proj}
//                     style={{
//                       default: { fill: "#CFD8DC" }
//                     }}
//                   />
//                 ))
//               }
//             </Geographies>
//           </ZoomableGlobe>
//         </ComposableMap>
//       )}
//     </Motion>
//   </div>
// );

// export default Map;
