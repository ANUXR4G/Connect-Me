"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface UserLocation {
  lat: number;
  lng: number;
  userId: string;
  timestamp: number;
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
      version: "weekly",
    });

    let cancelled = false;
    let mapInstance: google.maps.Map | null = null;

    (async () => {
      await loader.load();
      if (cancelled) return;

      const { Map, Marker } = (await google.maps.importLibrary("maps")) as any;

      mapInstance = new Map(mapRef.current!, {
        center: { lat: 28.0, lng: 77.0 },
        zoom: 12,
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
      });

      // Get user's geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          if (cancelled) return;

          const userLoc = { lat: coords.latitude, lng: coords.longitude };
          setUserLocation(userLoc);
          mapInstance?.setCenter(userLoc);
          mapInstance?.setZoom(15);

          // Save user's location to server
          fetch("/api/locations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lat: coords.latitude,
              lng: coords.longitude,
              userId,
            }),
          });

          // Add marker for current user
          const userMarker = new Marker({
            position: userLoc,
            map: mapInstance,
            title: "Your Location",
            icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          });
          markersRef.current.set(userId, userMarker);
        });
      }

      // Fetch and display other users' locations
      const fetchOtherUsers = async () => {
        if (cancelled) return;
        try {
          const response = await fetch("/api/locations");
          const locations: UserLocation[] = await response.json();

          // Update or create markers for other users
          locations.forEach((loc) => {
            if (loc.userId === userId) return; // Skip current user

            if (markersRef.current.has(loc.userId)) {
              // Update existing marker
              markersRef.current.get(loc.userId)!.setPosition({
                lat: loc.lat,
                lng: loc.lng,
              });
            } else {
              // Create new marker
              const marker = new Marker({
                position: { lat: loc.lat, lng: loc.lng },
                map: mapInstance,
                title: loc.userId,
                icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              });
              markersRef.current.set(loc.userId, marker);
            }
          });

          // Remove markers for users that are no longer active
          markersRef.current.forEach((marker, id) => {
            if (id !== userId && !locations.some((loc) => loc.userId === id)) {
              marker.setMap(null);
              markersRef.current.delete(id);
            }
          });
        } catch (error) {
          console.error("Failed to fetch locations:", error);
        }
      };

      // Fetch other users immediately and then every 10 seconds
      await fetchOtherUsers();
      const interval = setInterval(fetchOtherUsers, 10000);

      // Update user's location every 30 seconds
      const locationInterval = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(({ coords }) => {
            if (cancelled) return;
            fetch("/api/locations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                lat: coords.latitude,
                lng: coords.longitude,
                userId,
              }),
            });
          });
        }
      }, 30000);

      return () => {
        clearInterval(interval);
        clearInterval(locationInterval);
      };
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
}
