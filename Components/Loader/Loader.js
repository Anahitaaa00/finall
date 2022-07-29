import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function Loader() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="rgb(132, 172, 232)" />
    </View>
  );
}
