import * as React from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { RadioButton, Text,Button, TextInput } from 'react-native-paper';

const MyComponent = () => {
  const [value, setValue] = React.useState('first');
  
  return (
    <SafeAreaView style={{backgroundColor:'white'}}>
        <View>
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
        <Text style={{fontSize:20,marginBottom:20}}>What is the size of int in c++?</Text>
      <View style={{alignItems:'center',flexDirection:'row'}}>
        
        <RadioButton value="first" />
        <Text>1 byte</Text>
      </View>
      <View style={{alignItems:'center',flexDirection:'row'}}>
        
        <RadioButton value="second" />
        <Text>2 byte</Text>
      </View>
      <View style={{alignItems:'center',flexDirection:'row'}}>
        
        <RadioButton value="third" />
        <Text>3 byte</Text>
      </View>
      <View style={{alignItems:'center',flexDirection:'row'}}>
        
        <RadioButton value="forth" />
        <Text>4 byte</Text>
      </View>
      <Button style={{backgroundColor:'purple'}}> Next</Button>
      
      

      
    </RadioButton.Group>
    </View>
    </SafeAreaView>
  );
};

export default MyComponent;