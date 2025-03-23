import * as React from 'react';
import { Alert, View } from 'react-native';
import { RadioButton, Text,Button, TextInput } from 'react-native-paper';

const MyComponent = () => {
  const [value, setValue] = React.useState('first');
  const[quantity,setquantity]=React.useState(10);
  const [result,setResult]=React.useState(0);
  return (
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
        <Text style={{fontSize:20,fontWeight:'200',marginBottom:20,marginLeft:80}}>Select Your Drink</Text>
      <View style={{alignItems:'center',flexDirection:'row'}}>
        
        <RadioButton value="first" />
        <Text>Tea</Text>
      </View>
      <View style={{alignItems:'center',flexDirection:'row'}}>
        
        <RadioButton value="second" />
        <Text>Coffe</Text>
      </View>
      <View style={{alignItems:'center',flexDirection:'row'}}>
        
        <RadioButton value="third" />
        <Text>Cold Drink</Text>
      </View>
      <TextInput label={'Enter the quantity'} style={{borderWidth:1,borderColor:'black'}} onChangeText={text=>{setquantity(text)}}/>
      <Button onPress={()=>{if(value=='first'){let res=70*quantity
      setResult(res)}
      else if (value=='second'){res=120*quantity 
      setResult(res)}
      else if (value=='third'){res=50*quantity 
      setResult(res)}}}> Show Bill</Button>
      <Text>Your Total bill is {result}</Text>
      

      
    </RadioButton.Group>
  );
};

export default MyComponent;