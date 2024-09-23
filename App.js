import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Add from './components/Add'
import Row from './components/Row'
import { useState, useCallback, useEffect } from 'react'
import Constants from 'expo-constants'
import 'react-native-get-random-values' 
import { v4 as uuidv4 } from 'uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'task_data'

export default function App() {
  const [task, setTask] = useState([])
  const [selectedId, setSelectedId] = useState()

  const add = useCallback((taskName) => {
    const newItem = {
      id: uuidv4(),
      taskName: taskName,
      done: false
    };
    const tempData = [...task, newItem];
    setTask(tempData);
  }, [task]);

  const select = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const updateTask = useCallback((id) => {
    setTask((prevTasks) => 
        prevTasks.map(task => 
            task.id === id ? { ...task, done: !task.done } : task
        )
    );
}, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      let json = value ? JSON.parse(value) : [];
      setTask(json);
    } catch (ex) {
      console.log('Error fetching data:', ex);
    }
  };

  const storeData = async (value) => {
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, json);
    } catch (ex) {
      console.log('Error saving data:', ex);
    }
  };

  useEffect(() => {
    if (task.length > 0) {
      storeData(task);
    }
  }, [task]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>TODO List</Text>
      <Add add = {add} />
      <FlatList
        data={task}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        renderItem={({ item }) => (
          <Row
            item={item}
            updateTask={updateTask} 

          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    margin: 32,
    fontWeight: 'bold',
    fontSize: 32,
  }
});
