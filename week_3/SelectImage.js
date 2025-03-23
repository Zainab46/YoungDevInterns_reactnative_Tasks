import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Button} from 'react-native-paper'
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

const SelectImage = () => {
  const [filePath, setFilePath] = useState({});

  async function requestCameraPermission () {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  async function requestExternalWritePermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  async function captureImage(type)  {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
    let response = await  launchCamera(options) 
        console.log('Response = ', response);
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response.assets[0]);
    }
  };

  async function chooseFile (type){
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    let response = await launchImageLibrary(options) 
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response.assets[0]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={{uri: filePath.uri}}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
       
      <Button
        style={{margin:5, width:250}}
        mode="contained"
        onPress={() => captureImage('photo')}>
        Launch Camera for Image
      </Button>
      <Button
        style={{margin:5, width:250}}
        mode="contained"
        onPress={() => chooseFile('photo')}>
       Choose Image
      </Button>
      </View>
    </SafeAreaView>
  );
};

export default SelectImage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
    },
    textStyle: {
      padding: 10,
      color: 'black',
      textAlign: 'center',
    },
    imageStyle: {
      width: 200,
      height: 200,
      margin: 5,
    },
  });