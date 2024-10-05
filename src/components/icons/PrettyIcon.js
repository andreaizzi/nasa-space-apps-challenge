import React from 'react';
import { Icon } from "@chakra-ui/react";
import IconBox from "components/icons/IconBox";

const PrettyIcon = ({ icon, iconColor, backgroundColor }) => {
  return (
    <IconBox
      w='45px'
      h='45px'
      bg={backgroundColor}
      icon={
        <Icon w='24px' h='24px' as={icon} color={iconColor} />
      }
    />
  );
};

export default PrettyIcon;