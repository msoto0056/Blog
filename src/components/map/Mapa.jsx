import {useData} from './useData';
import {Marks} from './Marks';
import ReactTooltip from 'react-tooltip';
import {useState, useRef, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';

import "./styles.css"

export const Mapa = () => {

    const svgRef = useRef(null)
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    const [initialMousePosition, setInitialMousePosition ] = useState({x:   92.2093, y: -33.8688 })
    const updateWidthAndHeight = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight - 64)
    }
  
    const data = useData();
    const[content,setContent]=useState ("");
    const [enableRotation, setRotation] = useState(false)
    const handleRotation = () => {
        setRotation(!enableRotation);
      };
    console.log ("data", data)
    const handleNorthAmerica = () => {
        setInitialMousePosition({x:   92.2093, y: -33.8688})
      }
    const handleAfrica = () => {
        setInitialMousePosition({x:-15,y: 0})
      }
    const handleSouthAmerica = () => {
        setInitialMousePosition({x:   66.9237, y: 30.0196})
      }
    const handleEuroAsia = () => {
        setInitialMousePosition({x:  -55,      y: -25})
      }
    const handleOceania = () => {
        setInitialMousePosition({ x: -123.7584, y: 9.7489 })
      }
    useEffect(() => {
        window.addEventListener('resize', updateWidthAndHeight)
        updateWidthAndHeight()
    },);
    
    
    // <WorldGlobe countries={countries} markers={globalMarkers} enableRotation={enableRotation} />
    
    if (!data   ){
        return <pre>Loading...</pre>;
    }
    return(
        <Box >
            <Container disableGutters>
            <div style={{ position: 'absolute', bottom: 70, right: 24, padding:2 }}>
                <Typography variant="body1">
                    Initial Mouse Position - X: {initialMousePosition.x.toFixed(4)}, Y: {initialMousePosition.y.toFixed(4)}
                </Typography>
            </div>
            <div style={{ position: 'absolute', bottom: 24, right: 24, padding:2 }}>
                <Button variant= 'contained' color='primary' onClick={handleRotation}>Rotate</Button>
                <Button sx={{ marginLeft: 1 }} variant= 'contained' color='primary' onClick={handleNorthAmerica}>North America</Button>
                <Button sx={{ marginLeft: 1 }} variant= 'contained' color='primary' onClick={handleSouthAmerica}>South America</Button>
                <Button sx={{ marginLeft: 1 }} variant= 'contained' color='primary' onClick={handleAfrica}>Africa</Button>
                <Button sx={{ marginLeft: 1 }} variant= 'contained' color='primary' onClick={handleOceania}>Oceania</Button>
                <Button sx={{ marginLeft: 1 }} variant= 'contained' color='primary' onClick={handleEuroAsia}>Euro-Asia</Button>
            </div>
             <svg
                className="svg"
                ref={svgRef}
                width={width}
                height={height}
                >
                <ReactTooltip className="tooltip">{content}</ReactTooltip>
                <Marks
                    setTooltipContent={setContent}
                    data={data}
                    enableRotation={enableRotation}
                    width={width}
                    height={height}
                    initialMousePosition={initialMousePosition}
                    svgRef={svgRef}
                />
            </svg>
            </Container>
        </Box>
    );
}