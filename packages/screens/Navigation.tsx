import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import * as Linking from 'expo-linking';

import { EditGoalModal } from './modals';
import { NotFoundScreen, TabOneScreen, GoalsScreen } from './screens';
import { RootStackParamList, RootTabParamList, TabScreenProps } from './Navigator.types';

import { Colors } from '@app/theme';
import { useColorScheme } from '@app/core';
import { Icon, IconButton } from '@app/components';
import tw from 'tailwind-react-native-classnames';

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <NavigationContainer
      linking={linking}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Goal" component={EditGoalModal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={TabOneScreen}
        options={() => ({
          title: 'Main',
          tabBarIcon: ({ color }) => (
            <Icon source="Ion" style={tw.style('-mb-1')} name="today-outline" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Goals"
        component={GoalsScreen}
        options={({ navigation }: TabScreenProps<'Goals'>) => ({
          title: 'Your goals',
          tabBarIcon: ({ color }) => (
            <Icon source="Ion" style={tw.style('-mb-1')} name="list-outline" color={color} />
          ),
          headerRight: () => (
            <IconButton
              onPress={() => navigation.navigate('Goal', { mode: 'create' })}
              name="plus"
              source="FA"
            />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Main: {
            screens: {
              MainScreen: 'main',
            },
          },
          Goals: {
            screens: {
              GoalsScreen: 'goals',
            },
          },
        },
      },
      Goal: 'goal',
      NotFound: '*',
    },
  },
};
