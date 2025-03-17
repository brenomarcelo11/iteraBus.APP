import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const Map = () => {
    const position = [-21.4250, -45.9472];

    return (
        <MapContainer center={position} zoom={16} style={{ height: "80vh", width: "50%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={customIcon} position={position}>
                <Popup>Aqui está o seu ônibus!</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
