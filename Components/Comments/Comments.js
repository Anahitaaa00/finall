import React, { useContext, useState } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Context } from "../../App";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesome } from "@expo/vector-icons";

export default function PostEdit({ message }) {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [error, setError] = useState("null");
  const [visible, setVisible] = useState(false);
  const [postInfo, setPostInfo] = useState({ content: "", imgScr: "" });
  const [height, setHeight] = React.useState(30);
  const sendMessage = async () => {
    try {
      if (postInfo.content.length <= 0) {
        throw new Error("content-is-null");
      }

      firestore
        .doc(message.ref.path)
        .update({ commentCount: message.data().commentCount + 1 });
      firestore.doc(message.ref.path).update({
        comments: [
          ...message.data().comments,
          {
            displayName: user.displayName,
            text: postInfo.content,
            photoURL: user.photoURL,
          },
        ],
      });

      setPostInfo({ content: "", imgScr: "" });
      setHeight(30);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(!visible)}>
        {!visible ? (
          <FontAwesome name="comments-o" size={24} color="black" />
        ) : (
          <FontAwesome name="comments" size={24} color="black" />
        )}
      </TouchableOpacity>
      <View style={{ display: visible ? "block" : "none" }}>
        <View
          style={{
            maxHeight: 250 + height,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                height,
                width: 200,
              }}
              multiline
              onContentSizeChange={(event) => {
                setHeight(event.nativeEvent.contentSize.height);
              }}
              value={postInfo.content}
              onChangeText={(text) =>
                setPostInfo({ content: text, imgScr: postInfo.imgScr })
              }
              placeholder="Input the comment"
            ></TextInput>

            {error != "null" ? <Text>Error , type a content</Text> : <></>}

            <TouchableOpacity onPress={sendMessage}>
              <Text>Publicate</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {message.data().comments.map((m, index) => (
            <View key={index}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ borderRadius: "100%" }}
                  source={{
                    uri: m.photoURL,
                    width: 60,
                    height: 60,
                    resizeMode: "contain",
                  }}
                />
                <View>
                  <Text style={{ color: "black", fontSize: 20, margin: 30 }}>
                    {m.displayName}
                  </Text>
                </View>
              </View>

              <Text style={{ marginLeft: 30 }}>{m.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "red",
  },
});
