import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import {IpContext} from '../providers/IpProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopBar = () => {
  const [ip, setIp] = useContext(IpContext);
  const [inputValue, setInputValue] = useState();
  const [searchHistory, setSearchHistory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const saveSearchHistory = async () => {
      try {
        await AsyncStorage.setItem(
          'searchHistory',
          JSON.stringify(searchHistory),
        );
      } catch (error) {
        console.log('Error storing search history:', error);
      }
    };

    saveSearchHistory();
  }, [searchHistory]);

  const handleMessageChange = input => {
    setInputValue(input);
  };

  const handleButtonPress = async () => {
    setIp(inputValue);
    setSearchHistory(prevHistory => [...prevHistory, inputValue]);
    try {
      await AsyncStorage.setItem(
        'searchHistory',
        JSON.stringify(searchHistory),
      );
    } catch (error) {
      console.log('Error storing search history:', error);
    }
  };

  const handleClearPress = () => {
    setIp();
    setInputValue('');
  };

  const handleViewHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      const parsedHistory = JSON.parse(history);
      setSearchHistory(parsedHistory);
      setIsModalVisible(true);
    } catch (error) {
      console.log('Error retrieving search history:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleHistoryPress = ipHistory => {
    setIp(ipHistory);
    setIsModalVisible(false);
    setInputValue(ipHistory);
  };

  return (
    <SafeAreaView style={styles.topBar}>
      <Text style={styles.header}> IP Locator</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter an IP Address"
          style={styles.input}
          onChangeText={handleMessageChange}
          value={inputValue}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClearPress}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={handleViewHistory}>
        <Text style={styles.buttonText}>View History</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Search History</Text>
            {searchHistory.map((item, index) => (
              <FlatList
                key={index}
                data={searchHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => handleHistoryPress(item)}
                    style={styles.historyItemWrapper}>
                    <Text style={styles.historyItem}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={handleCloseModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    width: '60%',
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  historyButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '50%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    marginBottom: 5,
  },
  modalCloseButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '50%',
  },

  historyItemWrapper: {
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'lightgray',
  },
});

export default TopBar;
