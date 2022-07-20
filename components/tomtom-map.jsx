import { useEffect, useRef } from "react";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { ssrSafeTomtom as tt } from "../ssr-tomtom-safe-import";

const TomtomMap = (props) => {
  const { className } = props;

  const mapElement = useRef();
  const MAP_LONGITUDE = 25.5855499;
  const MAP_LATITUDE = 49.577855;

  useEffect(() => {
    const map = tt.map({
      key: process.env.TOMTOM_API_KEY,
      container: mapElement.current,
      center: [MAP_LONGITUDE, MAP_LATITUDE],
      zoom: 13,
    });
    map.on("load", () => {
      new tt.Marker().setLngLat([MAP_LONGITUDE, MAP_LATITUDE]).addTo(map);
    });
    return () => map.remove();
  }, []);

  return <div ref={mapElement} className={className} />;
};

export default TomtomMap;
