// Map.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useFormikContext } from "formik"; // Import useFormikContext from Formik

interface LatLng {
  lat: number;
  lng: number;
}

interface Place {
  place_id: string;
  formatted_address: string;
  geometry: google.maps.places.PlaceGeometry;
}
interface MapProps {
  input: React.ReactElement;
  onChange: (place: Place | null) => void;
}

const Map: React.FC<MapProps> = ({ input, onChange }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [searchLngLat, setSearchLngLat] = useState<LatLng | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { setFieldValue } = useFormikContext(); // Access Formik's setFieldValue function

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API || "",
    libraries: ["places"],
  });

  useEffect(() => {
    if (selectedPlace && searchLngLat) {
      // Update Formik field with the full formatted address
      setFieldValue("location", selectedPlace.formatted_address);
    }
  }, [selectedPlace, searchLngLat, setFieldValue]);

  if (loadError) return <div></div>;
  if (!isLoaded) return <div></div>;

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace() as Place;
      setSelectedPlace(place);
      if (place.geometry && place.geometry.location) {
        setSearchLngLat({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
        options={{ fields: ["formatted_address", "geometry"] }}
      >
        {input}
      </Autocomplete>
    </div>
  );
};

export default Map;
