import { View } from "@/components/Themed";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heart, ShoppingCartIcon, Star } from "lucide-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";

interface ProductDetail {
    id: string,
    title: string,
    description: string,
    category: string,
    price: number,
    imageUrl: string,
    stock: number,
    rating: number

}

const mockProduct: ProductDetail = {
    id: '001',
    title: 'Headphone Noise Cancelling',
    description: 'Experimente o silêncio absoluto com nosso fone de ouvido premium. Bateria com duração de 30 horas e conforto ergonômico.',
    category: 'Áudio',
    price: 899.90,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    stock: 15,
    rating: 19
};

export default function Datails() {

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const getRatingColor = (rating: number) => {
        if (rating >= 7) return 'fill-green-500'; 
        if (rating > 4) return 'fill-yellow-500';   
        return 'fill-gray-400';                    
    };

    return <View className="flex-1">
        <ScrollView className="flex-1">
            <Image
                source={
                    { uri: mockProduct.imageUrl }
                }
                alt={mockProduct.title}
                className="self-center"
                size="2xl"
                resizeMode="cover"
            />

            <VStack space="md" className="p-4">
                <HStack className="justify-between items-center">
                    <VStack className="flex-1">
                        <Badge action="info" variant="outline" size="lg"
                            className="w-2/6 mb-4"
                        >
                            <BadgeText>{mockProduct.category}</BadgeText>
                        </Badge>
                        <Heading size="xl" className="flex-1 justify-center">
                            {mockProduct.title}
                        </Heading>
                    </VStack>

                    <Button
                        variant="link"
                        size="lg"
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        <ButtonIcon as={Heart} className={`${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>

                </HStack>

                <HStack className="item-center mt-2 pt-2 border-b-hairline justify-between">
                    <Text className="text-3xl text-indigo-400 font-semibold my-2">
                        R$ {mockProduct.price}
                    </Text>
                    <HStack className="items-center">
                        <Badge>
                            <BadgeIcon as={Star} className={`${getRatingColor(mockProduct.rating)}`} />
                        </Badge>
                        <Text size="md" className="text-sm font-semibold ml-1">{mockProduct.rating}</Text>
                    </HStack>
                </HStack>
                <VStack space="sm" className="mt-4">
                    <Heading className="justify-items-center items-center">Descrição </Heading>
                    <Text className="color-gray-700">{mockProduct.description}
                    </Text>
                </VStack>

                <Text className={`${mockProduct.stock>10? 'text-green-400': 'text-orange-600'}`}> 
                    {mockProduct.stock>10? `Em estoque:  ${mockProduct.stock}` : 'Últimas unidade:'}
                </Text>

            </VStack>
        </ScrollView>
        <Fab
            size="lg"
            isDisabled={mockProduct.stock === 0}
            onPress={() => { }}
            placement="bottom center"
            className="mb-6"
        >
            <FabIcon as={ShoppingCartIcon} />
            <FabLabel>
                Adicionar no Carinho
            </FabLabel>
        </Fab>


    </View>
}