import {
    Flex,
    Text
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import LeafletMap from './LeafletMap';

const MapCard = () => {
    return (
        <Card
            w="100%"
            px="0px"
        >
            <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
                <Text
                    fontSize="22px"
                    fontWeight="700"
                    lineHeight="100%"
                >
                    Map
                </Text>
            </Flex>
            <LeafletMap />
        </Card>);
};

export default MapCard;