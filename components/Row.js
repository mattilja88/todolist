import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Row({ item, updateTask }) {
    return (
        <Pressable style={styles.row} onPress={() => updateTask(item.id)}>
            <Text style={[styles.rowText, item.done && { textDecorationLine: 'line-through' }]}>
                {item.taskName}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        fontSize: 16,
        padding: 2,
        margin: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowText: {
        fontSize: 16,
        padding: 2,
        margin: 2,
    },
});