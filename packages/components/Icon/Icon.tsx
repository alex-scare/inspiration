import React, { useMemo } from 'react';
import { Fa5Icon, Fa5IconProps } from './Fa5Icon';
import { FaIcon, FaIconProps } from './FaIcon';
import { IonIcon, IonIconType } from './IonIcon';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { View } from '../View';

export type IconSources = 'FA' | 'FA5' | 'Ion';
export type IconName = FaIconProps['name'] & IonIconType['name'] & Fa5IconProps['name'];
export type IconFullName = `${IconSources}.${IconName}`;

export interface IconProps {
  source: IconSources;
  name: IconName;
  color?: string;
  size?: number;
  style?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const Icon = ({ source = 'FA', color, size = 25, name, style, viewStyle }: IconProps) => {
  const IconComponent = useMemo(() => {
    const iconStyle = [styles.icon, style];
    switch (source) {
      case 'FA':
        return <FaIcon size={size} color={color} name={name} style={iconStyle} />;
      case 'FA5':
        return <Fa5Icon size={size} color={color} name={name} style={iconStyle} />;
      case 'Ion':
        return <IonIcon size={size} color={color} name={name} style={iconStyle} />;
    }
  }, [source, size, color, name, style]);

  return <View style={[styles.container, viewStyle]}>{IconComponent}</View>;
};

const styles = {
  container: tw.style('justify-center items-center'),
  icon: tw.style(''),
};

const ComponentWrapper = React.memo(Icon);
export { ComponentWrapper as Icon };
