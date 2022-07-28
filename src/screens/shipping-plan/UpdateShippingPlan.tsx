import {Typo} from '@/components/atoms/typo';
import {getShippingPlanById} from '@/share/services/shipping-plan';
import {useNavigation} from '@react-navigation/native';
import {
    Box,
    Button,
    Center,
    Checkbox,
    Input,
    KeyboardAvoidingView, Pressable, Row, ScrollView,
    Spinner,
    Stack,
    VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Alert, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {ISHippingPlanDetail} from './ShippingType';
import FeatherIcon from 'react-native-vector-icons/Feather';

const UpdateSHippingPlanScreen = ({route}: any) => {
    const navigation = useNavigation();
    const {params} = route;
    const [orderType, setOrderType] = useState<'Giao đơn' | 'Giao bổ sung' | 'Thu hồi'>('Giao đơn');
    const [plan, setPlan] = useState<ISHippingPlanDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getShippingPlanDetail();
    }, []);

    const getShippingPlanDetail = async () => {
        try {
            setLoading(true);
            const data: any = await getShippingPlanById(params.id);
            setPlan(data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);

            Alert.alert('Lấy thông tin thất bại vui lòng thử lại');
            setLoading(false);
        }
    };
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0;

    console.log("plan", plan)
    if(!plan){
        return (
            <Box flex={1}><Spinner color="white"/></Box>
        )
    }
    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={keyboardVerticalOffset}
        >
            <ScrollView>
                <Center w={'100%'}>
                    <VStack space="2.5" mt={5} w={'100%'} px={5}>
                        <Stack>
                            <Box>
                                <Typo type="title" mb={2}>
                                    Phương thức thanh toán:
                                </Typo>
                                <Checkbox value={'order_type'} isChecked={true}>
                                    Tiền mặt
                                </Checkbox>
                                <Box mt={3}>
                                    <Checkbox value={'order_type'} isChecked={false}>
                                        Chuyển khoản
                                    </Checkbox>
                                </Box>
                            </Box>
                            <Box>
                                <Typo type="title" mb={2} mt={5}>
                                    Loại đơn:
                                </Typo>
                                <Checkbox
                                    value={'Giao đơn'}
                                    // onChange={(text:string) => {
                                    //     setOrderType(text)
                                    // }}
                                    isChecked={orderType === 'Giao đơn'}
                                >
                                    Đơn giao
                                </Checkbox>

                                <Box mt={3}>
                                    <Checkbox
                                        value={'Giao bổ sung'}
                                        isChecked={orderType === 'Giao bổ sung'}
                                    >
                                        Đơn Bô sung
                                    </Checkbox>
                                </Box>
                                <Box mt={3}>
                                    <Checkbox
                                        value={'Thu hồi'}
                                        isChecked={orderType === 'Thu hồi'}
                                    >
                                        Thu hồi
                                    </Checkbox>
                                </Box>
                            </Box>
                            <Box mt={3}>
                                <Typo type="title" mb={2}>
                                    Số tiền:
                                </Typo>
                                <Input
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    size="xl"
                                    // value={userName}
                                    onChangeText={(text: string) => {
                                        // setUserName(text);
                                    }}
                                    placeholder="Nhập số tiền"
                                />
                            </Box>
                        </Stack>
                        <Stack>
                            <Box>
                                <Typo type="subtitle14" mb={2}>
                                    Hình ảnh:
                                </Typo>
                                <Row>
                                    <TouchableOpacity style={styles.uploadBtn}>
                                        <FeatherIcon name="upload" size={22}/>
                                    </TouchableOpacity>
                                </Row>
                            </Box>
                        </Stack>
                        <Stack>
                            <Button
                                mt={15}
                                size={'lg'}
                                //   onPress={_handleLogin}
                                borderRadius={12}
                                backgroundColor={'#00875E'}
                                disabled={loading}
                            >
                                {loading ? (
                                    <Spinner color="white" accessibilityLabel="Loading"/>
                                ) : (
                                    'Đăng nhập'
                                )}
                            </Button>
                        </Stack>
                    </VStack>
                </Center>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default UpdateSHippingPlanScreen;

const styles = StyleSheet.create({
    uploadBtn:{
        width: 60,
        height: 60,
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc'
    }
})
