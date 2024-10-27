import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getData } from '../services/storage';

export default function LastActivity() {
   
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tarefas Concluídas</Text>
                <Text>Nenhuma tarefa concluída encontrada</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
