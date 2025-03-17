// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import style from './mapa.module.css'


// const Mapa = () => {

//     const mapContainerStyle = {
//         width: '40%',
//         height: '80vh',
//     };

//     const lat = -21.4250;
//     const lng = -45.9472;

//     const center = {
//         lat: Number(lat),
//         lng: Number(lng),
//     };

//     const zoom = 16;

//     return (
//         <LoadScript googleMapsApiKey='AIzaSyAmHRNO0iLmK2AnRpV9-l07p6xIqrW-xRI'>
//             <div className={style.mapa}>
//                 <GoogleMap
//                     mapContainerStyle={mapContainerStyle}
//                     center={center}
//                     zoom={zoom}
//                 >
//                     <Marker position={center} />
//                 </GoogleMap>
//             </div>
//         </LoadScript>
//     )
// }

// export default Mapa;