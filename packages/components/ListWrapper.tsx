import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { View, ViewProps } from './View';
import { ScrollView } from 'react-native';

const ListWrapper = ({ children }: ViewProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.list}>{children}</View>
    </ScrollView>
  );
};

const styles = {
  list: tw.style('rounded-md m-3 overflow-hidden'),
  container: tw.style('flex'),
};

const ComponentWrapper = React.memo(ListWrapper);
export { ComponentWrapper as ListWrapper };
