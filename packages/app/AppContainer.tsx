import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import { GoalsProvider, SettingsProvider, useCachedResources, useColorScheme } from '@app/core';
import { default as theme } from './theme.json';
import { Navigation } from '@app/screens';
import { HoldMenuProvider } from 'react-native-hold-menu';

export const AppContainer: React.VFC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) return null;
  return (
    <ApplicationProvider {...eva} theme={{ ...eva[colorScheme], ...theme }}>
      <SafeAreaProvider>
        <HoldMenuProvider theme={colorScheme}>
          <SettingsProvider>
            <GoalsProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </GoalsProvider>
          </SettingsProvider>
        </HoldMenuProvider>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};
