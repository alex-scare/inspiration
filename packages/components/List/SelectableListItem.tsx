import React from 'react';
import { ListItem, ListItemProps } from './ListItem';
import { Pressable } from 'react-native';
import { Icon } from '../Icon';
import tw from 'tailwind-react-native-classnames';

interface SelectableListItemProps extends ListItemProps {
  selected: boolean;
  onSelect: () => void;
}

const SelectableListItem = ({ onSelect, selected, style, ...props }: SelectableListItemProps) => {
  return (
    <Pressable onPress={onSelect}>
      <ListItem
        right={<Icon source="Ion" name={selected ? 'checkbox-outline' : 'square-outline'} />}
        {...props}
        style={[selected ? styles.selected : styles.nonSelected, style]}
      />
    </Pressable>
  );
};

const styles = {
  selected: tw.style('bg-green-700 m-0.5 mx-1'),
  nonSelected: tw.style('bg-gray-700'),
};

const ComponentWrapper = React.memo(SelectableListItem);
export { ComponentWrapper as SelectableListItem };
