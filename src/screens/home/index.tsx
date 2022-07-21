import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  Box,
  Center,
  Heading,
  HStack,
  Pressable,
  ScrollView,
  VStack,
} from 'native-base';
import Moment from 'moment';

import {Typo} from '../../component/atoms/typo';
import AuthTemplate from '../../component/templates/auth';
import {getShippingPlanService} from '../../share/services/shipping-plan';
import {FormatDayInWeek} from '../../share/utils/formater';

interface IMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

const HomeScreen = AuthTemplate(() => {
  const [loading, setLoading] = useState<boolean>(true);

  const [plans, setPlans] = useState<any[]>([]);
  const [meta, setMeta] = useState<IMeta | null>(null);

  useEffect(() => {
    getShippingPlan();
  }, []);

  const getShippingPlan = async () => {
    try {
      setLoading(true);
      const data: any = await getShippingPlanService();
      setPlans(data.data);
      console.log('plans data', data.data);
      console.log('plans meta', data.meta);

      setMeta(data.meta);
      setLoading(false);
    } catch (errr) {
      console.log('err');
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
  return (
    <Center w="100%">
      {!loading && (
        <Box w="100%" background={'#FFFFFF;'}>
          <ScrollView width={'100%'} padding={3} h="auto">
            <Heading mb="2" size="md">
              Số lượng đơn &#8226;{' '}
              {meta?.pagination.total ? meta.pagination.total : 0}
            </Heading>
            <VStack space={2} marginBottom={30}>
              {plans.map((item, itemI) => (
                <Pressable
                  key={itemI}
                  onPress={() => console.log("I'm Pressed")}>
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
                    background="#FFFFFF">
                    <Box
                      width={'100%'}
                      display="flex"
                      flexDirection={'row'}
                      justifyContent={'space-between'}>
                      <Typo
                        type="subtitle14"
                        width="100%"
                        flexShrink={1}
                        textAlign="left"
                        fontWeight={'bold'}>
                        Mã đơn hàng
                      </Typo>
                      <Typo
                        type="subtitle14"
                        width="100%"
                        flexShrink={1}
                        textAlign="right"
                        fontWeight={'bold'}>
                        #{item.attributes.order_code}
                      </Typo>
                    </Box>
                    <Box
                      width={'100%'}
                      display="flex"
                      flexDirection={'row'}
                      justifyContent={'space-between'}>
                      <Typo
                        type="body14"
                        width="100%"
                        flexShrink={1}
                        textAlign="left">
                        Thời gian đặt hàng
                      </Typo>
                      <Typo
                        type="body14"
                        width="100%"
                        flexShrink={1}
                        textAlign="right">
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
                      justifyContent={'space-between'}>
                      <Typo
                        type="body14"
                        width="100%"
                        flexShrink={1}
                        textAlign="left">
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
                        textAlign="right">
                        {formatStatus(item.attributes.status)}
                      </Typo>
                    </Box>
                    <Box
                      width={'100%'}
                      display="flex"
                      flexDirection={'row'}
                      justifyContent={'space-between'}>
                      <Typo
                        type="body14"
                        width="100%"
                        flexShrink={1}
                        textAlign="left">
                        Tổng thanh toán
                      </Typo>
                      <Typo
                        type="body14"
                        width="100%"
                        color={'#DC3545'}
                        flexShrink={1}
                        textAlign="right">
                        {item.attributes.total
                          ? item.attributes.total
                          : 'total'}
                      </Typo>
                    </Box>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </ScrollView>
        </Box>
      )}
    </Center>
  );
});

export default HomeScreen;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#FFFFFF',
//     border: '1px solid #EDEDED',
//     // padding:'16px'
//   },
//   tabActive: {
//     flex: 2,
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 10,
//     borderRadius: 10,
//   },
// });
