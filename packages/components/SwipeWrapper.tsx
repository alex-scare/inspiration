import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { View } from './View';
import tw from 'tailwind-react-native-classnames';

interface SwipeActionProps {
  action: () => void;
  Icon: React.ReactNode;
  style: StyleProp<ViewStyle>;
}

interface SwipeWrapperProps
  extends Omit<Swipeable['props'], 'renderLeftActions' | 'renderRightActions'> {
  leftSwipe: SwipeActionProps;
  rightSwipe?: SwipeActionProps;
}

const SwipeWrapper = ({ rightSwipe, leftSwipe, children }: SwipeWrapperProps) => {
  return (
    <Swipeable
      renderLeftActions={() => leftSwipe && getSwipeAction(leftSwipe)}
      renderRightActions={() => rightSwipe && getSwipeAction(rightSwipe)}
    >
      {children}
    </Swipeable>
  );
};

const getSwipeAction = ({ action, Icon, style }: SwipeActionProps) => (
  <View style={[styles.action, style]}>
    <Pressable onPress={action}>{Icon}</Pressable>
  </View>
);

const styles = {
  action: tw.style('justify-center items-center p-2 w-14'),
};

const ComponentWrapper = React.memo(SwipeWrapper);
export { ComponentWrapper as SwipeWrapper };
