import react from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home'
import Addsubject from './Screens/Addsubject';
const Stack = createNativeStackNavigator();

function App(){
return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName='Home'>

      <Stack.Screen name='Home' component={Home}></Stack.Screen>
      <Stack.Screen name='Addsubject' component={Addsubject}></Stack.Screen>
    </Stack.Navigator>
  </NavigationContainer>
  );
};
export default App
