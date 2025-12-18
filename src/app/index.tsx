import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@/components/ui/box';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import {useDispatch, useSelector} from 'react-redux'
import { login } from '@/app/store/reducers/autheSlice'
import { get } from '@/utils/async-storage';

export default function Home() {
  
  const router = useRouter();
  const dispatch = useDispatch(); 



  interface FormLogin{
    email: string
    password: string
  }

  const [form, setForm]=useState<FormLogin>({
    email: '',
    password: ''
  });

  const handleChangeInputLogin = useCallback((name: keyof FormLogin, value: string)=>{
    setForm(prev=>({...prev, [name]: value}))
  }, []);

  const handleLogin = useCallback(()=>{

    const fakeToken = 'token-123'
    dispatch(login(fakeToken));

    router.replace('/home')
  }, [form, router]);


  useEffect(()=>{
    get('token').then(token=>{
     if(token){
       dispatch(login(token as string));
       router.replace('/home');
     }
    });
  },[dispatch]);

  return (
    <Box className="flex-1 bg-background-300 h-[100vh] justify-center  p-6">
      <VStack space='lg'>
        <Heading>Login</Heading>
        <Text>Faça o Login</Text>

      <VStack space='xs'>
        <Text>E-mail:</Text>
        <Input variant='rounded' size='md'>
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
        <Input variant='rounded' size='md'>
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
        <ButtonText>Entrar</ButtonText>
      </Button>
      
    </VStack>
    </Box>
  );
}
