import React from 'react';
import { Icon, IconFullName, IconSources, View } from '@app/components';
import tw from 'tailwind-react-native-classnames';
import { Pressable, ScrollView } from 'react-native';
import { useController, useFormContext } from 'react-hook-form';

const iconNames: Array<IconFullName> = [
  'FA.bed',
  'FA5.running',
  'FA5.walking',
  'Ion.body',
  'FA5.hiking',
  'FA5.skiing',
  'FA5.swimmer',
  'FA.bicycle',
  'Ion.baseball',
  'FA5.table-tennis',
  'FA5.seedling',
  'FA5.film',
  'FA5.guitar',
  'Ion.color-palette',
  'FA5.lightbulb',
  'Ion.bulb',
  'FA5.paw',
  'FA5.pencil-ruler',
  'FA.language',
  'FA5.fly',
  'FA5.ghost',
  'FA5.robot',
  'FA5.stethoscope',
  'FA5.sun',
  'Ion.car',
  'Ion.earth',
  'FA5.tablets',
  'FA5.hammer',
  'FA5.toolbox',
  'FA5.tools',
  'FA5.shopping-cart',
  'FA5.glass-cheers',
  'Ion.beer',
  'Ion.fast-food',
  'FA5.hamburger',
  'Ion.cafe',
  'FA5.glasses',
  'Ion.glasses',
  'Ion.headset',
  'Ion.home',
  'FA5.graduation-cap',
  'FA5.university',
  'FA5.school',
  'Ion.business',
  'FA5.scroll',
  'Ion.book',
  'Ion.library',
  'Ion.newspaper',
  'FA5.keyboard',
  'Ion.code-slash',
  'FA5.laptop-code',
  'Ion.logo-no-smoking',
  'FA5.spotify',
  'FA5.steam',
  'FA.tv',
  'Ion.game-controller-outline',
  'Ion.logo-xbox',
  'Ion.logo-playstation',
  'Ion.logo-github',
  'FA5.r-project',
  'FA5.java',
  'Ion.logo-javascript',
  'Ion.logo-nodejs',
  'Ion.logo-react',
  'FA5.swift',
  'Ion.logo-tux',
  'FA5.free-code-camp',
  'Ion.logo-stackoverflow',
  'Ion.logo-android',
  'Ion.logo-apple',
  'FA5.wikipedia-w',
  'Ion.logo-twitter',
  'Ion.logo-instagram',
  'Ion.logo-twitch',
  'Ion.logo-youtube',
];

interface IconListProps {
  name: string;
}

const IconList: React.VFC<IconListProps> = ({ name }) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({ control, name });

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        {iconNames.map((icon, i) => {
          const [source, name] = icon.split('.');
          return (
            <Pressable key={i} onPress={() => onChange(icon)}>
              <View style={[styles.iconWrapper, icon === value && styles.selected]}>
                <Icon source={source as IconSources} name={name} size={30} />
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = {
  scroll: tw.style('my-7 mb-16'),
  container: tw.style('flex flex-row flex-wrap justify-between mx-5'),
  iconWrapper: tw.style(' w-16 h-16 justify-center items-center'),
  selected: tw.style('bg-gray-700 rounded-full'),
};

const ComponentWrapper = React.memo(IconList);
export { ComponentWrapper as IconList };
