import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { View } from './View';
import { Icon } from './Icon';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

interface SwipeActionProps {
  action: () => void;
  Icon: React.ReactNode;
  style: StyleProp<ViewStyle>;
}

interface SwipeWrapperProps {
  leftSwipe?: SwipeActionProps;
  rightSwipe?: SwipeActionProps;
}

const SwipeWrapper: React.FC<SwipeWrapperProps> = ({ children, rightSwipe, leftSwipe }) => {
  return (
    <Swipeable
      renderLeftActions={() => leftSwipe && <SwipeAction {...leftSwipe} />}
      renderRightActions={() => rightSwipe && <SwipeAction {...rightSwipe} />}
    >
      {children}
    </Swipeable>
  );
};

const SwipeAction: React.VFC<SwipeActionProps> = ({ action, Icon, style }) => (
  <View style={style}>
    <Pressable onPress={action}>{Icon}</Pressable>
  </View>
);

const ComponentWrapper = React.memo(SwipeWrapper);
export { ComponentWrapper as SwipeWrapper };
