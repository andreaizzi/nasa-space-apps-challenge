import { Flex, Text } from '@chakra-ui/react';
import Card from 'components/card/Card';
import LeafletMap from './LeafletMap';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const MapCard = (props) => {
  const [overlay, setOverlay] = useState('Vegetation');
  const { mapPos } = props;

    const [coordinates, setCoordinates] = useState(mapPos);
    useEffect(() => {
      setCoordinates(mapPos);
    }, [mapPos])
    

  return (
    <Card w="100%" px="0px">
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text fontSize="22px" fontWeight="700" lineHeight="100%">
          Map
        </Text>

        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton isActive={isOpen} as={Button} rightIcon="▾">
                {overlay}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setOverlay('Vegetation')}>
                  Vegetation index (NDVI)
                </MenuItem>
                <MenuItem onClick={() => setOverlay('Water')}>
                  Water index (NDWI)
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
      <LeafletMap overlay={overlay} mapPos={coordinates} />
    </Card>
  );
};

export default MapCard;