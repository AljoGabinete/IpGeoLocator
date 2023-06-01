import React, {useState} from 'react';
import IpDetails from './components/IpDetails';
import TopBar from './components/TopBar';
import MapScreen from './components/MapScreen';
import {ScrollView} from 'react-native';

const App = () => {
  return (
    <>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <TopBar />
        <IpDetails />
        <MapScreen />
      </ScrollView>
    </>
  );
};

export default App;
