import {Typo} from '@/components/atoms/typo';
import {createShippingPlan, getShippingPlanById, updateShippingPlan} from '@/share/services/shipping-plan';
import {useNavigation} from '@react-navigation/native';
import {Box, Button, Image, Input, KeyboardAvoidingView, Radio, Row, ScrollView, Spinner, TextArea} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Modal, Platform, StyleSheet} from 'react-native';
import {IOrderPaymentMethod, IOrderType, ISHippingPlanDetail} from './ShippingType';
import FeatherIcon from 'react-native-vector-icons/Feather';
import PressBox from '@/components/atoms/press-box';
import {CameraCpn} from '@/components';
import {uploadPhoto} from '@/share/services';
import {getMerchantDetail} from '@/share/services/merchants';
import {ScreenName} from '@/share/config/routers';
import {useAppSelector} from '@/redux/store';

const UpdateSHippingPlanScreen = ({route}: any) => {
    const navigation = useNavigation();
    const {params} = route;
    const [merchantData, setMerchantData] = useState<null|any>(null)
    const [{
        loading,
        formLoading,
        photoLoading,
    }, setLoading] = useState<{ loading: boolean, photoLoading: boolean, formLoading: boolean }>({
        loading: false,
        formLoading: false,
        photoLoading: false,
    });
    const [cameraVisible, setCameraVisible] = useState(false);
    const [uploadedPhotos, setUploadedPhotos] = useState<any[]>([]);
    const {user} = useAppSelector(state => state.auth);

    const formData = useRef<{
        payment: IOrderPaymentMethod,
        total: string,
        orderType: IOrderType,
        note: string
    }>({
        payment: 'COD',
        total: '',
        orderType: 'deliver',
        note: '',
    });

    useEffect(() => {
        _getMerchantDetail(params.merchantId)
    }, []);

    const _getMerchantDetail = async (merchantId: string | number) => {
        try {
            const merchant = await getMerchantDetail(merchantId)
            setMerchantData(merchant)
        } catch (err) {
            // @ts-ignore
            Alert.alert(err.message);
        }
    };

    const _paymentChange = (newPayment: IOrderPaymentMethod) => {
        formData.current.payment = newPayment;
    };

    const _orderTypeChange = (newType: IOrderType) => {
        formData.current.orderType = newType;
    };

    const _orderTotalChange = (newTotal: string) => {
        formData.current.total = newTotal;
    };

    const _orderNoteChange = (newNote: string) => {
        formData.current.note = newNote;
    };

    const _onPhotoChange = async (newPhoto: string) => {
        try {
            setLoading({loading: false, formLoading: false, photoLoading: true});

            const data = await uploadPhoto(newPhoto);

            const {id, url, formats} = data[0];
            const newPhotos = [...uploadedPhotos, {
                id, url, formats,
            }];
            setUploadedPhotos(newPhotos);
            setLoading({loading: false, formLoading: false, photoLoading: false});
        } catch (err) {
            setLoading({loading: false, formLoading: false, photoLoading: false});
            // @ts-ignore
            Alert.alert('Upload error', err.message);
        }
    };

    const _submitShippingPlan = async () => {
        try {
            if (formLoading || photoLoading) {
                return;
            }
            if (!formData.current.payment || !formData.current.orderType) {
                Alert.alert('Bạn chưa nhập đủ thông tin');
                return;
            }
            if (formData.current.payment === 'COD' && (!formData.current.total || formData.current.total.length < 0)) {
                Alert.alert('Bạn phải nhập số tiền khi phương thức là Tiền mặt');
                return;
            }
            setLoading({loading: false, formLoading: true, photoLoading: false});
            const photoPayload: any[] = [];
            uploadedPhotos.forEach(item => {
                photoPayload.push({id: item.id});
            });
            const payload: any = {
                'status': 'delivered',
                'order_type': formData.current.orderType,
                'payment': formData.current.payment,
                'photos': photoPayload,
                'note': formData.current.note,
                'merchant': {id: merchantData.id},
                'shipper': {id: user.id}
            };
            if (formData.current.total && formData.current.total.length > 0) {
                payload['total'] = parseInt(formData.current.total);
            }
            const data = await createShippingPlan(payload);
            setLoading({loading: false, formLoading: false, photoLoading: false});

            Alert.alert('Tạo thành công');
            navigation.goBack();
        } catch (err) {
            setLoading({loading: false, formLoading: false, photoLoading: false});
            // @ts-ignore
            Alert.alert(err.message);
        }
    };

    const _toggleCamera = () => {
        if (photoLoading) {
            return;
        }
        setCameraVisible(!cameraVisible);
    };

    if (!merchantData) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center"><Spinner color="primary.500"/></Box>
        );
    }

    return (
        <Box flex={1} py={5} backgroundColor="white">
            <Typo type="title" textAlign="center" mb={2}>
                {merchantData.attributes.name}
            </Typo>
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
            >
                <ScrollView>
                    <Box px={5}>
                        <Typo textAlign="center" numberOfLines={3} type="body16" color="orange.500" fontStyle="italic"
                              mb={4}>
                            {merchantData.attributes.note}
                        </Typo>
                        <Typo type="subtitle16" mb={2}>
                            Phương thức thanh toán:
                        </Typo>
                        {/*@ts-ignore*/}
                        <Radio.Group name="paymentMethod" defaultValue={formData.current.payment} onChange={_paymentChange}>
                            <Radio value="COD">
                                Tiền mặt
                            </Radio>
                            <Box my={2}/>
                            <Radio value="TRANSFER">
                                Chuyển khoản
                            </Radio>
                        </Radio.Group>
                    </Box>
                    <Box mt={3} px={5}>
                        <Typo type="subtitle16" mb={2}>
                            Số tiền:
                        </Typo>
                        <Input
                            defaultValue={formData.current.total}
                            keyboardType="numeric"
                            size="xl"
                            onChangeText={_orderTotalChange}
                            placeholder="Nhập số tiền"
                        />
                    </Box>
                    <Box px={5}>
                        <Typo type="subtitle16" mb={2} mt={5}>
                            Loại đơn:
                        </Typo>
                        {/*@ts-ignore*/}
                        <Radio.Group name="orderType" defaultValue={formData.current.orderType} onChange={_orderTypeChange}>
                            <Radio value="deliver">
                                Đơn giao
                            </Radio>
                            <Box my={2}/>
                            <Radio value="add">
                                Đơn bổ sung
                            </Radio>
                            <Box my={2}/>
                            <Radio value="reject">
                                Thu hồi
                            </Radio>
                        </Radio.Group>
                    </Box>
                    <Box px={5}>
                        <Typo type="subtitle16" my={2}>
                            Hình ảnh:
                        </Typo>
                        <Row>
                            {
                                uploadedPhotos.map((item, index) => {
                                    return (
                                        <Box style={styles.thumbnailWrap} key={index}>
                                            <Image source={{uri: item.formats.thumbnail.url}}
                                                   style={styles.thumbnailImg}/>
                                        </Box>
                                    );
                                })
                            }
                            <PressBox onPress={_toggleCamera} style={styles.uploadBtn}>
                                {
                                    photoLoading ? <Spinner color="primary.500"/>
                                        : <FeatherIcon name="camera" size={22}/>
                                }

                            </PressBox>
                        </Row>
                    </Box>
                    <Box px={5}>
                        <Typo type="subtitle16" mb={2} mt={5}>
                            Ghi chú:
                        </Typo>
                        {/*@ts-ignore*/}
                        <TextArea onChangeText={_orderNoteChange} h={20} w="100%" placeholder="nhập ghi chú nếu có"
                                  defaultValue={formData.current.note}/>
                    </Box>
                    <Box px={5} mt={5} mb={24}>
                        <Button
                            size={'lg'}
                            onPress={_submitShippingPlan}
                            borderRadius={12}
                            backgroundColor={'#00875E'}
                            disabled={loading}
                        >
                            {formLoading || photoLoading ? (
                                <Spinner color="white" accessibilityLabel="Loading"/>
                            ) : (
                                'Tạo mới'
                            )}
                        </Button>
                    </Box>
                </ScrollView>
            </KeyboardAvoidingView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={cameraVisible}
                onRequestClose={_toggleCamera}
            >
                <CameraCpn closeCamera={_toggleCamera} onPhotoChange={_onPhotoChange}/>
            </Modal>
        </Box>

    );
};

export default UpdateSHippingPlanScreen;

const styles = StyleSheet.create({
    uploadBtn: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
    },
    thumbnailWrap: {
        width: 58,
        height: 58,
        marginRight: 5,
        borderColor: 'white',
    },
    thumbnailImg: {
        borderRadius: 5,
        overflow: 'hidden',
        width: 58,
        height: 58,
    },
});
