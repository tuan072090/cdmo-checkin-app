import React, {useEffect, useState} from 'react';
import {Box, Center, Heading, HStack, ScrollView, Spinner, VStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@/redux/store';
import {getShippingPlans} from '@/share/services/shipping-plan';
import {Alert} from 'react-native';
import {ShippingPlanCard} from '@/components';
import PressBox from '@/components/atoms/press-box';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors} from '@/share/config/colors';
import {Typo} from '@/components/atoms/typo';

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
            _getShippingPlans();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useEffect(()=>{
        _getShippingPlans();
    },[user])

    const _getShippingPlans = async () => {
        try {
            if (!user) {
                return;
            }
            setLoading(true);
            const {data, meta} = await getShippingPlans({
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
            <ScrollView width={'100%'} p={4} pb={5} h="auto">
                <HStack mb="2" alignItems="center">
                    <Typo type="title">
                        Đơn chưa giao &#8226;{' '}
                        {meta?.pagination.total ? meta.pagination.total : 0}
                    </Typo>
                    {
                        !loading && <PressBox onPress={_getShippingPlans} p={3}>
                            <FeatherIcon name="refresh-ccw" size={25} color={Colors.primary['500']}/>
                        </PressBox>
                    }
                </HStack>

                <VStack space={2}>
                    {
                        loading && <Center w="100%" p={5}><Spinner color="primary.500"/></Center>
                    }
                    {plans.map((item, key) => (
                        <ShippingPlanCard shippingPlan={item} key={key}/>
                    ))}
                </VStack>
                <Box w="100%" h={48}/>
            </ScrollView>
        </Box>
    )
}

export default NotDeliveryList
