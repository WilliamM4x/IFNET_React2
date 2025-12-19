import CardProdut from "@/components/CardProduct";
import { View } from "@/components/Themed";
import { FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from "expo-router";
import { Center } from '@/components/ui/center';
import { useSelector } from "react-redux";
import { selectAuth } from "../store/reducers/autheSlice";
import { Text } from '@/components/ui/text';
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "@/service/queries";


export default function Home(){
    const router = useRouter();
    const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);
    const {token} = useSelector(selectAuth);

  if (loading) {
        return (
            <Center className="flex-1 bg-slate-500">
                <ActivityIndicator size="large" color="#fff" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center className="flex-1 bg-slate-500">
                <Text className="text-white">Erro: {error.message}</Text>
            </Center>
        );
    }

    const products = data?.products.edges.map((edge: any) => {
        const node = edge.node;
        const price = parseFloat(node.variants.edges[0]?.node.price.amount) || 0;
        
        return {
            id: node.id,
            title: node.title,
            description: node.description || 'Sem descrição',
            category: node.category?.name || 'Sem categoria',
            price: price,
            imageUrl: node.featuredImage?.url || 'https://placehold.co/600x400',
        };
    }) || [];

    return (
        <View className="flex-1 bg-slate-500">
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
                renderItem={({ item }) => (
                    <View className="mb-4">
                        <CardProdut
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            category={item.category}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            onViewDetails={() => {
                                const cleanId = encodeURIComponent(item.id);
                                router.push(`details/${cleanId}`);
                            }}
                        />
                    </View>
                )}
                onRefresh={refetch}
                refreshing={loading}
            />
        </View>
    );
}