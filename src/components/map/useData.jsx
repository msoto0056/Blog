import {useEffect,useState} from 'react';
import {json} from 'd3';
import {feature, mesh} from 'topojson-client'

const geoUrl0="https://unpkg.com/world-atlas@2.0.2/countries-110m.json";
const geoUrl1="https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
export const useData= () => {
    const[data,setData]= useState(null);
    useEffect(() => {
        json(geoUrl1).then(topology =>{
            const {countries, land} = topology.objects;
            setData({
                land: feature(topology, land ),
                countries: feature(topology, countries),
                interiors: mesh(topology, countries, (a, b) => a !==b )
            });
        });
        }, [] );
    return data;
};
