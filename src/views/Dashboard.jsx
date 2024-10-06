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

const Dashboard = () => {
  const [coordinates, setCoordinates] = useState({ lat: 10.719212, long: 44.736369 })
  const date = '2024-09-21';

  // Independent states for water and vegetation index
  const [waterIndex, setWaterIndex] = useState(null);
  const [vegetationIndex, setVegetationIndex] = useState(null);
  const [loadingWater, setLoadingWater] = useState(true);
  const [loadingVegetation, setLoadingVegetation] = useState(true);
  const [errorWater, setErrorWater] = useState(null);
  const [errorVegetation, setErrorVegetation] = useState(null);

  // Fetch Water Index
  useEffect(() => {
    const fetchWaterIndex = async () => {
      setLoadingWater(true);
      setErrorWater(null);
      try {
        const waterData = await getWaterIndex({ date, ...coordinates });
        setWaterIndex(waterData);
      } catch (error) {
        setErrorWater("Failed to fetch water index data");
      } finally {
        setLoadingWater(false);
      }
    };

    fetchWaterIndex();
  }, [coordinates, date]);

  // Fetch Vegetation Index
  useEffect(() => {
    const fetchVegetationIndex = async () => {
      setLoadingVegetation(true);
      setErrorVegetation(null);
      try {
        const vegetationData = await getVegetationIndex({ date, ...coordinates });
        setVegetationIndex(vegetationData);
      } catch (error) {
        setErrorVegetation("Failed to fetch vegetation index data");
      } finally {
        setLoadingVegetation(false);
      }
    };

    fetchVegetationIndex();
  }, [coordinates, date]);
  console.log(waterIndex, vegetationIndex);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    {loadingWater && <><Spinner /><br /><p>Loading water index...</p></>}
    {errorWater && <p>errorWater</p>}
    {waterIndex && <p>Water Index: {waterIndex.value}</p>}
    {loadingVegetation && <><Spinner /><br /><p>Loading vegetation index...</p></>}
    {errorVegetation && <p>errorVegetation</p>}
    {vegetationIndex && <p>Vegetation Index: {vegetationIndex.value}</p>}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        gap='20px'
        mb='20px'>
        <Alert
          title="High Drought risk for the next week!"
          body="The next week will be very dry, make sure to water your crops properly."
          headerTitle="Drought Alert"
          icon={MdHome}
          iconColor="red.600"
          bgIconColor="red.100" />
        <Alert
          title="High Drought risk for the next week!"
          body="The next week will be very dry, make sure to water your crops properly."
          headerTitle="Drought Alert"
          icon={MdHome}
          iconColor="red.600"
          bgIconColor="red.100" />

        {/* Use map instead of forEach to render list */}
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

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap='20px' mb='20px'>
        <RiskIndex />
        <RiskIndex />
        <RiskIndex />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px' mb='20px'>
        <ComplexTable
          rowSpan={2}
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <MapCard />
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
