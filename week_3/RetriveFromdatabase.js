import React,{useEffect,useState} from "react";
import {SafeAreaView,FlatList,View, StyleSheet} from 'react-native'
import {Text} from 'react-native-paper'
import SQLite from 'react-native-sqlite-storage'
import { Dropdown } from 'react-native-element-dropdown';
const db = SQLite.openDatabase({name:'quiz.db'},

(success)=>{
  console.log('success')
},

 (error)=>{
  console.log('error', error)
})
export default function ViewAllQuestions(){
    const [subject, setSubject] = React.useState('');
    const data = [
        { label: 'PF', value: 'PF' },
        { label: 'DS', value: 'DS' },
        { label: 'OOP', value: 'OOP' },
      ];

    let [questionData,setQuestionData] = useState([])

    useEffect(()=>{  //jab new data aye to refresh karta hai page ta ka new data bhi show ho
        fetchAllQuestions()
    },[])

    function fetchAllQuestions(){
        db.transaction(function(tx){
            if(subject=="PF"){
                tx.executeSql( 
                    'select *from question where subject=="PF"'
                    ,[subject]
                    ,function(t, result){
                        // let arr = []
                        // for(let i = 0; i < result.rows.length;i++){
                        //     arr.push(result.rows.item(i))
                        //    // console.log(`row : ${i} `,result.rows.item(i))
                        // }
                        let data = result.rows.raw()
                        console.log('data', data)
                        setQuestionData(data)
                    }
                    ,function(error){console.log(error)}
                    )
            }
            else if (subject=="OOP"){
                tx.executeSql( 
                    'select *from question where subject="OOP"'
                    ,[]
                    ,function(t, result){
                        // let arr = []
                        // for(let i = 0; i < result.rows.length;i++){
                        //     arr.push(result.rows.item(i))
                        //    // console.log(`row : ${i} `,result.rows.item(i))
                        // }
                        let data = result.rows.raw()
                        console.log('data', data)
                        setQuestionData(data)
                    }
                    ,function(error){console.log(error)}
                    )
            }
            else if (subject=="DSA"){
                tx.executeSql( 
                    'select *from question where subject="DSA"'
                    ,[]
                    ,function(t, result){
                        // let arr = []
                        // for(let i = 0; i < result.rows.length;i++){
                        //     arr.push(result.rows.item(i))
                        //    // console.log(`row : ${i} `,result.rows.item(i))
                        // }
                        let data = result.rows.raw()
                        console.log('data', data)
                        setQuestionData(data)
                    }
                    ,function(error){console.log(error)}
                    )
            }
         
        })
      }
    
    return (<SafeAreaView>
         <Dropdown
          style={styles.dropdown}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder='Select Subject'
          value={subject}
          onChange={item => {
            setSubject(item.value);
          }}
        />
        <FlatList
            data={questionData}
            renderItem={({item,index})=>{
                return (<View>
                    <Text>Subject : {item.subject}</Text>
                    <Text>Question : {item.question}</Text>
                    <Text>A : {item.optionA}</Text>
                    <Text>B : {item.optionB}</Text>
                    <Text>C : {item.optionC}</Text>
                    <Text>D : {item.optionD}</Text>
                </View>)
            }}
            keyExtractor={(item, index)=>index.toString()}
        />
        </SafeAreaView>)
       
}
const styles=StyleSheet.create({
    dropdown: {
        height: 45,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        marginBottom:5,
        paddingHorizontal:10
    
      }}
)