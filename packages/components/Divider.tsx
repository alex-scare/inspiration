import React from 'react';
import { View, ViewProps } from './View';
import tw from 'tailwind-react-native-classnames';
import { useColorScheme } from '@app/core';

const Divider: React.VFC<ViewProps> = ({ style, ...props }) => {
  const color = useColorScheme();
  return <View style={[styles.container[color], style]} {...props} />;
};

const styles = {
  container: {
    light: tw.style('my-5 h-px w-4/5 bg-gray-900'),
    dark: tw.style('my-5 h-px w-4/5 bg-gray-300'),
  },
};

const ComponentWrapper = React.memo(Divider);
export { ComponentWrapper as Divider };
