import React, { useContext } from "react";
import { TouchableOpacity, Text, View, Image, ScrollView } from "react-native";

import { Context } from "../../App";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Loader from "../Loader/Loader";

export default function Messenger() {
  const { firestore, auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollection(
    firestore.collection("posts").orderBy("createAt")
  );
  if (loading) {
    return <Loader />;
  }
  let postCount = messages.docs.filter(
    (post) => post.data().uid == user.uid
  ).length;
  let likeCount = 0;
  messages.docs
    .filter((post) => post.data().uid == user.uid)
    .map((mes) => {
      likeCount += mes.data().likeCount;
    });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView>
        <View>
          <Text>Your name is {user.displayName}</Text>
          <View>
            <Text>Post count {postCount}</Text>
            <Text>Likes count {likeCount}</Text>
          </View>
        </View>
        <Text>Your posts</Text>
        {messages.docs
          .filter((post) => post.data().uid == user.uid)
          .map((message) => (
            <View style={{ borderSize: "30px", margin: 20 }} key={message.id}>
              <View>
                <Image
                  source={{
                    uri: message.data().photoURL,
                    width: 60,
                    height: 60,
                    resizeMode: "contain",
                  }}
                />
                <Text>{message.data().displayName}</Text>
              </View>
              <View>
                <Text>{message.data().text}</Text>
                {message.data().img ? (
                  <Image
                    source={{
                      uri: message.data().img,
                      width: 350,
                      height: 350,
                      defaultSource:
                        "http://www.dermalina.com/wp-content/uploads/2020/12/no-image.jpg",
                      resizeMode: "contain",
                    }}
                  />
                ) : (
                  <></>
                )}
              </View>
              <View>
                <View>
                  <Text>Likes {message.data().likeCount}</Text>
                  <Text>Comment {message.data().commentCount}</Text>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>

      <TouchableOpacity
        title="Sing out"
        onPress={() => console.log(auth.signOut())}
      >
        <Text>Sing out</Text>
      </TouchableOpacity>
    </View>
  );
}
