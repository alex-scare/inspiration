import React from 'react';
import { View, ViewProps } from '../View';
import tw from 'tailwind-react-native-classnames';
import { Text } from '../Text';
import { useColorScheme } from '@app/core';

export interface ListItemProps extends Omit<ViewProps, 'children'> {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const ListItem: React.VFC<ListItemProps> = ({ title, style, left, right, ...props }) => {
  const color = useColorScheme();
  return (
    <View style={[styles.container, colors.container[color], style]} {...props}>
      <View style={[styles.main]}>
        <View style={styles.left}>{left}</View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View>{right}</View>
    </View>
  );
};

const styles = {
  container: tw.style('flex flex-nowrap flex-row justify-between items-center px-4 py-3'),
  main: tw.style('flex flex-nowrap flex-row justify-center items-center'),
  title: tw.style('px-3'),
  left: tw.style('w-8'),
};

const colors = {
  container: {
    dark: tw.style('bg-gray-900'),
    light: tw.style('bg-gray-300'),
  },
};

const ComponentWrapper = ListItem;
export { ComponentWrapper as ListItem };
