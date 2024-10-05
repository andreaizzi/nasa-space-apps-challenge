
// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components

import {
    Stat,
    StatLabel,
    StatNumber
} from "@chakra-ui/react";

// Assets
import PrettyIcon from "components/icons/PrettyIcon";

const AlertTitle = ({ title, smallTitle, icon, iconColor, bgIconColor }) => {
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    return (

        <Flex
            align={{ base: "start", xl: "start" }}
            justify={{ base: "start", xl: "start" }}
            alignItems="center"
            mb={"5px"}>
            <PrettyIcon
                icon={icon}
                backgroundColor={bgIconColor}
                iconColor={iconColor}
            />
            <Stat my='auto' ms={"18px"}>
                <StatLabel
                    lineHeight='100%'
                    color={"secondaryGray.600"}
                    fontSize={{
                        base: "sm",
                    }}>
                    {smallTitle}
                </StatLabel>
                <StatNumber
                    color={textColor}
                    fontSize={{
                        base: "xl",
                    }}>
                    {title}
                </StatNumber>
            </Stat>
        </Flex>
    );
};

export default AlertTitle;