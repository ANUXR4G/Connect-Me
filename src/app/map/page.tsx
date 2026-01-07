"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!, // set in .env.local
      version: "weekly",
      // libraries: ["places"], // add if you need extras
    });

    let cancelled = false;

    (async () => {
      await loader.load();
      if (cancelled) return;

      const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;

      const map = new Map(mapRef.current!, {
        center: { lat: 28.0, lng: 77.0 },
        zoom: 12,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID, // optional
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          map.setCenter({ lat: coords.latitude, lng: coords.longitude });
          map.setZoom(15);
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
}
