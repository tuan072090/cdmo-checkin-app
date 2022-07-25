import React, {useState} from 'react'
import {Box, Button} from 'native-base';
import {Typo} from '@/components/atoms/typo';
import {useAppDispatch} from '@/redux/store';
import {Logout} from '@/redux/reducers/auth';

const AccountScreen: React.FC = () => {
    const appDispatch = useAppDispatch();

    const _logout = () => {
        appDispatch(Logout())
    }

    return (
        <Box flex={1} safeAreaTop={true} alignItems='center' justifyContent='center'>
            <Typo type="title" mb={5}>Tài khoản</Typo>
            <Button onPress={_logout}>Logout</Button>
        </Box>
    )
}

export default AccountScreen
