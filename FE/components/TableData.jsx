import React, {Component, useState} from 'react';
import {StyleSheet, View, ScrollView, Text, Alert, Button, SafeAreaView, Modal} from 'react-native';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';


export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['ID', 'Name', 'Class', 'GPA', 'Address', 'Action'],
      widthArr: [100, 150, 80, 80, 300, 70],
    };
  }
  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const [showModal, setShowModal] = useState(false)
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 15; i += 1) {
      const rowData = [];
      for (let j = 0; j < 6; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
    const element = (data, index) => (
      <GestureHandlerRootView>
        <TouchableOpacity
          onPress={() => this._alertIndex(index)}
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
          onPress={() => this._alertIndex(index)}
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
    const handleCreate =() => {
      setShowModal(true);
    }
    const handleCloseModal = () => {
      setShowModal(false);
    }

    return (
      <SafeAreaView>
        <Modal visible={showModal}>
          <View>
            <Text>Hello</Text>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>


        </Modal>
        <View style={styles.container}>
        <Button title='Thêm' onPress={handleCreate}/>
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
                            cellIndex === 5
                              ? element(cellData, index)
                              : cellData
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
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#F1F8FF'},
  container: {padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#808B97'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 50, marginHorizontal: 10,marginVertical: 5, height: 18, borderRadius: 2,},
});
