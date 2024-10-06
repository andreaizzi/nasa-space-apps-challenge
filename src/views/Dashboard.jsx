import {
  Box,
  SimpleGrid,
  Spinner
} from "@chakra-ui/react";
import Alert from "components/alerts/Alert";
import RiskIndex from "components/charts/RiskIndex";
import ComplexTable from "components/tables/ComplexTable";
import tableDataComplex from "data/complex-data.json";
import { columnsDataComplex } from "views/admin/default/variables/columnsData";
import alertsList from "data/alertData";
import { MdHome } from "react-icons/md";
import MapCard from "components/map/MapCard";
import { getWaterIndex, getVegetationIndex, getLastVegetationIndex } from "api/nasaGlamApi";
import { useState, useEffect } from "react";
import { getMeteomaticsData } from "api/meteomaticsApi";
import { calculateCropHealthScore } from "utils/formulas";
import { MdEco } from "react-icons/md";
import CitySelector from "components/map/CitySelector";

const Dashboard = () => {
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, long: -74.0060 })
  const date = '2024-09-21';

  // Independent states for water and vegetation index
  const [waterIndex, setWaterIndex] = useState(null);
  const [vegetationIndex, setVegetationIndex] = useState(null);
  const [loadingWater, setLoadingWater] = useState(true);
  const [loadingVegetation, setLoadingVegetation] = useState(true);
  const [loadingMeteomatics, setLoadingMeteomatics] = useState(true);
  const [errorWater, setErrorWater] = useState(null);
  const [errorVegetation, setErrorVegetation] = useState(null);
  const [errorMeteomatics, setErrorMeteomatics] = useState(null);
  const [meteomaticsData, setMeteomaticsData] = useState([]);
  const [cropHealthScore, setCropHealthScore] = useState(null);
  const [temperature, setTemperature] = useState(0);
  const [precipitation, setPrecipitation] = useState(0);
  const [solarRadiation, setSolarRadiation] = useState(0);

  // Fetch Water Index
  useEffect(() => {
    const fetchWaterIndex = async () => {
      setLoadingWater(true);
      setErrorWater(null);
      try {
        const waterData = await getWaterIndex({ date, ...coordinates });
        if (waterData?.value && waterData?.value !== "No Data") {
          setMeteomaticsData((prevData) => [
            {
              name: "Water Index",
              level: waterData.value.toFixed(2),
              status: waterData.value > 0.5 ? "Awesome" : (waterData.value > 0.3 ? "Fair" : "Bad"),
              progress: (waterData.value * 100).toFixed(2)
            },
            ...prevData
          ]);

          setWaterIndex(waterData.value);
        }
      } catch (error) {
        setWaterIndex(0.5); // Set a default value for the water index
        setErrorWater("Failed to fetch water index data");
      } finally {
        setLoadingWater(false);
      }
    };

    fetchWaterIndex();
  }, [coordinates, date]);

  useEffect(() => {
    const fetchVegetationIndex = async () => {
      setLoadingVegetation(true);
      setErrorVegetation(null);
      try {
        const vegetationData = await getVegetationIndex({ date, ...coordinates });

        if (vegetationData?.value && vegetationData?.value !== "No Data") {
          // Append the vegetation data to meteomaticsData without replacing it
          setMeteomaticsData((prevData) => [
            {
              name: "Vegetation Index",
              level: vegetationData.value.toFixed(2),
              status: vegetationData.value > 0.5 ? "Awesome" : (vegetationData.value > 0.3 ? "Fair" : "Bad"),
              progress: (vegetationData.value * 100).toFixed(2)
            },
            ...prevData
          ]);

          setVegetationIndex(vegetationData.value);
        }
      } catch (error) {
        setVegetationIndex(0.5); // Set a default value for the vegetation index
        setErrorVegetation("Failed to fetch vegetation index data");
      } finally {
        setLoadingVegetation(false);
      }
    };

    fetchVegetationIndex();
  }, [coordinates, date]);

  function temperatureToPercentage(temperature) {
    const minTemp = 0;  // 0°C is the minimum
    const maxTemp = 40; // 40°C is the maximum

    // Ensure the temperature is within the expected range
    if (temperature < minTemp) {
      temperature = minTemp;
    } else if (temperature > maxTemp) {
      temperature = maxTemp;
    }

    // Calculate the percentage
    return (((temperature - minTemp) / (maxTemp - minTemp)) * 100).toFixed(2);
  }


  // Fetch meteomatics data
  useEffect(() => {
    const fetchMeteomaticsData = async () => {
      setLoadingMeteomatics(true);
      setErrorMeteomatics(null);
      setMeteomaticsData([]); // Reset here when the fetch begins
      try {
        const fetchMeteomaticsData = await getMeteomaticsData({ ...coordinates });
        console.log("Meteomatics data", fetchMeteomaticsData);
        const metrics = [];
        fetchMeteomaticsData.data.forEach((metric, index) => {
          const parameter = metric.parameter;
          const value = metric.coordinates[0].dates[0].value; // Value of the metric
          const normalizedValue = (value * 100).toFixed(2); // Normalize the value to 0-100
          if (parameter === 't_-150cm:C') {  // Soil Temperature
            metrics.push({
              name: "Soil Temperature",
              level: value + '°C',
              status: value > 18 ? "Awesome" : (normalizedValue > 10 ? "Fair" : "Bad"),
              progress: temperatureToPercentage(value)
            });
            setTemperature(value);
          }
          if (parameter === 'soil_moisture_index_-150cm:idx') {  // Soil Moisture
            metrics.push({
              name: "Soil Moisture",
              level: normalizedValue + '%',
              status: normalizedValue > 50 ? "Awesome" : (normalizedValue > 30 ? "Fair" : "Bad"),
              progress: 0
            });
          }
          if (parameter === 'precip_3h:mm') {  // Precipitation
            metrics.push({
              name: "Precipitation",
              level: normalizedValue + '%',
              status: normalizedValue > 70 ? "Awesome" : (normalizedValue > 50 ? "Fair" : "Bad"),
              progress: normalizedValue
            });
            setPrecipitation(value);
          }
          if (parameter === 'global_rad:W') {  // Solar Radiation
            metrics.push({
              name: "Solar Radiation",
              level: value + 'W',
              status: value > 800 ? "Awesome" : (value > 500 ? "Fair" : "Bad"),
              progress: (value / 1000) * 100
            });
            setSolarRadiation(value);
          }
        });
        setMeteomaticsData(metrics);
      } catch (error) {
        setErrorMeteomatics("Failed to fetch meteomatics data");
      } finally {
        setLoadingMeteomatics(false);
      }
    };

    fetchMeteomaticsData();
  }, [coordinates, date]);
  useEffect(() => {
    if (meteomaticsData.length >= 6) { // we have all the datas we need
      setCropHealthScore(calculateCropHealthScore(temperature, precipitation, solarRadiation, vegetationIndex, waterIndex));
    }
  }, [meteomaticsData]);

  const handleCitySelect = (coordinates) => {
    setCoordinates(coordinates);
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* {loadingWater && <><Spinner /><br /><p>Loading water index...</p></>}
      {errorWater && <p>errorWater</p>}
      {waterIndex && <p>Water Index: {waterIndex.value}</p>}
      {loadingVegetation && <><Spinner /><br /><p>Loading vegetation index...</p></>}
      {errorVegetation && <p>errorVegetation</p>}
      {vegetationIndex && <p>Vegetation Index: {vegetationIndex.value}</p>}
      {loadingMeteomatics && <><Spinner /><br /><p>Loading meteomatics data...</p></>}
      {errorVegetation && <p>errorMeteomatic</p>}
      {meteomaticsData && <p>Meteomatics data: {JSON.stringify(meteomaticsData)}</p>} */}
      <CitySelector onSelectCity={handleCitySelect} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap='20px' mb='20px' alignItems="start">
        {cropHealthScore ? (
          <RiskIndex
            title="Crop Health Score"
            value={cropHealthScore}
            abbreviation="CHS"
            icon={MdEco}
            iconColor="#05CD99"
            iconBg="#9EFFD2"
          />
        ) : (
          "No data for selected city"
        )}

        {alertsList.map(alert => (
          <Alert
            key={alert.title} // Ensure unique key for each alert
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
          tableData={meteomaticsData}
        />
        <MapCard mapPos={[coordinates.lat, coordinates.long]} />
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
