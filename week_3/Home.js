import react from 'react'
import { Provider as PaperProvider, Button,FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import SQLite from 'react-native-sqlite-storage'
const db = SQLite.openDatabase({ name: 'attendence.db', location: 'default'},(success)=>{
    console.log('success')
  },
  
   (error)=>{
    console.log('error', error)
  });






const action=()=>{
    
    navigation.navigate("Addsubject")
}


function Home(navigation,route){
    const [data, setData] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
         
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS course (code TEXT, title TEXT);'
          );
    
         
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS section (dicipline TEXT, semester TEXT);'
          );
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS enroll (image TEXT, regno TEXT,name TEXT);'
          );
          
          tx.executeSql('SELECT * FROM course;', [], (tx, results) => {
            const rows = results.rows;
            let items = [];
            for (let i = 0; i < rows.length; i++) {
              items.push(rows.item(i).title);
            }
            setData(items);
          });
        });
      }, []);

    return(
        <SafeAreaView style={styles.container}>
<PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {data.map((item, index) => (
          <Button
            key={index}
            mode="contained"
            onPress={() => console.log(item)}
            style={styles.button}
          >
            {item}
          </Button>
        ))}
      </ScrollView>
    </PaperProvider>

    <FAB icon="plus" onPress={action} small style={styles.fab} ></FAB>

        </SafeAreaView>
      
   


   
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    button: {
      marginVertical: 10,
      width: '100%',
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });
export default Home