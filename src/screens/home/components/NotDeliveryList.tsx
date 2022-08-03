import React, {useEffect, useState} from 'react';
import {Box, Center, Heading, ScrollView, Spinner, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@/redux/store';
import {getShippingPlanService} from '@/share/services/shipping-plan';
import {Alert} from 'react-native';
import {ShippingPlanCard} from '@/components';

interface IMeta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

const NotDeliveryList: React.FC = () => {
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
    }, [navigation]);

    useEffect(()=>{
        getShippingPlan();
    },[user])

    const getShippingPlan = async () => {
        try {
            if (!user) {
                return;
            }
            setLoading(true);
            const {data, meta} = await getShippingPlanService({
                'filters[shipper][id][$eq]': user.id,
                'filters[status][$eq]': 'no-delivery',
            });
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
        <Box w="100%">
            {
                loading && <Center w="100%" p={5}><Spinner color="black"/></Center>
            }
            {!loading && (
                <ScrollView width={'100%'} p={4} pb={5} h="auto">
                    <Heading mb="2" size="md">
                        Đơn chưa giao &#8226;{' '}
                        {meta?.pagination.total ? meta.pagination.total : 0}
                    </Heading>

                    <VStack space={2}>
                        {plans.map((item, key) => (
                            <ShippingPlanCard shippingPlan={item} key={key}/>
                        ))}
                    </VStack>
                </ScrollView>
            )}
        </Box>
    )
}

export default NotDeliveryList
