import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { useSelector} from 'react-redux'
import { login, selectAuth } from '@/app/store/reducers/autheSlice'
import { useAppDispatch } from './store/store';
import { Center } from '@/components/ui/center';
import { Spinner } from '@/components/ui/spinner';

import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';

export default function Home() {
  
  const router = useRouter();
  const dispatch = useAppDispatch(); 
  const { error, isLoading, isLoadingFromStorage } = useSelector(selectAuth);


  interface FormLogin{
    email: string
    password: string
  }
  const [errorForm, setErrorForm]= useState<string | null>(null);

  const [form, setForm]=useState<FormLogin>({
    email: '',
    password: ''
  });

  const handleChangeInputLogin = useCallback((name: keyof FormLogin, value: string)=>{
    setForm(prev=>({...prev, [name]: value}))
  }, []);

  const handleLogin = useCallback( async ()=>{
    if(!form.email || !form.password){
      setErrorForm('Por favor, preencha todos os campos.');
      return;
    }

    setErrorForm(null);
    
    const token = await dispatch(login(form)).unwrap();
    if (token){
      router.replace('/home')
    }
  }, [form, router]);

  const hendleGoToRegister = useCallback(()=>{
    router.push('/register')
  }, [router]);

  if(isLoadingFromStorage){
    return (
      <Center className='flex-1'>
        <Spinner size='large'/>
      </Center>
    )};

  return (
    <Box className="flex-1 bg-background-300 h-[100vh] justify-center  p-6">
      <VStack space='lg'>
        <Heading>Login</Heading>
        <Text>Faça o Login</Text>

      <VStack space='xs'>
        <Text>E-mail:</Text>
        <Input variant='rounded' size='md' isDisabled={isLoading}>
          <InputField
            placeholder='Informe o e-mail'
            keyboardType='email-address'
            value={form.email}
            onChangeText={(value) => handleChangeInputLogin('email', value)}
            />
        </Input>
      </VStack>

      <VStack space='xs'>
        <Text>Password:</Text>
        <Input variant='rounded' size='md'  isDisabled={isLoading}>
          <InputField
            placeholder='Informe o Password'
            type='password'
            keyboardType='default'
            value={form.password}
            onChangeText={(value) => handleChangeInputLogin('password', value)}
            />
        /</Input>
      </VStack>

      <Button action='primary' size='lg' onPress={handleLogin}>
        {
          isLoading ? (
            <>
            <ButtonSpinner/>
            <ButtonText>Entrando...</ButtonText>
            </>
          ): 
          (
          <ButtonText>Entrar</ButtonText>
        )
        }
      </Button>
      
      <Button variant='link' size='lg' onPress={hendleGoToRegister}>
        <ButtonText>Não possui uma conta? Registre-se</ButtonText>
      </Button>

      <Box className='min-h-[43px] justify-center'>
        {(error || errorForm) && (
          <Alert action="error" variant="solid">
            <AlertIcon as={AlertIcon} className="text-red-500 mr-3"/>
            <AlertText>{error || errorForm}</AlertText>
          </Alert>
        )}
      </Box>

    </VStack>
    </Box>
  );
}
