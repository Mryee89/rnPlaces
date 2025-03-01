import { Stack } from "expo-router";

export default function App() {
  // return <Stack />;

  return (
    <Stack initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" />
      {/* add another screen at here */}
    </Stack>
  );
}
