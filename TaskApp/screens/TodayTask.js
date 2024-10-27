import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Task from '../components/Task/Task';
import { getData, storeData } from '../services/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

export default function TasksScreen() {

    const [inputValue, setInputValue] = useState("")
    const [inputDescription, setInputDescription] = useState("")
    const [date, setDate] = useState(new Date());
    const [inputDate, setInputDate] = useState('')
    const [show, setShow] = useState(false);

    const [modalVisible, setModalVisible] = useState(false)

    const [tasks, setTasks] = useState([])
    const [original, setOriginal] = useState([
        {
            id: 1,
            nome: "Estudar",
            descricao: "Estudar para DevInHouse",
            status: false,
            data: "18 set 2024"
        },
        {
            id: 2,
            nome: "Pagar boleto",
            descricao: "Pagar boleto do condominio de minas",
            status: false,
            data: "17 set 2024"
        },
        {
            id: 3,
            nome: "Estudar 2",
            descricao: "Estudar para Faculdade",
            status: false,
            data: "18 set 2024"
        },
    ]);


    const [search, setSearch] = useState("")

    useEffect(() => {
        async function getStorageData() {
            const _tasks = await getData('tasks')
            if (_tasks) {
                setOriginal(_tasks)
            }
        }

        getStorageData()
    }, [])


    useEffect(() => {
        console.log('usuario digitando no input de busca ou array Original foi alterado')
        const filtrado = original.filter(item =>
            item.nome.toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()))
        setTasks(filtrado)
    }, [search, original])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setInputDate(currentDate.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }));
    };

    const showDatepicker = () => {
        setShow(true);
    };


    function novaTarefa() {
        const newTask = {
            id: tasks.length + 1,
            nome: inputValue,
            descricao: inputDescription,
            status: false,
            data: inputDate
        }

        setOriginal(prev => [...prev, newTask])
        setModalVisible(false)
    }
    const currentDate = new Date().toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Today's Task</Text>
                        <Text style={{ fontSize: 16, color: '#333' }}>{currentDate}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.newTask}>
                        <MaterialCommunityIcons name="calendar-plus" size={24} color="#065FFB" />
                        <Text style={{ fontSize: 20, color: '#065FFB' }}>New Task</Text>
                    </TouchableOpacity>
                </View>

                <TextInput style={styles.searchInput} placeholder='Buscar tarefa' onChangeText={setSearch} value={search} />

                {tasks.length === 0 ?
                    <Text>Nao existem tarefas cadastradas</Text> : <></>}


                <View style={styles.list}>
                    {tasks.map(task => {
                        return <Task key={task.id}
                            nome={task.nome}
                            descricao={task.descricao}
                            status={task.status}
                            data={task.data} />
                    })}
                </View>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text>Nova Tarefa</Text>
                                <Text>Nome da tarefa:</Text>
                                <TextInput
                                    placeholder='Digite o nome da tarefa'
                                    value={inputValue} onChangeText={setInputValue} style={styles.searchInputModal} />
                                <Text>Descrição da tarefa:</Text>
                                <TextInput
                                    placeholder='Descrição da tarefa'
                                    value={inputDescription} onChangeText={setInputDescription} style={styles.searchInputModal} />
                            <Text>Data da tarefa:</Text>
                            <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
                                <Text>{inputDate ? inputDate : 'Escolha a data'}</Text>
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                            <View style={styles.buttonContainer}>
                                <Button title='Cancelar' onPress={() => setModalVisible(false)} />
                                <Button title='Salvar' onPress={novaTarefa} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 15,
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        marginHorizontal: 10,
        gap: 10,
        width: '95%',
        marginTop: 10
    },
    searchInput: {
        width: '90%',
        height: 35,
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        borderRadius: 10,
        alignSelf: 'center',
        width: '90%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        marginHorizontal: 30
    },
    modalView: {
        margin: 20,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    newTask: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E2EBFA',
        padding: 10,
        borderRadius: 15
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10
    },
    scrollViewContent: {
        paddingHorizontal: 5, 
        paddingBottom: 20, 
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10
    },
    datePicker: {
        width: '32%',
        height: 35,
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    searchInputModal: {
        width: '100%',
        height: 35,
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        borderRadius: 10,
    }
});