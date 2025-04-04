import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import PontoDeOnibusApi from "../../services/PontoDeOnibusAPI";
import 'mapbox-gl/dist/mapbox-gl.css';
import RotaApi from "../../services/rotaAPI";
import style from './MapBox.module.css'

mapboxgl.accessToken = "pk.eyJ1IjoiYnJlbm9tYXJjZWxvMTEiLCJhIjoiY204bmU1bnYzMTVlbDJscTBxN3FrNW52aCJ9.Wg_4Z19ssYuHRUOILuARTw";

const MapBox = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [pontosDeOnibus, setPontosDeOnibus] = useState([]);
  const [rotas, setRotas] = useState([]);
  const [rotasDisponiveis, setRotasDisponiveis] = useState([]);
  const [rotaSelecionada, setRotaSelecionada] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef([]);
  const busMarkerRef = useRef(null);
  const busIntervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pontos = await PontoDeOnibusApi.listarPontosAsync();
        setPontosDeOnibus(pontos);

        const rotas = [...new Set(pontos.map(ponto => ponto.rotaId))].filter(id => id);
        setRotasDisponiveis(rotas);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-45.9477, -21.4246],
      zoom: 13
    });

    mapRef.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !pontosDeOnibus) return;

    updateMap();
  }, [mapLoaded, rotaSelecionada, pontosDeOnibus]);

  const createCustomMarker = (rotaId) => {
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
    const color = colors[rotaId % colors.length];

    const el = document.createElement('div');
    el.style.width = '24px';
    el.style.height = '24px';
    el.style.background = color;
    el.style.borderRadius = '50%';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';

    const inner = document.createElement('div');
    inner.style.width = '16px';
    inner.style.height = '16px';
    inner.style.background = 'white';
    inner.style.borderRadius = '50%';

    el.appendChild(inner);
    return el;
  };

  useEffect(() => {
    const fetchRotas = async () => {
      try {
        const data = await RotaApi.listarRotaAsync();
        setRotas(data);
      } catch (error) {
        console.error("Erro ao buscar rotas:", error);
      }
    };

    fetchRotas();
  }, []);

  const updateMap = () => {
    stopBusSimulation();
    clearMarkers();
    clearRoute();

    // Se não houver rota selecionada, apenas exibe os pontos de ônibus
    if (!rotaSelecionada) {
      pontosDeOnibus.forEach(ponto => {
        const marker = new mapboxgl.Marker({
          element: createCustomMarker(ponto.rotaId)
        })
          .setLngLat([ponto.longitude, ponto.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`
          <div style="padding: 8px;">
            <strong>${ponto.nome}</strong><br>
            <small>Rota ${ponto.rotaId}</small>
          </div>
        `))
          .addTo(mapRef.current);

        markersRef.current.push(marker);
      });
      return;
    }

    // Quando há uma rota selecionada, filtra os pontos dessa rota e traça a rota
    const pontosFiltrados = pontosDeOnibus.filter(ponto => ponto.rotaId === rotaSelecionada);

    if (pontosFiltrados.length === 0) return;

    pontosFiltrados.forEach(ponto => {
      const marker = new mapboxgl.Marker({
        element: createCustomMarker(ponto.rotaId)
      })
        .setLngLat([ponto.longitude, ponto.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`
        <div style="padding: 8px;">
          <strong>${ponto.nome}</strong><br>
          <small>Rota ${ponto.rotaId}</small>
        </div>
      `))
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });

    // Calcular rota se houver mais de um ponto
    if (pontosFiltrados.length > 1) {
      const coordinates = pontosFiltrados
        .map(ponto => `${ponto.longitude},${ponto.latitude}`)
        .join(';');

      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxgl.accessToken}`)
        .then(res => res.json())
        .then(data => {
          if (data.routes?.[0]) {
            addRouteToMap(data.routes[0].geometry);
            fitMapToRoute(pontosFiltrados);
            startBusSimulation(data.routes[0].geometry.coordinates);
          }
        })
        .catch(err => console.error("Erro na rota:", err));
    } else {
      // Centralizar no único ponto
      mapRef.current.flyTo({
        center: [pontosFiltrados[0].longitude, pontosFiltrados[0].latitude],
        zoom: 14
      });
    }
  };

  const startBusSimulation = (routeCoordinates) => {

    stopBusSimulation();
    console.log("🚍 Criando novo marcador de ônibus...");

    const busIcon = document.createElement("div");
    busIcon.style.width = "40px";
    busIcon.style.height = "40px";
    busIcon.style.backgroundImage = "url('https://www.svgrepo.com/show/107835/bus.svg')";
    busIcon.style.backgroundSize = "cover";
    busIcon.style.backgroundRepeat = "no-repeat";

    // Criando o marcador com o elemento personalizado
    busMarkerRef.current = new mapboxgl.Marker({ element: busIcon })
      .setLngLat(routeCoordinates[0])
      .addTo(mapRef.current);

    let index = 0;
    const speed = 0.0100;

    const moveToNextPoint = () => {
      if (index >= routeCoordinates.length - 1) {
        console.log("🏁 Ônibus chegou ao fim da rota.");
        return;
      }

      const start = routeCoordinates[index];
      const end = routeCoordinates[index + 1];
      let t = 0;

      console.log(`🛑 Parado no ponto ${index + 1} por 3 segundos...`);

      setTimeout(() => { // ⏳ Aguarda 3 segundos antes de se mover
        busIntervalRef.current = setInterval(() => {
          if (t >= 1) {
            clearInterval(busIntervalRef.current);
            index++;
            moveToNextPoint(); // 🚍 Chama o próximo ponto após a movimentação
          } else {
            t += speed;
            const newLng = start[0] + (end[0] - start[0]) * t;
            const newLat = start[1] + (end[1] - start[1]) * t;

            if (busMarkerRef.current) {
              busMarkerRef.current.setLngLat([newLng, newLat]);
            }
          }
        }, 50);
      }, 3000); // 🔥 Espera 3 segundos antes de se mover para o próximo ponto
    };

    moveToNextPoint();
  };

  const stopBusSimulation = () => {
    if (busIntervalRef.current) {
      console.log("⛔ Simulação parada.");
      clearInterval(busIntervalRef.current);
      busIntervalRef.current = null;
    }

    if (busMarkerRef.current) {
      console.log("🗑️ Removendo marcador do ônibus...");
      busMarkerRef.current.remove();
      busMarkerRef.current = null;
    }
  };

  const addRouteToMap = (geometry) => {
    if (mapRef.current.getSource('route')) {
      mapRef.current.getSource('route').setData({
        type: 'Feature',
        geometry: geometry
      });
    } else {
      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: geometry
          }
        },
        paint: {
          'line-color': '#25a745',
          'line-width': 5,
          'line-opacity': 0.7
        }
      });
    }
  };

  const fitMapToRoute = (pontos) => {
    const bounds = new mapboxgl.LngLatBounds();
    pontos.forEach(ponto => bounds.extend([ponto.longitude, ponto.latitude]));
    mapRef.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15
    });
  };

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  const clearRoute = () => {
    if (mapRef.current.getLayer('route')) {
      mapRef.current.removeLayer('route');
    }
    if (mapRef.current.getSource('route')) {
      mapRef.current.removeSource('route');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.controlPanel}>
        <label htmlFor="rota-select">Selecione a rota:</label>
        <select
          id="rota-select"
          value={rotaSelecionada || ""}
          onChange={(e) => setRotaSelecionada(Number(e.target.value))}
          style={{ padding: "8px", marginLeft: "10px" }}
        >
          <option value="">-- Selecione --</option>
          {rotas.map((rota) => (
            <option key={rota.id} value={rota.id}>
              {rota.nome}
            </option>
          ))}
        </select>
          <p>
            {rotaSelecionada
              ? `${rotas.find((rota) => rota.id === rotaSelecionada)?.nome || "Desconhecida"}`
              : "Nenhuma rota selecionada"}
          </p>
      </div>

      <div ref={mapContainerRef} className={style.mapContainer} />
    </div>
  );
};

export default MapBox;
