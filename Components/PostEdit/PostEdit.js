import React, { useContext, useState } from "react";
import { TextInput, Text, Modal, View, TouchableOpacity } from "react-native";
import { useCollection } from "react-firebase-hooks/firestore";
import { Context } from "../../App";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PostEdit() {
  const { auth, firestore, firebase } = useContext(Context);
  const [user] = useAuthState(auth);
  const [error, setError] = useState("null");
  const [modalVisible, setModalVisible] = useState(false);
  const [postInfo, setPostInfo] = useState({ content: "", imgScr: "" });
  const [height, setHeight] = React.useState(30);
  const sendMessage = async () => {
    try {
      if (!postInfo.content.length > 0) {
        throw new Error("content-is-null");
      }
      firestore.collection("posts").add({
        uid: user.uid,
        displayName: user.displayName,
        text: postInfo.content,
        img: postInfo.imgScr,
        photoURL: user.photoURL,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
        likeCount: 0,
        likeSendUsersId: [],
        commentCount: 0,
        comments: [],
      });
      setPostInfo({ content: "", imgScr: "" });
      setHeight(30);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{ backgroundColor: "red" }}
        onPress={() => setModalVisible(true)}
      >
        <Text>Posting</Text>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(52, 52, 52, 0.8)",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              maxHeight: 250 + height,
            }}
          >
            <TextInput
              style={{ height, width: 200 }}
              multiline
              onContentSizeChange={(event) => {
                setHeight(event.nativeEvent.contentSize.height);
              }}
              value={postInfo.content}
              onChangeText={(text) =>
                setPostInfo({ content: text, imgScr: postInfo.imgScr })
              }
              placeholder="Text"
            ></TextInput>
            <TextInput
              style={{ width: 200 }}
              value={postInfo.imgScr}
              onChangeText={(text) =>
                setPostInfo({ content: postInfo.content, imgScr: text })
              }
              placeholder="Image SCR"
            ></TextInput>

            {error != "null" ? <Text>Error , type a content</Text> : <></>}

            <TouchableOpacity onPress={sendMessage}>
              <Text>Publicate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
