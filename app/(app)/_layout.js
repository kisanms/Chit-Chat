import React from "react";
import { Stack } from "expo-router";
import HomeHeader from "../../components/HomeHeader";
import ProfileScreen from "./Profile";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
        }}
      />
      <Stack.Screen name="Profile" getcomponent={ProfileScreen} />
    </Stack>
  );
}
