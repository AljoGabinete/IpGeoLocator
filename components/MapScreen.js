import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {LocationContext} from '../providers/LocationProvider';

const MapScreen = () => {
  const [location, setLocation] = useContext(LocationContext);
  const latitude = location[0];
  const longitude = location[1];
  const mapHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Simple Map</title>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet/dist/leaflet.css"
      />
      <style>
        #map {
          height: 90vh;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([${latitude}, ${longitude}], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);
        L.marker([${latitude}, ${longitude}]).addTo(map);
      </script>
    </body>
  </html>
  `;

  return (
    <View style={styles.container}>
      <WebView originWhitelist={['*']} source={{html: mapHtml}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
