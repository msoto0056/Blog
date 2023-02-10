import {useData} from './useData';
import {Marks} from './Marks';
import ReactTooltip from 'react-tooltip';
import {useState} from 'react'


import "./styles.css"

const width=960;
const height= 500;

export const Mapa = () => {

    const data = useData();
    const[content,setContent]=useState ("");
    console.log ("data", data)

    if (!data   ){
        return <pre>Loading...</pre>;
    }
    return(
           
            <svg width={width} height={height}>
                
                <ReactTooltip className='tooltip'>{content}</ReactTooltip>
                <Marks setTooltipContent={setContent} data={data}/>

            </svg>
    );
}