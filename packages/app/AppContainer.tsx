import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import { useCachedResources, useColorScheme, SettingsProvider, GoalsProvider } from '@app/core';
import { default as theme } from './theme.json';
import { Navigation } from '@app/screens';

export const AppContainer: React.VFC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) return null;
  return (
    <ApplicationProvider {...eva} theme={{ ...eva[colorScheme], ...theme }}>
      <SafeAreaProvider>
        <SettingsProvider>
          <GoalsProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </GoalsProvider>
        </SettingsProvider>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};
