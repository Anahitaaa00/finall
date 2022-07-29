import React, {useContext, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View, Image, Modal, TextInput} from 'react-native';
import Loader from "../Loader/Loader";
import {Context} from "../../App";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";

export default function Profile() {
    const {firebase,firestore, auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const [error,setError] = useState('null')
    const [info,setInfo] = useState({email:'',name:''})
    const [messages , loading] = useCollection(
        firestore.collection('direct').orderBy('createAt')
    )
    const StartNewChat = async (secondMembereMail , chatName) =>{
        try{
            messages.docs.forEach(message =>{
                if((message.data().members.includes(secondMembereMail) && message.data().members.includes(user.email))
                || user.email == secondMembereMail
                || info.email.length ==0 || info.name.length ==0
                ){ throw new Error('Recurring mail')}
            })
            firestore.collection('direct').add({
                createAt: firebase.firestore.FieldValue.serverTimestamp(),
                chatName: chatName,
                members: [user.email,secondMembereMail],
                content: []
            })
            setInfo({email:'',name:''})
        }
        catch (e){
            setError(e.message)
        }

    }

    if(loading ){
        return <Loader />
    }
    return (
      <View >
        <View>
            <TextInput value={info.email} onChangeText={(e)=>setInfo({email:e,name:info.name})} placeholder='Member Email'></TextInput>
            <TextInput value={info.name} onChangeText={(e)=>setInfo({email:info.email,name:e})} placeholder='Chat name'></TextInput>
            <TouchableOpacity onPress={()=>StartNewChat(info.email,info.name) }><Text>Start new chat</Text></TouchableOpacity>
            {(error != 'null')?<Text> Error,Check if the data is correct</Text>:<></>}
        </View>
        <ScrollView>
            { messages.docs.filter(post=>post.data().members.includes(user.email)).map(message=>
                <View key ={message.id}>
                    <View>
                        <TouchableOpacity ><Text>{message.data().chatName}</Text> </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
      </View>
    );
  }


