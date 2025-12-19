import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '../../global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Slot, Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Fab, FabIcon } from '@/components/ui/fab';
import { MoonIcon, SunIcon } from '@/components/ui/icon';
import { TailwindProvider } from 'tailwindcss-react-native'
import  { Provider, useSelector } from 'react-redux'
import { store, useAppDispatch } from '@/app/store/store'
import { selectAuth } from './store/reducers/autheSlice';
import { S } from '@expo/html-elements';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/service/apollo';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/service/firebaseConfig';
import { setUser } from '@/app/store/reducers/autheSlice'; 


export {
  ErrorBoundary,
} from 'expo-router';

function StackLayout() {
  const dispatch = useAppDispatch(); 
  const router = useRouter();
  const { status } = useSelector(selectAuth);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      
      dispatch(setUser({ uid: user.uid, email: user.email, token }));
    }
  });
  return unsubscribe;
}, []);
  

  return (
     <Stack screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='index'/>
          <Stack.Screen name='register'
          options={
            {title: "Registrar"}
          }/>

        </Stack>
  )
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const pathname = usePathname();
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');  
 
  return (

    <Provider store={store}> 
      <ApolloProvider client={apolloClient}>
          <GluestackUIProvider mode={colorMode}>
            <ThemeProvider value={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
            
            <StackLayout/>  
              {pathname === '/' && (
                <Fab
                onPress={() =>
                  setColorMode(colorMode === 'dark' ? 'light' : 'dark')
                }
                className="m-6"
                size="lg"
                >
                  <FabIcon as={colorMode === 'dark' ? MoonIcon : SunIcon} />
                </Fab>
              )}
            </ThemeProvider>
          </GluestackUIProvider>
      </ApolloProvider>
  </Provider>
  );
}
