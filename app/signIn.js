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

export default function SignIn() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill the details");
      return;
    }
    //login process
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    console.log("sign in response : ", response);
    if (!response.success) {
      Alert.alert("Sign In", response.msg);
    }
  };
  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(5), paddingHorizontal: wp(5) }}
        className="flex-1"
      >
        {/* sign In image */}
        <View className="items-center">
          <Image
            style={{ height: hp(40) }}
            resizeMode="contain"
            source={require("../assets/images/login.jpg")}
          />
        </View>
        {/* sign In form */}
        <View className=" gap-3">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign In
          </Text>
          {/* input form */}
          <View className="gap-3">
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
            <View className="gap-2">
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
              <Text
                style={{ fontSize: hp(1.8) }}
                className=" font-semibold text-right text-neutral-500"
              >
                Forget password
              </Text>
            </View>
            {/* SignIn button */}
            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(7)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
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
                    Sign In
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
                Do not have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("signUp")}>
                <Text
                  style={{ fontSize: hp(1.9) }}
                  className=" font-extrabold text-indigo-500"
                >
                  Sign up
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
