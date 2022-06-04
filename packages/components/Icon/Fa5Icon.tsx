import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme } from '@app/core';
import { Colors } from '@app/theme';

export type Fa5IconProps = React.ComponentProps<typeof FontAwesome5>;

const Fa5Icon: React.VFC<Fa5IconProps> = ({ name, size = 25, color, ...props }) => {
  const colorScheme = useColorScheme();

  return (
    <FontAwesome5 {...props} name={name} size={size} color={color ?? Colors[colorScheme].text} />
  );
};

const ComponentWrapper = React.memo(Fa5Icon);
export { ComponentWrapper as Fa5Icon };
