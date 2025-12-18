import CardProdut from "@/components/CardProduct";
import { View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../store/reducers/autheSlice";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from '@/components/ui/text';
const mockProduct = {
    id: '001',
    title: 'Headphone Noise Cancelling',
    description: 'Experimente o silêncio absoluto com nosso fone de ouvido premium. Bateria com duração de 30 horas e conforto ergonômico.',
    category: 'Áudio',
    price: 899.90,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    onViewDetails: (id: string) => console.log(`Ver detalhes do item: ${id}`),
    onAddToCart: (id: string) => console.log(`Adicionar item ${id} ao carrinho`),
  };

export default function Home(){
    const router = useRouter();
    const {token} = useSelector(selectAuth);
    const dispatch = useDispatch();

    const handleLogout= () => {
        dispatch(logout())
    } 

    return <View className="p-4 flex-1 justify-center bg-slate-500">
      
       <Text> Meu token é: {token}</Text>
      
       <Button onPress={handleLogout} action="negative">
            <ButtonText>Logout</ButtonText>
       </Button>
      
        <CardProdut
        {...mockProduct}
        onAddToCart={()=>{}}
        onViewDetails={()=>{
            router.push({
                pathname: "/details/[id]",
                params: {id: mockProduct.id}
            })
        }}/>
    </View>
}