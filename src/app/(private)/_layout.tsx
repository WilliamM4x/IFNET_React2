import { Stack, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/reducers/autheSlice";
import { RootState } from "../store/store";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";


export default function PrivateLayout() {
    const router = useRouter();
    const { token } = useSelector(selectAuth);
    
    useEffect(()=>{
        if(!token){
            router.replace('/')
        }
    },[router, token]);

    if(!token){
        return <Spinner/>
    }

    return <Stack>
        <Stack.Screen name='home'
        options={{
        title: "Início"
        }} />

        <Stack.Screen 
        name='details/[id]' 
        options={{
        headerShown: true,
        title: "Detalhes"
        }}/>


    </Stack>
}