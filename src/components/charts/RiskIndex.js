import React from "react";
import PrettyIcon from "components/icons/PrettyIcon";
// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

import { MdEco } from "react-icons/md";

// Custom components
import Card from "components/card/Card.js";
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from "data/riskIndexData";

// Assets
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri'; // Import both icons

export default function RiskIndex(props) {
  const { ...rest } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Extract the last two values from the data array
  const data = barChartDataDailyTraffic[0].data;
  const lastValue = data[data.length - 1]; // 5.7
  const secondLastValue = data[data.length - 2]; // 4.2

  // Calculate the percentage difference
  const difference = (lastValue - secondLastValue)
  const isPositive = difference >= 0;
  return (
    <Card align='center' direction='column' w='100%' {...rest}>
      <Flex align={{ base: "start", xl: "start" }}
            justify={{ base: "space-between", xl: "space-between" }}
            alignItems="center" w="100%">

      

            <Box align='start' flexDirection='column' me='20px'>         
              <PrettyIcon
                icon={MdEco}
                backgroundColor={"#e4fff3"}
                iconColor={"#03C46B"}
              />
            </Box>
        <Flex flexDirection='column' align='center' w='100%'>
          <Flex w='100%'>
            <Text
              me='auto'
              color='secondaryGray.600'
              fontSize='20'
              fontWeight='500'>
              Crop Health Score
            </Text>
          </Flex>

          <Flex align='end' w='100%'> 
            <Text
              color={textColor}
              fontSize='64px'
              fontWeight='bold'
              lineHeight='100%'>
              5.7
            </Text>

            <Text
              ms='6px'
              color='secondaryGray.600'
              fontSize='32'
              fontWeight='500'>
              CHS
            </Text>
          </Flex>
        </Flex>
        
        <Flex align='end' ms='6px' alignItems='center'>
        <Icon  as={isPositive ? RiArrowUpSFill : RiArrowDownSFill} 
        color={isPositive ? 'green.500' : 'red.500'} 
        />
          <Text color={isPositive ? 'green.500' : 'red.500'} fontSize='sm' fontWeight='700'>
            {isPositive ? '+' : ''}{difference.toFixed(2)}
          </Text>
        </Flex>
      </Flex>
      <Box h='240px' mt='auto'>
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </Box>
    </Card>
  );
}