import { LoginResponse, User } from '@/types/dist';
import { SplashScreen, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export type AuthState = {
  user: User;
  token: string;
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: ({ user, token }: LoginResponse) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthState>({
  user: {} as User,
  token: '',
  isLoggedIn: false,
  isReady: false,
  logIn: () => { },
  logOut: () => { },
});


const authStorageKey = 'auth';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState({} as User);
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  const logIn = ({ user, token }: { user: User, token: string }) => {
    setUser(user);
    setToken(token);
    setIsLoggedIn(true);
    storeAuthState({ user, token, isLoggedIn: true });
    // TODO  
    // router.dismissTo('calendar'); 
    router.dismissTo('/profile');
  }

  const logOut = () => {
    setUser({} as User);
    setToken('');
    setIsLoggedIn(false);
    storeAuthState({ user: {} as User, token: '', isLoggedIn: false });
    router.navigate('/');
  }

  const storeAuthState = async (newState: { user: User, token: string, isLoggedIn: boolean }) => {
    try {
      const val = JSON.stringify(newState);
      await SecureStore.setItem(authStorageKey, val);
    } catch (err) {
      console.log('Error saving auth', err);
    }
  }

  useEffect(() => {
    const getAuthFromStorage = async () => {
      try {
        const json = await SecureStore.getItem(authStorageKey);
        if (json) {
          const persisted = JSON.parse(json);

          setUser(persisted.user);
          setToken(persisted.token);
          setIsLoggedIn(persisted.isLoggedIn);
        }
      } catch (err) {
        console.log('Error retrieving auth', err);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
  }, [])

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, isReady, logIn, logOut }} >
      {children}
    </AuthContext.Provider>
  );
}