import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@app/theme';
import { useColorScheme } from '@app/core';

type IconProps = React.ComponentProps<typeof FontAwesome>;

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const Icon: React.VFC<IconProps> = ({ name, color, size = 25, ...props }) => {
  const colorScheme = useColorScheme();

  return (
    <FontAwesome {...props} name={name} size={size} color={color ?? Colors[colorScheme].text} />
  );
};

const ComponentWrapper = React.memo(Icon);
export { ComponentWrapper as Icon };
