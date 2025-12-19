import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAppDispatch, RootState } from './store/store';
import { login, clearError } from './store/reducers/autheSlice'; 
import { useSelector } from 'react-redux';
import { Box } from '@/components/ui/box'; 
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';


export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, status } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      Alert.alert("Erro de Login", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/home'); 
    }
  }, [status, router]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    dispatch(login({ email, password })); 
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 bg-slate-900 h-full justify-center p-6">
            
            <Heading size="2xl" className="text-white">Bem-vindo</Heading>
            <Text className="text-gray-400 mt-2">Faça login para continuar</Text>
            
            <VStack space="xl" className="mt-10"> 

              <VStack space="xs">
                <Text className="text-gray-300 ml-1">E-mail</Text>
                <Input variant="outline" size="xl" className="border-gray-600 bg-slate-800 rounded-lg focus:border-primary-500">
                  <InputField
                    placeholder="seu@email.com"
                    placeholderTextColor="#6b7280"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </Input>
              </VStack>

              <VStack space="xs">
                <Text className="text-gray-300 ml-1">Senha</Text>
                <Input variant="outline" size="xl" className="border-gray-600 bg-slate-800 rounded-lg focus:border-primary-500">
                  <InputField
                    placeholder="Sua senha"
                    placeholderTextColor="#6b7280"
                    type="password"
                    value={password}
                    onChangeText={setPassword}
                  />
                </Input>
              </VStack>

              <Button 
                size="xl" 
                className="bg-primary-500 mt-4 rounded-lg" 
                onPress={handleLogin}
                isDisabled={isLoading} 
              >
                {isLoading ? (
                    <ButtonSpinner color="white" /> 
                ) : (
                    <ButtonText className="font-bold">ENTRAR</ButtonText>
                )}
              </Button>

               <Box className="flex-row justify-center mt-4">
                <Text className="text-gray-400">Não tem conta? </Text>
                <Link href="/register" asChild>
                  <Text className="text-primary-400 font-bold underline">Crie uma agora</Text>
                </Link>
              </Box>
            
            </VStack> 

        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}