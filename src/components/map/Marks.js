import { geoEqualEarth, geoOrthographic, geoPath, geoGraticule } from "d3-geo"
import { useRef, useState, useCallback, useEffect } from "react"
import Typography from '@mui/material/Typography';
import * as d3 from 'd3';
import rotateGlobe from './RotateGlobe';

const MARGIN = 20;
const SCALING_FACTOR = 1.8;

export const Marks = ({
  data: { countries, interiors, country}, 
  setTooltipContent, 
  enableRotation,
  width, 
  height, 
  initialMousePosition,
  svgRef
}) => {
  console.log ('svgRef', svgRef)
  const scaling = Math.min(width, height) / 3 - MARGIN
  // const projection = geoEqualEarth();
  const projection = geoOrthographic()
    .translate([width / 3, height / 3])
    .scale(scaling)
    .clipAngle(90);
  const path = geoPath(projection);
  const graticule = geoGraticule();
  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const [startMousePosition, setStartMousePosition] = useState(initialMousePosition);
  const [isDragging, setIsDragging] = useState(false);
  const [rotationTimer, setRotationTimer] = useState(null);

  const handleMouseDown = useCallback((event) => {
    setStartMousePosition({ x: event.clientX, y: event.clientY });
    setIsDragging(true);
  }, []);
    
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (isDragging) {
      const { clientX, clientY } = event;
      const deltaX = clientX - startMousePosition.x;
      const deltaY = clientY - startMousePosition.y;
      const rotation = projection.rotate();
      const sensitivity = 0.65; // Adjust the sensitivity of rotation

      rotation[0] += sensitivity * deltaX;
      rotation[1] -= sensitivity * deltaY;

      projection.rotate(rotation);
      console.log ('svgRef.current, svgRef.current')
      svgRef.current.selectAll('path').attr('d', path);
      
      setMousePosition({ x: clientX, y: clientY });
    }
  }, [isDragging, startMousePosition, projection, path, svgRef]);
  
  useEffect(() => {
    const handleMouseUpOutside = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    document.addEventListener('mouseup', handleMouseUpOutside);

    return () => {
      document.removeEventListener('mouseup', handleMouseUpOutside);
    };
  }, [isDragging]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    let timer = null;
  
    if (enableRotation) {
      timer = d3.interval(() => {
        const rotation = projection.rotate();
        rotation[0] += 0.1; // Adjust the rotation speed as needed
        projection.rotate(rotation);
        svg.selectAll('path').attr('d', path);
      }, 10); // Lower value for smoother rotation
    }
  
    setRotationTimer(timer);
  
    return () => {
      if (timer) {
        timer.stop();
      }
    };
  }, [enableRotation, projection, path, svgRef]);
  
  const marksClassName = isDragging ? 'marks dragging' : 'marks';

  return (
    <>
      <div style={{ position: 'absolute', bottom: 120, right: 24, padding:2, backgroundColor: '#fff',  zIndex: 9999, }}>
        <Typography variant="body1">
           Mouse Position - X: {(mousePosition.x + 30 / 60).toFixed(4)}, Y: {(-mousePosition.y).toFixed(4)}
           {console.log('Mouse Position - X:',(mousePosition.x + 30 / 60).toFixed(4))}
           {console.log('Mouse Position - y:',(-mousePosition.y).toFixed(4))}
        </Typography>
      </div>
      <g
        className={marksClassName}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        // style={marksStyle}
      >
        {projection.rotate([mousePosition.x + 30 / 60, -mousePosition.y, 0])}
        <path className="sphere" d={path({ type: "Sphere" })} />
        <path className="graticule" d={path(graticule())} /> 
        {countries.features.map((feature, index) => (
          <path 
            key={index} // Assigning index as the key (not recommended if the data order changes)
            className="country" 
            onMouseEnter={()=>{
                console.log('hizo hover', feature.properties.name);
                setTooltipContent(`${feature.properties.name}`);
            }}
            onMouseLeave={()=>{
                setTooltipContent("");
            }}
            onClick={()=>{
                console.log("Hice Click");
                alert(`Pais: ${feature.properties.name}`)}}
            d={path(feature)} />
        ))}
      <path className= "interiors" d={path(interiors)} />
    </g>
  </>
);
}

