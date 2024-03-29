import {
    Box,
    Button,
    Center,
    Input,
    Stack,
    VStack,
    KeyboardAvoidingView, Spinner,
} from 'native-base';
import React, {useState} from 'react';
import StaticImages from '../../share/static/imgs';
import {Image as ImageNative} from 'native-base';
import {LoginService} from '@/share/services/auth';
import {useAppDispatch} from '@/redux/store';
import {UpdateAccessToken, UpdateUser} from '@/redux/reducers/auth';
import {Typo} from '@/components/atoms/typo';
import {Alert, Platform} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import PressBox from '@/components/atoms/press-box';

const LoginScreen = () => {
    const appDispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const _handleLogin = async () => {
        try {
            setLoading(true);
            const data: any = await LoginService(userName, password);
            const {jwt, user} = data;
            appDispatch(UpdateAccessToken(jwt));
            appDispatch(UpdateUser(user));
            setLoading(true);
        } catch (err) {
            // @ts-ignore
            Alert.alert('Lỗi đăng nhập', err.message);
            setLoading(false);
        }
    };

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0;

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={keyboardVerticalOffset}>
            <Center w="100%">
                <Box w="100%" h={'100%'} backgroundColor={'#E6F3EF'}>
                    <Box
                        display={'flex'}
                        h="30%"
                        w={'100%'}
                        alignContent="center"
                        justifyContent={'center'}
                        alignItems="center">
                        <ImageNative
                            width={143}
                            height={40}
                            mb={8}
                            resizeMode="contain"
                            source={StaticImages.logo}
                            alt="logo"
                        />
                    </Box>
                    <Box bgColor={'#fff'} borderTopRadius={'50px'} h={'100%'}>
                        <Box mt={50} m={5}>
                            <Box>
                                <Typo type="body14" fontWeight={'bold'} fontSize={'xl'}>
                                    Đăng nhập Chợ Đầu Mối
                                </Typo>
                            </Box>
                            <VStack space="2.5" mt={5}>
                                <Stack>
                                    <Box>
                                        <Typo type="subtitle14" mb={2}>Tài khoản:</Typo>
                                        <Input
                                            autoCapitalize="none"
                                            size="xl"
                                            value={userName}
                                            onChangeText={(text: string) => {
                                                setUserName(text);
                                            }}
                                            placeholder="Nhập tên tài khoản"
                                        />
                                    </Box>
                                </Stack>
                                <Stack>
                                    <Box position="relative">
                                        <Typo type="subtitle14" mb={2}>Mật khẩu:</Typo>
                                        <Input
                                            autoCapitalize="none"
                                            size="xl"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChangeText={(text: string) => {
                                                setPassword(text);
                                            }}
                                            placeholder="Nhập mật khẩu"
                                        />
                                        <PressBox onPress={() => setShowPassword(!showPassword)}
                                                  width={12} height={10}
                                                  justifyContent="center" alignItems="center"
                                                  position="absolute"
                                                  bottom={0} right={0}>
                                            <FeatherIcon name={!showPassword ? "eye" : "eye-off"} size={20}/>
                                        </PressBox>
                                    </Box>
                                </Stack>
                                <Stack>
                                    <Button
                                        mt={15}
                                        size={'lg'}
                                        onPress={_handleLogin}
                                        borderRadius={12}
                                        backgroundColor={'#00875E'}
                                        disabled={loading}
                                    >
                                        {
                                            loading ?
                                                <Spinner color="white" accessibilityLabel="Loading"/> : 'Đăng nhập'
                                        }

                                    </Button>
                                </Stack>
                            </VStack>
                        </Box>
                    </Box>
                </Box>
            </Center>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
