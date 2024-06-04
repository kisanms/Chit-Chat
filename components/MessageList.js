import { View, Text, ScrollView } from "react-native";
import React from "react";
import Messageitem from "./Messageitem";

export default function MessageList({ messages, currentUser, scrollViewRef }) {
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message, index) => {
        return (
          <Messageitem
            message={message}
            key={index}
            currentUser={currentUser}
          />
        );
      })}
    </ScrollView>
  );
}
