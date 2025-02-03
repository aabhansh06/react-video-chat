import React, { useState, useEffect } from 'react';

const CameraSelect = ({ onDeviceChange }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
      } catch (error) {
        console.error('Error getting devices:', error);
      }
    };

    getDevices();

    // Listen for device changes (e.g., when Iriun connects)
    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Camera
      </label>
      <select
        className="w-full rounded-md border border-gray-300 p-2"
        onChange={(e) => onDeviceChange(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Choose a camera...</option>
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${devices.indexOf(device) + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CameraSelect;
