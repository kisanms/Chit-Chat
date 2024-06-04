import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { StatusBar } from "expo-status-bar";
import ChatList from "../../components/ChatList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../../components/Loading";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "../../firbaseConfig";

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user?.uid) getUsers();
  }, []);
  const getUsers = async () => {
    //fetch users
    const q = query(usersRef, where("userId", "!=", user?.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  };
  // console.log("users data: ", user);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(35) }}>
          {/* <ActivityIndicator size="larger" /> */}
          <Loading size={hp(10)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
