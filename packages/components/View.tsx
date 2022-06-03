import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { View as RnView, ViewProps as RnViewProps } from 'react-native';

export interface ViewProps extends RnViewProps {
  position?: 'center' | 'default';
}

const View: React.FC<ViewProps> = ({ children, position = 'default', ...props }) => {
  return (
    <RnView {...props} style={[styles.container[position], props.style]}>
      {children}
    </RnView>
  );
};

const styles = {
  container: {
    center: tw.style('flex-1 items-center justify-center'),
    default: tw.style(''),
  },
};

const ComponentWrapper = React.memo(View);
export { ComponentWrapper as View };
