import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { addJob, deleteJob, editJob } from './redux/actions';

const Screen1 = ({ todos, addJob, deleteJob, editJob }) => {
    const [data, setData] = useState([]);
    const [txtJob, setJob] = useState('');
    useEffect(() => {
        fetchApi();
    }, []);
    const fetchApi = () => {
        fetch(
            'https://6541a6a8f0b8287df1fe9974.mockapi.io/user'
        ).then((response) => response.json())
            .then((json) => {
                setData(json);
            });
    }
    console.log("data" + data);

    const fnAddJob = () => {
        addJob(txtJob);
        setJob('');
    };

    console.log("todos" + todos);
    return (
        <View style={styles.container}>
            

            <TextInput style={{ width: 350, height: 30 ,fontsize:50,backgroundColor:'aqua',}} onChangeText={setJob} />
            <Pressable
                onPress={fnAddJob}
                style={{ backgroundColor: 'green', width: 200, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text> Thêm </Text>
            </Pressable>
            <View>
                <FlatList
                    data={data.job}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                    )}
                />
            </View>
            {todos.map((item) => {
                return (
                    <View style={{width:300, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} key={item.id}>
                        <Text>{item.id}</Text>
                        <Text>{item.txtJob}</Text>
                        <Pressable
                            style={{backgroundColor:'green'}}
                            onPress={() => {
                                deleteJob(item.id)
                            }} >
                            <Text>Xóa</Text>
                        </Pressable>
                    </View>
                )
            })}
            <Pressable onPress={()=>{
                editJob(1,'da update')
            }}>
                <Text>Update</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = (state) => ({
    todos: state.todos,
});

const mapDispatchToProps = {
    addJob,
    deleteJob,
    editJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen1);