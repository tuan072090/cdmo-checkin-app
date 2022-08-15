import {Box, Center, Heading, ScrollView, Spinner, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@/redux/store';
import {getShippingPlans} from '@/share/services/shipping-plan';
import {Alert} from 'react-native';
import {ShippingPlanCard} from '@/components';
import {Colors} from '@/share/config/colors';

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
    const [loading, setLoading] = useState<boolean>(true);
    const [plans, setPlans] = useState<any[]>([]);
    const [meta, setMeta] = useState<IMeta | null>(null);
    const {user} = useAppSelector(state => state.auth);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getShippingPlan();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation, user]);

    const getShippingPlan = async () => {
        try {
            if (!user) {
                return;
            }
            setLoading(true);
            const {data, meta} = await getShippingPlans({'filters[shipper][id][$eq]': user.id});
            setPlans(data);
            setMeta(meta);
            setLoading(false);
        } catch (err) {
            // @ts-ignore
            Alert.alert(err.message);
            setLoading(false);
        }
    };

    return (
        <Center w="100%" safeAreaTop>
            <Box w="100%" background={'#FFFFFF;'}>
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
            </Box>
        </Center>
    );
};

export default ShippingPlanScreen;
