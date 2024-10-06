import React, { useState, useEffect } from 'react';
import { Select, Input, Button, Flex } from "@chakra-ui/react";

const cities = [
  { name: "Mirandola", coordinates: { lat: 44.8862, long: 11.0661 } },
  { name: "New York", coordinates: { lat: 40.7128, long: -74.0060 } },
  { name: "London", coordinates: { lat: 51.5074, long: -0.1278 } },
  { name: "Tokyo", coordinates: { lat: 35.6762, long: 139.6503 } },
  { name: "Sydney", coordinates: { lat: -33.8688, long: 151.2093 } },
  { name: "Marrakech", coordinates: { lat: 31.6295, long: -7.9811 } },
  { name: "Reykjavik", coordinates: { lat: 64.1265, long: -21.8174 } },
  { name: "Cusco", coordinates: { lat: -13.5320, long: -71.9675 } },
  { name: "Ubud", coordinates: { lat: -8.5069, long: 115.2625 } }
];

const CitySelector = ({ onSelectCity }) => {
  const [selectedCity, setSelectedCity] = useState("Mirandola");
  const [customLat, setCustomLat] = useState("");
  const [customLong, setCustomLong] = useState("");

  useEffect(() => {
    const defaultCity = cities.find(city => city.name === "Mirandola");
    if (defaultCity) {
      onSelectCity(defaultCity.coordinates);
    }
  }, [onSelectCity]);

  const handleCitySelect = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    const selectedCity = cities.find(city => city.name === cityName);
    if (selectedCity) {
      onSelectCity(selectedCity.coordinates);
    }
  };

  const handleCustomCoordinates = () => {
    const lat = parseFloat(customLat);
    const long = parseFloat(customLong);
    if (!isNaN(lat) && !isNaN(long)) {
      onSelectCity({ lat, long });
    } else {
      alert("Please enter valid coordinates");
    }
  };

  return (
    <Flex direction="column" gap={4}>
      <Select value={selectedCity} onChange={handleCitySelect} placeholder="Select a city">
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </Select>
      <Flex gap={2} mb={4}>
        <Input
          placeholder="Latitude"
          value={customLat}
          onChange={(e) => setCustomLat(e.target.value)}
        />
        <Input
          placeholder="Longitude"
          value={customLong}
          onChange={(e) => setCustomLong(e.target.value)}
        />
        <Button onClick={handleCustomCoordinates}>Apply</Button>
      </Flex>
    </Flex>
  );
};

export default CitySelector;