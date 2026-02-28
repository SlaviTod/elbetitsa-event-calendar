import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Calendar", headerShown: false }} />
      <Stack.Screen name="add-event" options={{ title: "Create Event", headerShown: false }} />
      <Stack.Screen name="update-event" options={{ title: "Update Event", headerShown: false }} />
    </Stack>
  );
}