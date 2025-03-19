import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useEffect, useState } from "react";
import PontoDeOnibusApi from "../../services/PontoDeOnibusAPI";

const customIcon = new L.Icon({
    iconUrl: "https://www.svgrepo.com/show/180421/bus-stop-station.svg",
    iconSize: [30, 44],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const Map = () => {
    const [pontosDeOnibus, setPontosDeOnibus] = useState([]);
    const position = [-21.4250, -45.9472];

    useEffect(() => {
        const fetchPontosDeOnibus = async () => {
            try {
                const pontos = await PontoDeOnibusApi.listarPontosAsync();

                setPontosDeOnibus(pontos);
            } catch (error) {
                console.error("Erro ao buscar pontos de ônibus:", error);
            }
        };
        fetchPontosDeOnibus();
    }, []);

    return (
        <MapContainer center={position} zoom={16} style={{ height: "80vh", width: "50%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pontosDeOnibus.map((ponto) => (
                <Marker
                key={ponto.id}
                position={[ponto.latitude, ponto.longitude]}
                icon={customIcon}
                >
                    <Popup>
                        {ponto.nome}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
