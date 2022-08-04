import React, {useState} from 'react'
import {Box, HStack} from 'native-base';
import {Typo} from '@/components/atoms/typo';
import {FormatDayInWeek, FormatVND} from '@/share/utils/formater';
import Moment from 'moment';
import PressBox from '@/components/atoms/press-box';
import {ISHippingPlanDetail} from '@/screens/shipping-plan/ShippingType';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '@/share/config/colors';
import {ScreenName} from '@/share/config/routers';

type ShippingPlanCardProps = {
    shippingPlan: ISHippingPlanDetail
}
const ShippingPlanCard: React.FC<ShippingPlanCardProps> = ({shippingPlan}) => {
    const navigation = useNavigation()

    const _navigationPlanDetail = () => {
        // @ts-ignore
        navigation.navigate(ScreenName.UPDATE_SHIPPING_PLAN_SCREEN, {
            id: shippingPlan.id,
        });
    }

    const {id, attributes} = shippingPlan

    return (
        <PressBox
            onPress={_navigationPlanDetail}
        >
            <HStack
                w="100%"
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
                        {attributes.merchant.data.attributes.name}
                    </Typo>
                    <Typo
                        type="subtitle14"
                        width="100%"
                        flexShrink={1}
                        textAlign="right"
                        fontWeight={'bold'}
                    >
                        #{attributes.order_code}
                    </Typo>
                </Box>
                <Box
                    width={'100%'}
                    display="flex"
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    mt={2}
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
                            Moment(attributes.createdAt).format('dddd'),
                        )}{' '}
                        {Moment(attributes.createdAt).format(
                            'hh:mm - MM-DD-YYYY',
                        )}
                    </Typo>
                </Box>
                <Box
                    my={1}
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
                        Trạng thái
                    </Typo>
                    <Typo
                        type="body14"
                        width="100%"
                        flexShrink={1}
                        color={
                            attributes.status === 'delivered'
                                ? Colors.primary['500']
                                : attributes.status === 'canceled'
                                    ? '#DC3545'
                                    : ''
                        }
                        textAlign="right"
                    >
                        {formatStatus(attributes.status)}
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
                        type="subtitle14"
                        width="100%"
                        color={'#DC3545'}
                        flexShrink={1}
                        textAlign="right"
                    >
                        {attributes.total ? FormatVND(attributes.total)+'đ' : '...'}
                    </Typo>
                </Box>
            </HStack>
        </PressBox>
    )
}

function formatStatus(status: string){
    return (
        <>
            {status === 'delivered'
                ? 'Đã giao hàng'
                : status === 'no-delivery'
                    ? 'chưa giao hàng'
                    : status === 'canceled'
                        ? 'Đã hủy đơn hàng'
                        : ''}
        </>
    );
};
export default ShippingPlanCard
