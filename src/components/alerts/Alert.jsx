// Custom components
import Card from "components/card/Card.js";

import AlertTitle from "./AlertTitle";
import { Text, useColorModeValue } from "@chakra-ui/react";

const Alert = ({ title, body, headerTitle, icon, iconColor, bgIconColor }) => {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  return (
    <Card direction='column' w='100%'>
      <AlertTitle title={title} smallTitle={headerTitle} icon={icon} iconColor={iconColor} bgIconColor={bgIconColor} />
      <Text color={textColorSecondary} fontSize='md'>
        {body}
      </Text>
    </Card>
  );
};

export default Alert;
