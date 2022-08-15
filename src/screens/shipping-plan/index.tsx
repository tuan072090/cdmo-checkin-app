import {Box, Button, Center, Heading, HStack, ScrollView, Spinner, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@/redux/store';
import {getShippingPlans} from '@/share/services/shipping-plan';
import {Alert} from 'react-native';
import {ShippingPlanCard} from '@/components';
import {Colors} from '@/share/config/colors';
import PressBox from '@/components/atoms/press-box';
import {Typo} from '@/components/atoms/typo';

interface IMeta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

const ShippingPlanScreen = () => {
    const navigation = useNavigation();
    const [display, setDisplay] = useState<"delivered"|"other">("other")
    const [loading, setLoading] = useState<boolean>(true);
    const [plans, setPlans] = useState<any[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const {user} = useAppSelector(state => state.auth);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getShippingPlan(display);
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation, user]);

    const getShippingPlan = async (displayInput: "delivered"|"other") => {
        try {
            if (!user) {
                return;
            }
            setLoading(true);
            const filterParams:any = {'filters[shipper][id][$eq]': user.id}
            if(displayInput === "delivered"){
                filterParams["filters[status][$eq]"] = "delivered"
            }else {
                filterParams["filters[status][$ne]"] = "delivered"
            }
            const {data, meta} = await getShippingPlans(filterParams);
            setPlans(data);
            setMeta(meta);
            setLoading(false);
        } catch (err) {
            // @ts-ignore
            Alert.alert(err.message);
            setLoading(false);
        }
    };

    const _changeDisplay = (value: "delivered"|"other") => {
        setDisplay(value)
        getShippingPlan(value)
    }

    return (
        <Center flex={1} w="100%" safeAreaTop backgroundColor="white">
            <HStack p={4} alignItems="center" justifyContent="center">
                <Button mx={2} w="40%" variant={display !== 'other' ? 'outline' : undefined}
                         colorScheme={display !== 'other' ? 'gray.200' : 'primary'}
                         onPress={() => _changeDisplay("other")}>
                    <Typo type="body16" color={display !== 'other' ? 'gray.500' : 'white'}>Tất cả</Typo>
                </Button>
                <Button mx={2} w="40%" variant={display !== 'delivered' ? 'outline' : undefined}
                        colorScheme={display !== 'delivered' ? 'gray.200' : 'primary'}
                        onPress={() => _changeDisplay("delivered")}>
                    <Typo type="body16" color={display !== 'delivered' ? 'gray.500' : 'white'}>Đã giao</Typo>
                </Button>
            </HStack>
            <ScrollView width={'100%'} p={3} pb={5} h="auto">
                <Heading mb="2" size="md">
                    Tổng đơn hàng &#8226;{' '}
                    {meta?.pagination.total ? meta.pagination.total : 0}
                </Heading>
                {
                    loading && <Center w="100%" p={5}><Spinner color={Colors.primary['500']}/></Center>
                }
                <VStack space={2}>
                    {plans.map((item, key) => (
                        <ShippingPlanCard shippingPlan={item} key={key}/>
                    ))}
                </VStack>

                <Box width="100%" height={56}/>
            </ScrollView>
        </Center>
    );
};

export default ShippingPlanScreen;
