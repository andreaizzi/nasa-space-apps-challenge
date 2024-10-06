import React from 'react';

// Chakra imports
import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex align="center" direction="column" color='#03c46b'>
      <Heading as="h2" size="xl" my="32px">
        CropsMate
      </Heading>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
