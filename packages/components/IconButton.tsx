import React from 'react';
import { Pressable } from 'react-native';
import { Icon, IconProps } from './Icon';

interface IconButtonProps extends IconProps {
  onPress: () => void;
}

const IconButton: React.VFC<IconButtonProps> = ({ onPress, name, source, ...props }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Icon source={source} name={name} {...props} />
    </Pressable>
  );
};

const ComponentWrapper = React.memo(IconButton);
export { ComponentWrapper as IconButton };
