import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';

import "./styles.css";

export default function ReMapa() {
  const svgRef = useRef(null);
  const width = 800;
  const height = 600;

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const projection = d3.geoNaturalEarth1().fitSize([width, height], { type: 'Sphere' });
    const pathGenerator = d3.geoPath().projection(projection);

    const g = svg.append('g');

    g.append('path')
      .attr('class', 'sphere')
      .attr('d', pathGenerator({ type: 'Sphere' }));

    svg.call(d3.zoom().on('zoom', (event) => {
      g.attr('transform', event.transform);
    }));

    Promise.all([
      d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
      d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
    ]).then(([tsvData, topoJSONdata]) => {
      const countryName = {};
      tsvData.forEach((d) => {
        countryName[d.iso_n3] = d.name;
      });

      const countries = feature(topoJSONdata, topoJSONdata.objects.countries);

      g.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', pathGenerator)
        .append('title')
        .text((d) => countryName[d.id]);
    });
  }, []);

  return <svg ref={svgRef}></svg>;
}
