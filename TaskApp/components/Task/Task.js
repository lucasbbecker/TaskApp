import { StyleSheet, Text, View, Switch } from 'react-native';
import React, { useState } from 'react';

function Task({ nome, descricao, status, data }) {
    const [isChecked, setIsChecked] = useState(status === 'completed');

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Inverte o valor de isChecked
        if (!isChecked) {
            // Adicione a lógica para "LastActivity" aqui
        }
    };

    return (
        <View style={styles.card}>
            <Text style={styles.titulo}>{nome}</Text>    
            <Text style={styles.descricao}>{descricao}</Text>     
            <View style={styles.checkboxContainer}>
                <Switch
                    value={isChecked}
                    onValueChange={handleCheckboxChange}
                />
                <Text>{isChecked ? 'Completed' : 'Incomplete'}</Text>
            </View>
            <View style={styles.separator} />
            <Text style={styles.data}>{data}</Text>
            
        </View>
    );
}

export default Task;

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 14,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    } ,
    separator: {
        marginBottom: 10,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    data: {
        fontSize: 12,
        color: '#737373',
    },
    descricao: {
        fontSize: 15,
        color: '#737373',
    },
    titulo: {
        fontSize: 20,
        color: '#000000',
    },
});
