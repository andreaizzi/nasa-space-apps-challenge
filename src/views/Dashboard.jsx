import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  SimpleGrid,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import Alert from "components/alerts/Alert";
import RiskIndex from "components/charts/RiskIndex";
import ComplexTable from "components/tables/ComplexTable";
import { columnsDataComplex } from "views/admin/default/variables/columnsData";
import alertsList from "data/alertData";
import { MdEco } from "react-icons/md";
import MapCard from "components/map/MapCard";
import { getWaterIndex, getVegetationIndex } from "api/nasaGlamApi";
import { getMeteomaticsData } from "api/meteomaticsApi";
import { calculateCropHealthScore } from "utils/formulas";
import CitySelector from "components/map/CitySelector";

const Dashboard = () => {
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, long: -74.0060 });
  const [date] = useState('2024-09-21');
  const [data, setData] = useState({
    waterIndex: null,
    vegetationIndex: null,
    meteomaticsData: [],
    cropHealthScore: null,
  });
  const [loading, setLoading] = useState({
    water: true,
    vegetation: true,
    meteomatics: true,
  });
  const [error, setError] = useState({
    water: null,
    vegetation: null,
    meteomatics: null,
  });

  const fetchData = useCallback(async () => {
    setLoading({ water: true, vegetation: true, meteomatics: true });
    setError({ water: null, vegetation: null, meteomatics: null });

    try {
      const [waterData, vegetationData, meteomaticsData] = await Promise.all([
        getWaterIndex({ date, ...coordinates }),
        getVegetationIndex({ date, ...coordinates }),
        getMeteomaticsData({ ...coordinates }),
      ]);

      const processedMeteomaticsData = processMeteomaticsData(meteomaticsData);
      const waterIndex = processWaterIndex(waterData);
      const vegetationIndex = processVegetationIndex(vegetationData);
      
      const cropHealthScore = calculateCropHealthScore(
        processedMeteomaticsData.temperature,
        processedMeteomaticsData.precipitation,
        processedMeteomaticsData.solarRadiation,
        vegetationIndex,
        waterIndex
      );

      setData({
        waterIndex,
        vegetationIndex,
        meteomaticsData: processedMeteomaticsData.metrics,
        cropHealthScore,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError({
        water: "Failed to fetch water index",
        vegetation: "Failed to fetch vegetation index",
        meteomatics: "Failed to fetch meteomatics data",
      });
    } finally {
      setLoading({ water: false, vegetation: false, meteomatics: false });
    }
  }, [coordinates, date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCitySelect = (newCoordinates) => {
    setCoordinates(newCoordinates);
  };

  if (Object.values(loading).some(Boolean)) {
    return (
      <Center h="100vh">
        <Spinner />
        <Text ml={3}>Loading data...</Text>
      </Center>
    );
  }

  if (Object.values(error).some(Boolean)) {
    return (
      <Center h="100vh">
        <Text color="red.500">Error loading data. Please try again later.</Text>
      </Center>
    );
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <CitySelector onSelectCity={handleCitySelect} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap='20px' mb='20px' alignItems="start">
        {data.cropHealthScore !== null && (
          <RiskIndex
            title="Crop Health Score"
            value={data.cropHealthScore}
            abbreviation="CHS"
            icon={MdEco}
            iconColor="#05CD99"
            iconBg="#9EFFD2"
          />
        )}

        {alertsList.map(alert => (
          <Alert
            key={alert.title}
            title={alert.title}
            body={alert.body}
            headerTitle={alert.headerTitle}
            smallTitle={alert.headerSmallTitle}
            icon={alert.icon}
            iconColor={alert.iconColor}
            bgIconColor={alert.bgIconColor}
          />
        ))}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={data.meteomaticsData}
        />
        <MapCard mapPos={[coordinates.lat, coordinates.long]} />
      </SimpleGrid>
    </Box>
  );
};

// Helper functions
const processMeteomaticsData = (meteomaticsData) => {
  let temperature = 0;
  let precipitation = 0;
  let solarRadiation = 0;
  const metrics = [];

  meteomaticsData.data.forEach((metric) => {
    const { parameter } = metric;
    const value = metric.coordinates[0].dates[0].value;
    const normalizedValue = (value * 100).toFixed(2);

    switch (parameter) {
      case 't_-150cm:C':
        temperature = value;
        metrics.push(createMetric("Soil Temperature", `${value}°C`, value, temperatureToPercentage(value)));
        break;
      case 'soil_moisture_index_-150cm:idx':
        metrics.push(createMetric("Soil Moisture", `${normalizedValue}%`, normalizedValue));
        break;
      case 'precip_3h:mm':
        precipitation = value;
        metrics.push(createMetric("Precipitation", `${normalizedValue}%`, normalizedValue, normalizedValue));
        break;
      case 'global_rad:W':
        solarRadiation = value;
        metrics.push(createMetric("Solar Radiation", `${value}W`, value, (value / 1000) * 100));
        break;
    }
  });

  return { metrics, temperature, precipitation, solarRadiation };
};

const processWaterIndex = (waterData) => {
  if (waterData?.value && waterData.value !== "No Data") {
    return waterData.value;
  }
  return 0.5; // Default value
};

const processVegetationIndex = (vegetationData) => {
  if (vegetationData?.value && vegetationData.value !== "No Data") {
    return vegetationData.value;
  }
  return 0.5; // Default value
};

const createMetric = (name, level, value, progress = 0) => ({
  name,
  level,
  status: value > 50 ? "Awesome" : (value > 30 ? "Fair" : "Bad"),
  progress: progress.toFixed(2),
});

const temperatureToPercentage = (temperature) => {
  const minTemp = 0;
  const maxTemp = 40;
  const clampedTemp = Math.min(Math.max(temperature, minTemp), maxTemp);
  return ((clampedTemp - minTemp) / (maxTemp - minTemp)) * 100;
};

export default Dashboard;