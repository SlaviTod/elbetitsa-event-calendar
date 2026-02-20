import { useContext } from "react";
import { Alert } from "react-native";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";



export default function Calendar() {

    const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();

    

    if (!isLoggedIn) {
      Alert.alert('Action needed', 'In order to see that part of the app you should log in', [{
        text: 'Cancel',
        style: 'cancel',
      }, {
        text: 'Go to LogIn',
        style: 'destructive',
        onPress: () => router.navigate('/login'),
      }])
    }

    

  return (
    <></>
  );
}