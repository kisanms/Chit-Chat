import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import { getRoomId } from "../../utils/common";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firbaseConfig";

export default function ChatRoom() {
  const item = useLocalSearchParams(); //second user
  const { user } = useAuth(); //logged in user
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);
  // console.log("got itm data: ", item);
  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });
    const KeyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );
    return () => {
      unsub();
      KeyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const createRoomIfNotExists = async () => {
    //roomId
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  //handle messages
  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
      // console.log("new message id: ", newDoc.id);
    } catch (err) {
      Alert.alert("Message: ", err.message);
    }
  };
  // console.log("messages: ", messages);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View className="h-3 border-b border-neutral-300" />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList
            scrollViewRef={scrollViewRef}
            messages={messages}
            currentUser={user}
          />
        </View>
        <View style={{ marginBottom: hp(2.7) }} className="pt-2">
          <View className=" flex-row justify-between items-center mx-3">
            <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type message..."
                style={{ fontSize: hp(2) }}
                className=" flex-1 mx-2"
              />
              <Pressable
                onPress={handleSendMessage}
                className="bg-neutral-200 p-2 mr-[1px] rounded-full"
              >
                <Ionicons
                  name="send-sharp"
                  size={24}
                  color="black"
                  className="items-center ml-1.5"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
