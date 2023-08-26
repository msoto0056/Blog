import React, { useState, useMemo, useRef } from "react";

import { useSpring, animated } from "@react-spring/web";
import { geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
// import jsonData from "./countries-110m.json";
import jsonData from "./mapa.json";

const COUNTRIES = feature(jsonData, jsonData.objects.land).features;

const MiniGlobe = animated(({ lat = 0, lng = 0, size = 200, onGlobeClick }) => {
  const svgref = useRef();
  const projection = useMemo(() => {
    return geoOrthographic()
      .translate([size / 2, size / 2])
      .scale(size / 2)
      .clipAngle(90)
      .rotate([-lat, -lng]);
  }, [size, lat, lng]);

  const pathgen = geoPath(projection);
  return (
    <svg ref={svgref} width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        onClick={evt => {
          let rect = svgref.current.getBoundingClientRect();
          const [lat, lng] = projection.invert([
            evt.pageX - rect.left,
            evt.pageY - rect.top
          ]);
          onGlobeClick.call(null, lat, lng);
        }}
        style={{ cursor: "pointer" }}
      />
      <g style={{ pointerEvents: "none" }}>
        {COUNTRIES.map((d, i) => (
          <path key={`path-${i}`} d={pathgen(d)} />
        ))}
      </g>
    </svg>
  );
});

export const GlobeVis = ({ size = 200 }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const { lat, lng } = useSpring({
    lat: center.lat,
    lng: center.lng
  });
  return (
    <MiniGlobe
      lat={lat}
      lng={lng}
      size={size}
      onGlobeClick={(lat, lng) => {
        setCenter({
          lat,
          lng
        });
      }}
    />
  );
};
