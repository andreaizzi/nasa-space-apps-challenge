/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  GridItem,
  SimpleGrid
} from "@chakra-ui/react";
import Alert from "components/alerts/Alert";
// Assets
import RiskIndex from "components/charts/RiskIndex";
import ComplexTable from "components/tables/ComplexTable";
import tableDataComplex from "data/complex-data.json";
import {
  columnsDataComplex
} from "views/admin/default/variables/columnsData";
import alertsList from "data/alertData";
import { MdHome } from "react-icons/md";
import MapCard from "components/map/MapCard";

export default function Dashboard() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
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

        {alertsList.forEach(alert => {
          <Alert
            title={alert.title}
            body={alert.body}
            headerTitle={alert.headerTitle}
            smallTitle={alert.headerSmallTitle}
            icon={alert.icon}
            iconColor={alert.iconColor}
            bgIconColor={alert.bgIconColor} />

        })}
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
