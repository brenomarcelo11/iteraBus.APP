import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import style from './mapa.module.css'


const Mapa = () => {

    const mapContainerStyle = {
        width: '100%',
        height: '100vh',
    };

    const lat = -21.4250;
    const lng = -45.9472;

    const center = {
        lat: Number(lat),
        lng: Number(lng),
    };

    const zoom = 16;

    return (
        <LoadScript googleMapsApiKey='AIzaSyAmHRNO0iLmK2AnRpV9-l07p6xIqrW-xRI'>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={zoom}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    )
}

export default Mapa;