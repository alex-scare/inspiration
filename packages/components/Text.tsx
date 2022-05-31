import React from 'react';
import { Text as RnText, TextProps as RnTextProps } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useColorScheme } from '@app/core';

interface TextProps extends RnTextProps {
  variant?: 'body' | 'title' | 'link';
}

const Text: React.FC<TextProps> = ({ children, variant = 'body', ...props }) => {
  const color = useColorScheme();

  return (
    <RnText {...props} style={[styles.color[color], styles.container[variant], props.style]}>
      {children}
    </RnText>
  );
};

const styles = {
  container: {
    body: tw.style('text-base'),
    title: tw.style('text-xl font-bold'),
    link: tw.style('text-sm text-blue-600'),
  },
  color: {
    dark: tw.style('text-gray-300'),
    light: tw.style('text-gray-800'),
  },
};

const ComponentWrapper = React.memo(Text);
export { ComponentWrapper as Text };
