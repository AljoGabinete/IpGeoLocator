import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {IpProvider} from './providers/IpProvider';
import {LocationProvider} from './providers/LocationProvider';

const AppWithIpProvider = () => (
  <IpProvider>
    <LocationProvider>
      <App />
    </LocationProvider>
  </IpProvider>
);

AppRegistry.registerComponent(appName, () => AppWithIpProvider);
