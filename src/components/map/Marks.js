import { geoEqualEarth, geoOrthographic, geoPath, geoGraticule } from "d3-geo"

// const projection = geoEqualEarth();
const projection = geoOrthographic();
const path = geoPath(projection)
const graticule = geoGraticule();

export const Marks = ({data: {countries, interiors, country}, setTooltipContent}) => (

    <g className="marks">
        <path className= "sphere" d={path({type:"Sphere"})} />
        <path className= "graticule" d={path(graticule())} />
        {countries.features.map(feature =>(
            
            <path className= "country" 
            onMouseEnter={()=>{
                console.log('hizo hover', feature.properties.name);
                setTooltipContent(`${feature.properties.name}`);
            }}
            onMouseLeave={()=>{
                setTooltipContent("");
              }}
            onclick={()=>{
                console.log("Hice Click");
                alert(`Pais: ${feature.properties.name}`)}}
            d={path(feature)} />
        ))}
        <path className= "interiors" d={path(interiors)} />
  
    </g>
);
