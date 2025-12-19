import { Badge, BadgeText } from "../ui/badge";
import { Box } from "../ui/box";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { EyeIcon } from "../ui/icon";
import { Image } from "../ui/image";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { Eye, ShoppingCart } from 'lucide-react-native';

interface CardProductProps{
    id: string,
    title: string,
    description: string,
    category: string,
    price: number,
    imageUrl: string,
    onViewDetails: (id: string)=>void

}


export default function CardProdut({
    id,
    title,
    description,
    category,
    price,
    imageUrl,
    onViewDetails,
}: CardProductProps){
    
    return <Card className="p-5 rounded-lg bg-slate-300" size="md" variant="outline">
        <Pressable onPress={()=>onViewDetails(id)}>
            <Image
                source={{uri: imageUrl}}
                alt={`Imagem do ${title}`}
                className="mb-6 self-center"
                size="2xl"
                resizeMode="cover"
            />
        </Pressable>
        <VStack space="sm">
            <HStack className="justify-center items-center gap-5">
                <Heading className="flex-1">
                    {title}
                </Heading>
                <Badge className="bg-gray-500 p-2">
                    <BadgeText>{category}</BadgeText>
                </Badge>
            </HStack>
            <Text className="text-xl font-semibold text-gray-400">
                R$ {price.toFixed(2)}
            </Text>
            <Text size="sm" numberOfLines={2}>
                {description}
            </Text>   
            <HStack space="md" className="mt-2 pt-2 border-t-2 border-blue-200">
                    <Button 
                    variant="outline" 
                    action="secondary" 
                    className="flex-1"
                    onPress={()=>onViewDetails(id)}>
                        <ButtonIcon as={Eye} className="mr-2"/>
                        <ButtonText>Vizualizar</ButtonText>
                    </Button>
            </HStack>
        </VStack>
    </Card>
}