import React from 'react';
import {Box, Button} from 'native-base';
import {Typo} from '@/components/atoms/typo';
import {useAppDispatch, useAppSelector} from '@/redux/store';
import {Logout} from '@/redux/reducers/auth';
import {useNavigation} from '@react-navigation/native';
import {APP_VERSION} from '@/share/config/commonConfigs';

const AccountScreen: React.FC = () => {
    const appDispatch = useAppDispatch();
    const navigation = useNavigation()
    const {user} = useAppSelector(state => state.auth);

    const _logout = () => {
        appDispatch(Logout())
    }

    return (
        <Box flex={1} safeAreaTop={true} alignItems='center' justifyContent='center'>
            <Typo type="caption" mb={3}>Tài khoản</Typo>
            <Typo type="title"  mb={5}>{user.username}</Typo>
            <Button onPress={_logout} mt={3}>Logout</Button>

            <Typo type="caption" mt={3}>Version {APP_VERSION}</Typo>
        </Box>
    )
}

export default AccountScreen
