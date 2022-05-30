import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { useCachedResources, useColorScheme, SettingsProvider } from '@app/core';
import { Navigation } from '@app/screens';

export const AppContainer: React.VFC = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SettingsProvider>
    </SafeAreaProvider>
  );
};
