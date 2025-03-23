import React, { useState } from 'react';
import { View, FlatList, SafeAreaView,Image,Alert } from 'react-native';
import FAB from 'react-native-fab'
import { Button, Text } from 'react-native-paper';
import { preset } from '../jest.config';

const AttendanceScreen = () => {
  const [data, setData] = useState([
    { id: '1', regNo: '2020-arid-0054', name: 'Muhammad Shahid', status: 'P',Image:'asset:/students.jpg' },
    { id: '2', regNo: '2021-arid-0059', name: 'Muhammad Fahad', status: 'P',Image:'asset:/camerareal.png' },
    { id: '3', regNo: '2021-arid-0189', name: 'Saad Hussain', status: 'P',Image:'asset:/stress.png' },
    { id: '4', regNo: '2021-arid-0190', name: 'Muhammad Asad', status: 'P',Image:'asset:/students.jpg' },
  ]);

  const handlePress = (index) => {
    
    //console.log(newData)
    setData(pre=>{
      const newData = [...pre];
      if(newData[index].status == 'P'){
          newData[index].status = 'A'
      }else{
          newData[index].status = 'P'
      }
      return newData
    });
  };

  const renderItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10,margin:5,
    borderColor:'gray',borderWidth:1, borderRadius:4 }}>
      <View>
        <Text style={{fontSize:16, fontWeight:'bold'}}>Reg No: {item.regNo}</Text>
        <Text style={{fontSize:16, fontWeight:'bold'}}>Name: {item.name}</Text>
        <Image style={{width:50,height:50}} source={{uri:item.Image}}></Image>
      </View>
      <Button
        mode="contained"
        buttonColor={item.status == 'P' ? 'green':'red'}
        onPress={() => handlePress(index)}
      >
        {item.status}
      </Button>
    </View>
  );

 

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FAB buttonColor="green" iconTextColor="#FFFFFF" onClickAction={() => {Alert.alert('Present: 4\nAbsent: 0')}}  />
    </SafeAreaView>
  );
};

export default AttendanceScreen;