import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@app/theme';
import { useColorScheme } from '@app/core';

export type IonIconType = React.ComponentProps<typeof Ionicons>;

const IonIcon: React.VFC<IonIconType> = ({ size = 25, color, name, ...props }) => {
  const colorScheme = useColorScheme();

  return <Ionicons {...props} name={name} size={size} color={color ?? Colors[colorScheme].text} />;
};

const ComponentWrapper = React.memo(IonIcon);
export { ComponentWrapper as IonIcon };
