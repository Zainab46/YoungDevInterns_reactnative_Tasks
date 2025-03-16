import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';

import SQLite from 'react-native-sqlite-storage'
const db = SQLite.openDatabase({name:'quiz.db'},

(success)=>{
  console.log('success')
},

 (error)=>{
  console.log('error', error)
})

export default function QuestionForm() {
  const [subject, setSubject] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [optionA, setOptionA] = React.useState('');
  const [optionB, setOptionB] = React.useState('');
  const [optionC, setOptionC] = React.useState('');
  const [optionD, setOptionD] = React.useState('');
  const [correctOption, setCorrectOption] = React.useState('A'); // Default correct option is A

  function insertQuestion(){
    db.transaction(function(tx){
      tx.executeSql(
        'insert into question values(?,?,?,?,?,?,?)'
        ,[subject, question, optionA,optionB,
          optionC,optionD, correctOption]
        ,function(t, result){console.log(result)}
        ,function(error){console.log(error)}
        )
    })
  }
  function createQuestionTable(){
    db.transaction(function(tx){
      tx.executeSql(
        'Create table if not exists Question(subject text, question text, optionA text,optionB text,optionC text,optionD text,correctOption text)'
        ,[]
        ,function(t, result){console.log(result)}
        ,function(error){console.log(error)}
        )
    })
  }
  const handleSubmit = () => {
    // You can handle form submission here
    createQuestionTable()
    insertQuestion()
    console.log('Subject:', subject);
    console.log('Question:', question);
    console.log('Option A:', optionA);
    console.log('Option B:', optionB);
    console.log('Option C:', optionC);
    console.log('Option D:', optionD);
    console.log('Correct Option:', correctOption);
    // Add further logic for handling the form data (e.g., submitting to a server)
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Subject"
        value={subject}
        onChangeText={text => setSubject(text)}
        style={styles.input}
      />
      <TextInput
        label="Question"
        value={question}
        onChangeText={text => setQuestion(text)}
        style={styles.input}
        multiline
      />
      <TextInput
        label="Option A"
        value={optionA}
        onChangeText={text => setOptionA(text)}
        style={styles.input}
      />
      <TextInput
        label="Option B"
        value={optionB}
        onChangeText={text => setOptionB(text)}
        style={styles.input}
      />
      <TextInput
        label="Option C"
        value={optionC}
        onChangeText={text => setOptionC(text)}
        style={styles.input}
      />
      <TextInput
        label="Option D"
        value={optionD}
        onChangeText={text => setOptionD(text)}
        style={styles.input}
      />
      <View style={styles.radioGroup}>
        <RadioButton.Group
          onValueChange={newValue => setCorrectOption(newValue)}
          value={correctOption}
        >
          <RadioButton.Item label="A" value="A" />
          <RadioButton.Item label="B" value="B" />
          <RadioButton.Item label="C" value="C" />
          <RadioButton.Item label="D" value="D" />
        </RadioButton.Group>
      </View>
      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
