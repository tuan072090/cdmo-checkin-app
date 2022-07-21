import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import AuthTemplate from '@/components/templates/auth';
import {useAppSelector} from '@/redux/store';

const HomeScreen = AuthTemplate(() => {
  const {accessToken} = useAppSelector(state => state.auth);
  console.log('accessToken', accessToken);

  return (
    <SafeAreaView>
      <Text>home screen</Text>
    </SafeAreaView>
  );
});

export default HomeScreen;
