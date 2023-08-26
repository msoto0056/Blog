import {useEffect,useState,useRef} from 'react';
import {json, tsv, select} from 'd3';
import {feature, mesh} from 'topojson-client'

const geoUrl0="https://unpkg.com/world-atlas@2.0.2/countries-110m.json";
// const geoUrl1="https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
// const geoUrl2="https://unpkg.com/browse/world-atlas@1.1.4/world/110m.json";
// const geoUrl3="https://unpkg.com/browse/world-atlas@1.1.4/world/50m.json";
const tsv1='https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'
// const tsv2='https://unpkg.com/browse/world-atlas@1.1.4/world/110m.tsv'

// const svg = select('svg');

export const useData2= () => {
    const[data,setData]= useState(null);
    const svgRef = useRef();

    useEffect(() => {
        // const svg = select(svgRef.current);
        Promise.all([
            tsv(tsv1),
            json(geoUrl0)
          ]).then(([tsvData, topology]) => {
            const countryName = tsvData.reduce((accumulator, d) => {
                accumulator[d.iso_n3] = d.name;
                return accumulator;
              }, {});
            const {countries, land} = topology.objects;
            setData({
                land: feature(topology, land ),
                countries: feature(topology, countries),
                interiors: mesh(topology, countries, (a, b) => a !==b ),
                country : countryName
            });
        });
        }, [] );
    return data;
};