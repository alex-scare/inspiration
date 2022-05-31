import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Icon } from './Icon';

interface IconButtonProps {
  onPress: () => void;
  iconName: React.ComponentProps<typeof FontAwesome>['name'];
}

const IconButton: React.VFC<IconButtonProps> = ({ onPress, iconName }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Icon name={iconName} style={styles.icon} />
    </Pressable>
  );
};

const styles = {
  icon: tw.style('mr-4'),
};

const ComponentWrapper = React.memo(IconButton);
export { ComponentWrapper as IconButton };
