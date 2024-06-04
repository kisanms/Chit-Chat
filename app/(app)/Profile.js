import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useAuth } from "../../context/authContext";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")} // Ensure you have a background image at this path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image source={user?.profileUrl} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.username}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adds a dark overlay
    padding: 20,
    width: wp(100),
  },
  profileImage: {
    height: hp(15),
    aspectRatio: 1,
    borderRadius: hp(7.5),
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
});
