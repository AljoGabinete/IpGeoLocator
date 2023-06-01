import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {IpContext} from '../providers/IpProvider';
import {getIpDetails} from '../services/IpServices';
import {LocationContext} from '../providers/LocationProvider';

const ipDetails = () => {
  const [ip, setIp] = useContext(IpContext);
  const [location, setLocation] = useContext(LocationContext);
  const [ipDetails, setIpDetails] = useState(null);

  useEffect(() => {
    const fetchIpDetails = async () => {
      try {
        const details = await getIpDetails(ip);
        console.log(details);
        const transformedDetails = await transformIpDetails(details);
        const ipLocation =
          transformedDetails &&
          transformedDetails.find(item => item.key === 'loc');
        const ipLocationArray = ipLocation.value.split(',');
        setLocation(ipLocationArray);
        setIpDetails(transformedDetails);
      } catch (error) {
        Alert.alert('Error', 'Please Enter a Valid IP Address');
        return;
      }
    };
    fetchIpDetails();
  }, [ip]);

  const transformIpDetails = details => {
    return Object.entries(details).map(([key, value]) => ({key, value}));
  };

  return (
    <View style={styles.container}>
      {ipDetails &&
        ipDetails.map(({key, value}) => (
          <View key={key} style={styles.row}>
            <Text style={styles.key}>{key}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  row: {
    height: 40,
    flexDirection: 'row',
  },
  key: {
    flex: 1,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRightWidth: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  value: {
    flex: 2,
    borderWidth: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ipDetails;
