import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@app/theme';
import { useColorScheme } from '@app/core';

export type FaIconProps = React.ComponentProps<typeof FontAwesome>;

const FaIcon: React.VFC<FaIconProps> = ({ name, size = 25, color, ...props }) => {
  const colorScheme = useColorScheme();

  return (
    <FontAwesome {...props} name={name} size={size} color={color ?? Colors[colorScheme].text} />
  );
};

const ComponentWrapper = React.memo(FaIcon);
export { ComponentWrapper as FaIcon };
