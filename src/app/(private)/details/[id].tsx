import React, { useCallback, useState } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client/react";
import { View } from "@/components/Themed";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Heart, ShoppingCartIcon, Star } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { GET_PRODUCT } from "@/service/queries";
import * as Notifications from 'expo-notifications';

interface ProductDetail {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    imageUrl: string;
    stock: number;
}

export default function Details() {
    const { id } = useLocalSearchParams();
    const productId = decodeURIComponent(id as string);

    const { data, loading, error } = useQuery(GET_PRODUCT, {
        variables: { id: productId },
        skip: !productId,
    });

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const getRatingColor = (rating: number) => {
        if (rating >= 4.5) return 'fill-green-500';
        if (rating > 3) return 'fill-yellow-500';
        return 'fill-gray-400';
    };

    if (loading) {
        return (
            <Center className="flex-1 bg-slate-500">
                <ActivityIndicator size="large" color="#fff" />
            </Center>
        );
    }

    if (error || !data?.product) {
        return (
            <Center className="flex-1 bg-slate-500 p-4">
                <Text className="text-red-500 font-bold">Erro ao carregar produto</Text>
                <Text size="xs" className="text-gray-300 mt-2">{error?.message}</Text>
            </Center>
        );
    }

    const handleFavorite = useCallback(() => {
        setIsFavorite(!isFavorite);
        Notifications.scheduleNotificationAsync({
            content: {
                title: isFavorite ? "Removido dos Favoritos" : "Adicionado aos Favoritos",
                body:!isFavorite 
                    ? `Você marcou "${data?.product?.title}" como favorito.` 
                    : `Você desmarcou "${data?.product?.title}".`,
            },
            trigger: null,
        });
    }, [isFavorite, data]);

    const productData = data?.product;
    const price = parseFloat(productData.variants.edges[0]?.node.price.amount) || 0;

    const product: ProductDetail = {
        id: productData.id,
        title: productData.title,
        description: productData.description || "Sem descrição disponível.",
        category: productData.category?.name || "Sem categoria",
        price: price,
        imageUrl: productData.featuredImage?.url || "https://placehold.co/600x400",
        stock: productData.totalInventory || 0, 
   
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView className="flex-1">
                <Image
                    source={{ uri: product.imageUrl }}
                    alt={product.title}
                    className="self-center w-full h-72" 
                    resizeMode="cover"
                />

                <VStack space="md" className="p-4">
                    <HStack className="justify-between items-start">
                        <VStack className="flex-1 pr-4">
                            <Badge action="info" variant="outline" size="md" className="self-start mb-2">
                                <BadgeText>{product.category}</BadgeText>
                            </Badge>
                            <Heading size="xl">
                                {product.title}
                            </Heading>
                        </VStack>

                        <Button
                            variant="link"
                            size="lg"
                            onPress={handleFavorite}
                        >
                            <ButtonIcon 
                                as={Heart} 
                                className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                            />
                        </Button>
                    </HStack>

                    <HStack className="items-center justify-between pt-2 border-b border-gray-200 pb-4">
                        <Text className="text-3xl text-indigo-600 font-bold">
                            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Text>
                    </HStack>

                    <VStack space="sm" className="mt-2">
                        <Heading size="md">Descrição</Heading>
                        <Text className="text-gray-600 leading-6">
                            {product.description}
                        </Text>
                    </VStack>

                    <Box className="mt-4 bg-gray-50 p-3 rounded-lg">
                        <Text className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {product.stock > 0 
                                ? `Em estoque: ${product.stock} unidades disponíveis` 
                                : 'Produto Indisponível'
                            }
                        </Text>
                    </Box>

                </VStack>
            </ScrollView>
        </View>
    );
}