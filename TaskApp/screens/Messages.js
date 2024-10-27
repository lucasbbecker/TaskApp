import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Messages = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Nao há mensagens para serem lidas.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    message: {
        fontSize: 18,
        color: '#333',
    },
});

export default Messages;