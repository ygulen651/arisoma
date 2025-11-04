'use client';

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.9946,
  lng: 28.8709,
};

const InteractiveMap = () => {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return (
      <div className="h-96 w-full bg-gray-100 flex items-center justify-center">
        <p>Harita yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-96">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default InteractiveMap;
