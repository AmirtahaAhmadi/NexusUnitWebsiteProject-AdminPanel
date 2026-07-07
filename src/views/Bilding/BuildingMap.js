import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";


const LocationPicker = ({ position, onChange }) => {
  useMapEvents({
    click(e) {
      onChange({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return position ? <Marker position={position} /> : null;
};


const BuildingMap = ({
  position,
  setPosition,
  setValue,
}) => {

  return (
    <MapContainer
      key={`${position.lat}-${position.lng}`}
      center={position}
      zoom={15}
      style={{
        height: "350px",
        width: "100%",
      }}
    >

      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap contributors &copy; CARTO"
      />


      <LocationPicker
        position={position}
        onChange={(latlng)=>{

          setPosition(latlng);


          setValue(
            "latitude",
            latlng.lat.toFixed(6)
          );


          setValue(
            "longitude",
            latlng.lng.toFixed(6)
          );

        }}
      />

    </MapContainer>
  );
};


export default BuildingMap;