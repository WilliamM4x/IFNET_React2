import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '@/service/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText, ButtonSpinner } from '@/components/ui/button';
import { Center } from '@/components/ui/center';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Senha fraca", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: name
      });

      Alert.alert("Sucesso", "Conta criada com sucesso!");
      router.replace('/home');
    } catch (error: any) {
      console.error(error);
      let msg = "Não foi possível criar a conta.";
      if (error.code === 'auth/email-already-in-use') msg = "Este e-mail já está em uso.";
      if (error.code === 'auth/invalid-email') msg = "E-mail inválido.";
      Alert.alert("Erro", msg);
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
          <Center className="mb-8">
            <Heading size="xl" className="text-white">Criar Conta</Heading>
            <Text className="text-gray-400 mt-1">Preencha os dados abaixo</Text>
          </Center>

          <VStack space="md">
            
            {/* Nome */}
            <VStack space="xs">
              <Text className="text-gray-300 ml-1">Nome Completo</Text>
              <Input variant="outline" size="xl" className="border-gray-600 bg-slate-800 rounded-lg focus:border-primary-500">
                <InputField placeholder="Seu nome" placeholderTextColor="#6b7280" color='white' value={name} onChangeText={setName} />
              </Input>
            </VStack>

            {/* Email */}
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

            {/* Senha */}
            <VStack space="xs">
              <Text className="text-gray-300 ml-1">Senha</Text>
              <Input variant="outline" size="xl" className="border-gray-600 bg-slate-800 rounded-lg focus:border-primary-500">
                <InputField 
                  placeholder="Mínimo 6 caracteres" 
                  placeholderTextColor="#6b7280" 
                  color='white'
                  type="password" 
                  value={password} 
                  onChangeText={setPassword} 
                />
              </Input>
            </VStack>

             {/* Confirmar Senha */}
             <VStack space="xs">
              <Text className="text-gray-300 ml-1">Confirmar Senha</Text>
              <Input variant="outline" size="xl" className="border-gray-600 bg-slate-800 rounded-lg focus:border-primary-500">
                <InputField 
                  placeholder="Repita a senha" 
                  placeholderTextColor="#6b7280" 
                  color='white'
                  type="password" 
                  value={confirmPassword} 
                  onChangeText={setConfirmPassword} 
                />
              </Input>
            </VStack>

            <Button 
              size="xl" 
              className="bg-primary-500 mt-6 rounded-lg" 
              onPress={handleRegister}
              isDisabled={loading}
            >
              {loading ? <ButtonSpinner color="white" /> : <ButtonText className="font-bold">CRIAR CONTA</ButtonText>}
            </Button>
            
            <Button 
              variant="link" 
              size="sm" 
              className="mt-2" 
              onPress={() => router.back()}
            >
              <ButtonText className="text-gray-400">Voltar para Login</ButtonText>
            </Button>

          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}