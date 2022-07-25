import React, {useEffect, useState} from 'react';
import {Box, Center, Heading, HStack, ScrollView, VStack} from 'native-base';
import Moment from 'moment';

import {getShippingPlanService} from '@/share/services/shipping-plan';
import {FormatDayInWeek} from '@/share/utils/formater';
import {Typo} from '@/components/atoms/typo';
import PressBox from '@/components/atoms/press-box';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '@/share/config/routers';

interface IMeta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

const HomeScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(true);
    const [plans, setPlans] = useState<any[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);

    useEffect(() => {
        getShippingPlan();
    }, []);

    const getShippingPlan = async () => {
        try {
            setLoading(true);
            const {data, meta} = await getShippingPlanService();
            setPlans(data);
            setMeta(meta);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const formatStatus = (status: string) => {
        return (
            <>
                {status === 'delivered'
                    ? 'Đã giao hàng'
                    : status === 'no-delivered'
                        ? 'chưa giao hàng'
                        : status === 'canceled'
                            ? 'Đã hủy đơn hàng'
                            : ''}
            </>
        );
    };

    const _navigationPlanDetail = (id: string | number) => {
        // @ts-ignore
        navigation.navigate(ScreenName.SHIPPING_PLAN_DETAIL_SCREEN, {
            id: id,
        });
    };

    return (
        <Center w="100%" safeAreaTop>
            {!loading && (
                <Box w="100%" background={'#FFFFFF;'}>
                    <ScrollView width={'100%'} p={3} pb={5} h="auto">
                        <Heading mb="2" size="md">
                            Đơn chưa giao &#8226;{' '}
                            {meta?.pagination.total ? meta.pagination.total : 0}
                        </Heading>

                        <VStack space={2}>
                            {plans.map((item, itemI) => (
                                <PressBox
                                    key={itemI}
                                    onPress={() => _navigationPlanDetail(item.id)}
                                >
                                    <HStack
                                        w="100%"
                                        shadow={1}
                                        borderColor={'#E9ECEF'}
                                        borderWidth="1px"
                                        padding={3}
                                        borderRadius={'20px'}
                                        flexDirection={'column'}
                                        justifyContent="space-between"
                                        alignItems="center"
                                        space={3}
                                        background="#FFFFFF"
                                    >
                                        <Box
                                            width={'100%'}
                                            display="flex"
                                            flexDirection={'row'}
                                            justifyContent={'space-between'}
                                        >
                                            <Typo
                                                type="subtitle14"
                                                width="100%"
                                                flexShrink={1}
                                                textAlign="left"
                                                fontWeight={'bold'}
                                            >
                                                Mã đơn hàng
                                            </Typo>
                                            <Typo
                                                type="subtitle14"
                                                width="100%"
                                                flexShrink={1}
                                                textAlign="right"
                                                fontWeight={'bold'}
                                            >
                                                #{item.attributes.order_code}
                                            </Typo>
                                        </Box>
                                        <Box
                                            width={'100%'}
                                            display="flex"
                                            flexDirection={'row'}
                                            justifyContent={'space-between'}
                                        >
                                            <Typo
                                                type="body14"
                                                width="100%"
                                                flexShrink={1}
                                                textAlign="left"
                                            >
                                                Thời gian đặt hàng
                                            </Typo>
                                            <Typo
                                                type="body14"
                                                width="100%"
                                                flexShrink={1}
                                                textAlign="right"
                                            >
                                                {FormatDayInWeek(
                                                    Moment(item.attributes.createdAt).format('dddd'),
                                                )}{' '}
                                                {Moment(item.attributes.createdAt).format(
                                                    'hh:mm - MM-DD-YYYY',
                                                )}
                                            </Typo>
                                        </Box>
                                        <Box
                                            width={'100%'}
                                            display="flex"
                                            flexDirection={'row'}
                                            justifyContent={'space-between'}
                                        >
                                            <Typo
                                                type="body14"
                                                width="100%"
                                                flexShrink={1}
                                                textAlign="left"
                                            >
                                                Trạng thái đơn
                                            </Typo>
                                            <Typo
                                                type="body14"
                                                width="100%"
                                                flexShrink={1}
                                                color={
                                                    item.attributes.status === 'delivered'
                                                        ? '#006843'
                                                        : item.attributes.status === 'canceled'
                                                            ? '#DC3545'
                                                            : ''
                                                }
                                                textAlign="right"
                                            >
                                                {formatStatus(item.attributes.status)}
                                            </Typo>
                                        </Box>
                                        <Box
                                            width={'100%'}
                                            display="flex"
                                            flexDirection={'row'}
                                            justifyContent={'space-between'}
                                        >
                                            <Typo
                                                type="body14"
                                                width="100%"
                                                flexShrink={1}
                                                textAlign="left"
                                            >
                                                Tổng thanh toán
                                            </Typo>
                                            <Typo
                                                type="body14"
                                                width="100%"
                                                color={'#DC3545'}
                                                flexShrink={1}
                                                textAlign="right"
                                            >
                                                {item.attributes.total
                                                    ? item.attributes.total
                                                    : 'total'}
                                            </Typo>
                                        </Box>
                                    </HStack>
                                </PressBox>
                            ))}
                        </VStack>
                    </ScrollView>
                </Box>
            )}
        </Center>
    );
}

export default HomeScreen;
