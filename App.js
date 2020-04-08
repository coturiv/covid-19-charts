import React, { useState } from 'react';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppContainer from './src/components/AppContainer';
import { initFilesystem } from './src/libs/reportFiles';
import { initRepository } from './src/repository/repository';

export default function App({ skipLoadingScreen }) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
          // "space-mono": require("./src/assets/fonts/SpaceMono-Regular.ttf")
        });

        await initFilesystem();
        await initRepository();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return null;
  }
  return <AppContainer />;
}
