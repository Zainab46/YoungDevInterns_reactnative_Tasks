import React from "react";
import { SafeAreaView } from "react-native-paper";
import SQLite from "react-native-sqlite-storage"
const db=SQLite.openDatabase({name:'Student.db'},(success)=>{console.log('success'),(error)=>{console.log('error',error)}})

const Testtostore = ()=>{

const [name,setname]=React.useState('')
const [cgpa,setcgpa]=React.useState(0)
const [aridno,setaridno]=React.useState(0)


function createstudent(){
    db.transaction(function(tx){
        db.executesql('create table if not exits student(aridno,name,cgpa)',
        [],(ts,result)=>{console.log(result)},(error)=>{console.log('error',error)})
    })
}

function insertstudent(){
    db.transaction(function(tx){
        db.executesql('insert into student values(?,?,?)',
        [name,cgpa,aridno],(ts,result)=>{console.log(result)},(error)=>{console.log('error',error)})
    })

}
createstudent()
insertstudent()

    return(<SafeAreaView>
        

    </SafeAreaView>)

}
export default Testtostore;