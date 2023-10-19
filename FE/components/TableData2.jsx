import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
  Button,
  SafeAreaView,
  Modal,
} from 'react-native';
import {
  GestureHandlerRootView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';

export default function TableData() {
  const state = {
    tableHead: ['ID', 'Name', 'Class', 'GPA', 'Address', 'Action'],
    widthArr: [100, 150, 80, 80, 300, 70],
  };
  const _alertIndex = index => {
    Alert.alert(`This is row ${index + 1}`);
  };
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [studentClass, setClass] = useState('');
  const [gpa, setGpa] = useState('');
  const [address, setAddress] = useState('');

  const handleAddStudent = () => {
    // Kiểm tra nếu có ít nhất một trường thông tin không được nhập
    if (!id || !name || !studentClass || !gpa || !address) {
      alert('Vui lòng điền đầy đủ thông tin.');
    } else {
      // Gửi thông tin sinh viên mới lên component cha
      createStudent();

      // Reset các trường thông tin sau khi thêm sinh viên thành công
      setId('');
      setName('');
      setClass('');
      setGpa('');
      setAddress('');
    }
  };
  const [list, setList] = useState([]);
  useEffect(() => {
    getListStudent();
  }, []);
  const getListStudent = () => {
    fetch('http://10.145.52.75:3000/', {
      method: 'GET',
    })
      .then(data => {
        console.log(data);
        return data.json();
      })
      .then(data => {
        if (data) {
          setList(data);
        }
      })
      .catch(err => console.log(err));
  };
  const createStudent = () => {
    fetch("http://10.145.52.75:3000/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            name: name,
            s_class: studentClass,
            gpa: gpa,
            address: address
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData)
            )
        })
        .catch(err => console.log(err));
}
  

  const [showModal, setShowModal] = useState(false);
  const tableData = [];
  list.map((student, index) => {
    const rowData = [];
    rowData.push(student.id);
    rowData.push(student.name);
    rowData.push(student.s_class);
    rowData.push(student.gpa);
    rowData.push(student.address);
    rowData.push('action');
    tableData.push(rowData);
  });

  const element = (data, index) => (
    <GestureHandlerRootView>
      <TouchableOpacity
        onPress={() => _alertIndex(index)}
        style={{display: 'flex'}}>
        <View style={styles.btn}>
          <Text
            style={{
              textAlign: 'center',
              color: 'red',
              padding: '5',
            }}>
            Delete
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => _alertIndex(index)}
        style={{display: 'flex'}}>
        <View style={styles.btn}>
          <Text
            style={{
              textAlign: 'center',
              color: 'blue',
              padding: '5',
            }}>
            Edit
          </Text>
        </View>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
  const handleCreate = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <SafeAreaView>
      <Modal visible={showModal}>
        <SafeAreaView>
          <View style={styles.containerRow}>
            <Text style={styles.text}>New Student</Text>
            <GestureHandlerRootView style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={handleCloseModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </GestureHandlerRootView>
          </View>
          <GestureHandlerRootView style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>ID:</Text>
              <TextInput
                style={styles.input}
                placeholder="ID"
                value={id}
                onChangeText={setId}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Class:</Text>
              <TextInput
                style={styles.input}
                placeholder="Class"
                value={studentClass}
                onChangeText={setClass}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>GPA:</Text>
              <TextInput
                style={styles.input}
                placeholder="GPA"
                value={gpa}
                onChangeText={setGpa}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address:</Text>
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
            </View>
            <Button
              title="Add Student"
              style={{marginVertical: 50}}
              onPress={handleAddStudent}
            />
          </GestureHandlerRootView>
        </SafeAreaView>
      </Modal>
      <View style={styles.container}>
        <Button title="Thêm" onPress={handleCreate} />
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#000'}}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#000'}}>
                {tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        width={state.widthArr[cellIndex]}
                        data={
                          cellIndex === 5 ? element(cellData, index) : cellData
                        }
                        textStyle={styles.text}
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', margin: 20},
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {height: 50, backgroundColor: '#F1F8FF'},
  container: {padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#808B97'},
  text: {margin: 6, fontSize: 18, fontWeight: 'bold'},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {
    width: 50,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 18,
    borderRadius: 2,
  },
  closeButtonContainer: {
    marginLeft: 'auto',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    flex: 2,
  },
  input: {
    flex: 7,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});
