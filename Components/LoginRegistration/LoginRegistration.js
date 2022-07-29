import React, {useContext} from "react";
import {TouchableOpacity,  Text, View , TextInput  ,StyleSheet} from 'react-native';

import {useState} from "react";
import {Context} from "../../App";

export default function LoginRegistration() {
    const [logInfo, setLogInfo] = useState({email: '', pass: '' , passConfirm:'',name:'',img:''});
    const [logOrReg , setLogOrReg] = useState('log')
    const [error,setErrorType] = useState('null')
    const {auth} = useContext(Context)
    const Registration = async ()=>{
        try {
            if(logInfo.pass.length <6) throw new Error('pass-lenght')
            if(logInfo.pass != logInfo.passConfirm) throw new Error('pass-not-confirm')
            const {user} = await auth.createUserWithEmailAndPassword(logInfo.email,logInfo.pass);
            await user.updateProfile({
                displayName: logInfo.name,
                photoURL:logInfo.img,
            })

        }
        catch (e){
            setErrorType(e.message)

        }
        finally {
            setLogInfo({email: '', pass: '' , passConfirm:'',name:'',img:''});
        }
    }
    const Logining = async ()=>{
        try {
            await auth.signInWithEmailAndPassword(logInfo.email,logInfo.pass);
        }
        catch (e){
            setErrorType(e.message)
        }
        finally {
            setLogInfo({email: '', pass: '' , passConfirm:'',name:'',img:''});
        }

    }
    return (
        <View>
            {(logOrReg =='log') ? LogForm() :RegForm()}
            <TouchableOpacity style = {styles.appButtonContainer } onPress={ ()=>{setErrorType('null'); setLogInfo({email: '', pass: '' , passConfirm:'',name:'',img:''}); setLogOrReg((logOrReg =='log') ?'reg':'log')  }}  ><Text style = {styles.appButtonText}>{(logOrReg =='log') ?'Sign Up':'Sign In'} </Text></TouchableOpacity>
            {
                (error != 'null')?<Text> Error,Check if the data is correct</Text> //FIX
                    :<></>
            }
        </View>
    )

    function LogForm() {
        return (
            <View >
                <TextInput style = {styles.block} value={logInfo.email} onChangeText={text => setLogInfo({email: text, pass: logInfo.pass , passConfirm:logInfo.passConfirm,name:logInfo.name,img:logInfo.img})}
                           placeholder='Email'></TextInput>
                <View style = {styles.view}></View>
                <TextInput secureTextEntry={true} style = {styles.block}  value={logInfo.pass} onChangeText={text => setLogInfo({email: logInfo.email, pass: text, passConfirm:logInfo.passConfirm,name:logInfo.name,img:logInfo.img})}
                           placeholder='Password'></TextInput>
                <View style = {styles.view}></View>
                <TouchableOpacity style = {styles.appButtonContainer} onPress={Logining}  ><Text style = {styles.appButtonText}>Sign In</Text></TouchableOpacity>
                <View style = {styles.view}></View>
            </View>
        );
    }

    function RegForm() {
        return (
            <View>
                <TextInput style = {styles.block} value={logInfo.name} onChangeText={text => setLogInfo({email: logInfo.email, pass: logInfo.pass , passConfirm:logInfo.passConfirm,name:text,img:logInfo.img})}
                           placeholder='Name'></TextInput>
                <View style = {styles.view}></View>
                <TextInput style = {styles.block} value={logInfo.img} onChangeText={text => setLogInfo({email: logInfo.email, pass: logInfo.pass , passConfirm:logInfo.passConfirm,name:logInfo.name,img:text})}
                           placeholder='Image (scr)'></TextInput>
                <View style = {styles.view}></View>
                <TextInput secureTextEntry={false} style = {styles.block} value={logInfo.email} onChangeText={text => setLogInfo({email: text, pass: logInfo.pass , passConfirm:logInfo.passConfirm,name:logInfo.name,img:logInfo.img})}
                           placeholder='Email'></TextInput>
                <View style = {styles.view}></View>
                <TextInput secureTextEntry={true} style = {styles.block} value={logInfo.pass} onChangeText={text => setLogInfo({email: logInfo.email, pass: text , passConfirm:logInfo.passConfirm,name:logInfo.name,img:logInfo.img})}
                           placeholder='Password'></TextInput>
                <View style = {styles.view}></View>
                <TextInput secureTextEntry={true} style = {styles.block} value={logInfo.passConfirm} onChangeText={text => setLogInfo({email: logInfo.email, pass: logInfo.pass , passConfirm:text,name:logInfo.name,img:logInfo.img})}
                           placeholder='Confirm Password'></TextInput>
                <View style = {styles.view}></View>
                <TouchableOpacity style = {styles.appButtonContainer} onPress={Registration}><Text style = {styles.appButtonText}>Sign Up</Text></TouchableOpacity>
                <View style = {styles.view}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    block: {
        fontSize: 20,
        width:300,
        height:50,
        backgroundColor: 'white',
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
    },
    components: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: '#e3e8e4',
        alignItems:"center",
        justifyContent:"center",
    },
    view: {
        margin:6,
    },
    button: {
        width:300,
        height:50,
        backgroundColor: "blue"
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 115,
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
      }
})

