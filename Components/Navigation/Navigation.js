import React from "react";
import {Ionicons, MaterialCommunityIcons, MaterialIcons,} from "@expo/vector-icons";
import HomeScreen from "../HomeScreen/HomeScreen";
import Messenger from "../MessengerScreen/Messenger";
import Profile from "../Profile/Profile";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StyleSheet} from "react-native";

export default function Navigation(){
    const Tab = createBottomTabNavigator();

    return(
        <NavigationContainer >
            <Tab.Navigator  >
                <Tab.Screen name="Home"  component={HomeScreen} options={
                    {
                        title: 'Home',
                        tabBarIcon: () => {
                            return (
                                <Ionicons name="ios-home-outline" size={24} color="black" />
                            );
                        },
                        tabBarActiveTintColor: 'gray',
                    }
                } />
                <Tab.Screen name="Messenger" component={Messenger} options={
                    {
                        title: 'Messenger',
                        tabBarIcon: () => {
                            return (
                                <MaterialIcons name="messenger-outline" size={24} color="black" />
                            );
                        },
                        tabBarActiveTintColor: 'gray',
                    }
                }/>
                <Tab.Screen name="Profile" component={Profile} options={
                    {
                        title: 'Profile',
                        tabBarIcon: () => {
                            return (
                                <MaterialCommunityIcons name="account-circle-outline" size={24} color="black" />
                            );
                        },
                        tabBarActiveTintColor: 'gray',
                    }
                }/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
