import { Stack, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { logout, selectAuth } from "../store/reducers/autheSlice";
import { RootState, useAppDispatch } from "../store/store";
import { Spinner } from "@/components/ui/spinner";
import { useCallback, useEffect } from "react";
import { Button, ButtonIcon } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react-native";


export default function PrivateLayout() {
    const router = useRouter();
    const { token } = useSelector(selectAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!token) {
            router.replace('/')
        }
    }, [router, token]);


    const handleLogout = useCallback(async () => {
        await dispatch(logout())
    }, [dispatch]);


    if (!token) {
        return <Spinner />
    }

    return <Stack>
        <Stack.Screen name='home'
            options={{
                title: "Início",
                headerRight: () => (
                    <Button onPress={handleLogout}>
                        <ButtonIcon as={LogOutIcon} action="negative" />
                    </Button>
                )
            }} />

        <Stack.Screen
            name='details/[id]'
            options={{
                headerShown: true,
                title: "Detalhes"
            }} />


    </Stack>
}