import React, { useEffect, useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { markersAtom } from "../store/store";
import { useAtom } from "jotai";
import MarkerModal from "./MarkerModal";
import { getLocation } from "../service/getLocation";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

export function MyMap() {
  const [markers, setMarkers] = useAtom(markersAtom);
  const [markerModalIsOpen, setIsMarkerModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState({});
  useEffect(() => {
    console.log(markers);
  }, [markers]);

  const removeMarker = (lat, lng) => {
    const filteredMakers = markers.filter(
      (mark) => mark.lat !== lat && mark.lng !== lng,
    );

    setMarkers(filteredMakers);
  };
  return (
    <div className="d-flex w-100 h-100 gap-4 main-content-sales">
      <Card className="p-0 rounded-5 overflow-hidden w-100">
        <MarkerModal
          isOpen={markerModalIsOpen}
          toggle={() => setIsMarkerModal(!markerModalIsOpen)}
          coord={selectedMarker}
          remove={removeMarker}
        />
        <Map
          height={700}
          defaultCenter={[-21.723709994933873, -50.72346522754347]}
          defaultZoom={13}
          onClick={async (e) => {
            const { city, uf } = await getLocation(e.latLng[0], e.latLng[1]);
            setMarkers([
              ...markers,
              { lat: e.latLng[0], lng: e.latLng[1], city, uf },
            ]);
          }}
        >
          {markers.map((coord) => (
            <Marker
              key={coord[0]}
              width={50}
              anchor={[coord.lat, coord.lng]}
              onClick={async (e) => {
                setIsMarkerModal(true);
                const { city, uf } = await getLocation(
                  e.anchor[0],
                  e.anchor[1],
                );
                setSelectedMarker({
                  lat: e.anchor[0],
                  lng: e.anchor[1],
                  city,
                  uf,
                });
              }}
            ></Marker>
          ))}
        </Map>
      </Card>
      <div className="visited-clients">
        <Card className="w-100 rounded-3">
          <CardHeader>Clientes visitados</CardHeader>
          <div className="d-flex flex-column gap-2 mt-3">
            {markers.length === 0 ? (
              <span className="text-muted">Nenhum cliente visitado</span>
            ) : (
              markers.map((mark) => (
                <div key={mark.lat}>
                  <span>{`${mark.city} - ${mark.uf}`}</span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
