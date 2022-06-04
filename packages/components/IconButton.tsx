import React from 'react';
import { Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon, IconProps } from './Icon';

interface IconButtonProps extends IconProps {
  onPress: () => void;
}

const IconButton: React.VFC<IconButtonProps> = ({ onPress, name, source }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Icon source={source} name={name} style={styles.icon} />
    </Pressable>
  );
};

const styles = {
  icon: tw.style('mr-4'),
};

const ComponentWrapper = React.memo(IconButton);
export { ComponentWrapper as IconButton };
