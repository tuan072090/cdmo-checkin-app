import React, {useState} from 'react'
import {Box, Button} from 'native-base';
import {Typo} from '@/components/atoms/typo';
import {useAppDispatch} from '@/redux/store';
import {Logout} from '@/redux/reducers/auth';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '@/share/config/routers';

const AccountScreen: React.FC = () => {
    const appDispatch = useAppDispatch();
    const navigation = useNavigation()

    const _openCamera = () => {
        // @ts-ignore
        navigation.navigate(ScreenName.CAMERA_SCREEN, {})
    }
    const _logout = () => {
        appDispatch(Logout())
    }

    return (
        <Box flex={1} safeAreaTop={true} alignItems='center' justifyContent='center'>
            <Typo type="title" mb={5}>Tài khoản</Typo>
            <Button variant="outline" colorScheme="info" onPress={_openCamera}>Open Camera</Button>
            <Button onPress={_logout} mt={3}>Logout</Button>
        </Box>
    )
}

export default AccountScreen
