import {Box, Button, Input, Stack, StatusBar, VStack} from 'native-base';
import React, {useState} from 'react';
import {Alert, SafeAreaView, Text} from 'react-native';
import StaticImages from '../../share/static/imgs';
import {Image as ImageNative} from 'native-base';
import {LoginService} from '../../share/services/auth';
import {useAppDispatch} from '../../redux/store';
import {UpdateAccessToken, UpdateUser} from '../../redux/reducers/auth';
import {UpdateMessage} from '../../redux/reducers/message';

const LoginScreen = () => {
    const appDispatch = useAppDispatch();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const _handleLogin = async () => {
        try {
            console.log(userName);
            console.log(password);
            const data: any = await LoginService(userName, password);
            const {jwt, user} = data;
            appDispatch(UpdateAccessToken(jwt));
            appDispatch(UpdateUser(user));
            appDispatch(UpdateUser(user));
            appDispatch(UpdateMessage('Đăng nhập thành công!'));
        } catch (err) {
            Alert.alert('Sai tên tài khoản hoặc mật khẩu! vui lòng đăng nhập lại!');
        }
    };
    return (
        <SafeAreaView>
            <VStack space="2.5" m={3}>
                <Stack>
                    <Box display={'flex'} justifyContent={'center'}>
                        <ImageNative
                            width={200}
                            mb={8}
                            source={StaticImages.logo}
                            alt="logo"
                        />
                    </Box>
                </Stack>
                <Stack>
                    <Box>
                        <Text>Tài khoản:</Text>
                        <Input
                            value={userName}
                            onChangeText={(text: string) => {
                                setUserName(text);
                            }}
                            placeholder="Nhập tên tài khoản"
                            w="100%"
                        />
                    </Box>
                </Stack>
                <Stack>
                    <Box>
                        <Text>Mật khẩu:</Text>
                        <Input
                            type="password"
                            value={password}
                            onChangeText={(text: string) => {
                                setPassword(text);
                            }}
                            placeholder="Nhập mật khẩu"
                            w="100%"
                        />
                    </Box>
                </Stack>
                <Stack>
                    <Button colorScheme="success" onPress={_handleLogin}>
                        Đăng nhập
                    </Button>
                </Stack>
            </VStack>
        </SafeAreaView>
    );
};

export default LoginScreen;
