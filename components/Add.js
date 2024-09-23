import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

export default function Add({ add }) {
  const [taskName, setTaskName] = useState('');

  const save = () => {
    if (taskName.trim()) { 
        add(taskName);
        setTaskName('');
    }
};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.form}
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
        placeholder="Enter task..."
      />
      <Pressable>
        <Text style = {styles.save} onPress={save}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 8,
  },
  form: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
  },
  save: {
    fontSize: 20,
    color: '#6CA6CD'
  }
});
