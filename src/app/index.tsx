import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { auth } from '@/service/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import { Icon, LockIcon, MailIcon } from '@/components/ui/icon'; 
import { Center } from '@/components/ui/center';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Sucesso
      router.replace('/home');
    } catch (error: any) {
      console.error(error);
      let msg = "Ocorreu um erro ao entrar.";
      if (error.code === 'auth/invalid-credential') msg = "E-mail ou senha incorretos.";
      if (error.code === 'auth/invalid-email') msg = "Formato de e-mail inválido.";
      Alert.alert("Erro de Login", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box className="flex-1 bg-slate-900 h-full justify-center p-6">
          <Center className="mb-10">
            {/* Aqui você pode colocar uma Imagem de Logo */}
            <Box className="w-20 h-20 bg-primary-500 rounded-full items-center justify-center mb-4">
              <Heading className="text-white text-3xl">IF</Heading>
            </Box>
            <Heading size="2xl" className="text-white">Bem-vindo</Heading>
            <Text className="text-gray-400 mt-2">Faça login para continuar</Text>
          </Center>

          <VStack space="xl">

            <VStack space="xs">
              <Text className="text-gray-300 ml-1">E-mail</Text>
              <Input variant="outline" size="xl" className="border-gray-600 bg-slate-800 rounded-lg focus:border-primary-500">
                <InputField
                  placeholder="seu@email.com"
                  placeholderTextColor="#6b7280"
                  color='white'
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
                  placeholder="Sua senha secreta"
                  placeholderTextColor="#6b7280"
                  color='white'
                  type="password"
                  value={password}
                  onChangeText={setPassword}
                />
              </Input>
            </VStack>

            <Button 
              size="xl" 
              className="bg-primary-500 mt-4 rounded-lg hover:bg-primary-600 active:bg-primary-700" 
              onPress={handleLogin}
              isDisabled={loading}
            >
              {loading ? <ButtonSpinner color="white" /> : <ButtonText className="font-bold">ENTRAR</ButtonText>}
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