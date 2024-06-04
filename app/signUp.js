import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useAuth } from "../context/authContext";

export default function SignUp() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Sign Up", "Please fill the details");
      return;
    }
    //register process
    setLoading(true);
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    setLoading(false);
    console.log("SignUp results: ", response);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };
  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(1), paddingHorizontal: wp(5) }}
        className="flex-1"
      >
        {/* sign up image */}
        <View className="items-center">
          <Image
            style={{ height: hp(40) }}
            resizeMode="contain"
            source={require("../assets/images/register.jpg")}
          />
        </View>
        {/* sign up form */}
        <View className=" gap-3">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign Up
          </Text>
          {/* input form */}
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
          >
            <Feather name="user" size={24} color="black" />
            <TextInput
              onChangeText={(value) => (usernameRef.current = value)}
              style={{ fontSize: hp(2) }}
              placeholder="Username"
              placeholderTextColor="gray"
              className="flex-1 font-semibold text-neutral-700"
            />
          </View>
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
          >
            <Feather name="mail" size={24} color="black" />
            <TextInput
              onChangeText={(value) => (emailRef.current = value)}
              style={{ fontSize: hp(2) }}
              placeholder="Email Address"
              placeholderTextColor="gray"
              className="flex-1 font-semibold text-neutral-700"
            />
          </View>
          <View className="gap-3">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <Feather name="lock" size={24} color="black" />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{ fontSize: hp(2) }}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="gray"
                className="flex-1 font-semibold text-neutral-700"
              />
            </View>
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
            >
              <Feather name="image" size={24} color="black" />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={{ fontSize: hp(2) }}
                placeholder="Profile Url"
                placeholderTextColor="gray"
                className="flex-1 font-semibold text-neutral-700"
              />
            </View>

            {/* Signup button */}
            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(7)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRegister}
                  style={{
                    backgroundColor: "royalblue",
                    borderRadius: 25,
                    justifyContent: "center",
                    alignItems: "center",
                    height: hp(6.7),
                  }}
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="font-bold text-white tracking-wider"
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* sign up text */}
            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.9) }}
                className="font-semibold text-neutral-500"
              >
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("signIn")}>
                <Text
                  style={{ fontSize: hp(1.9) }}
                  className=" font-extrabold text-indigo-500"
                >
                  Sign in
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({});
