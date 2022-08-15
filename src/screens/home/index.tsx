import React, {useState} from 'react';
import {Box, Button, HStack} from 'native-base';
import NotDeliveryList from '@/screens/home/components/NotDeliveryList';
import ShippingPlanSelectMerchant from '@/screens/home/components/ShippingPlanSelectMerchant';
import {Typo} from '@/components/atoms/typo';

const HomeScreen = () => {
    const [display, setDisplay] = useState<'list' | 'create'>('list');

    return (
        <Box flex={1} backgroundColor="#f4f4f4" safeAreaTop>
            <HStack p={4}>
                <Button mr={3} variant={display !== 'list' ? 'outline' : undefined}
                        colorScheme={display !== 'list' ? 'gray.200' : 'primary'} onPress={() => setDisplay('list')}>
                    <Typo type="body16" color={display !== 'list' ? 'gray.500' : 'white'}>Chưa giao</Typo>
                </Button>
                <Button variant={display !== 'create' ? 'outline' : undefined}
                        colorScheme={display !== 'create' ? 'gray.200' : 'primary'}
                        onPress={() => setDisplay('create')}>
                    <Typo type="body16" color={display !== 'create' ? 'gray.500' : 'white'}>Tạo đơn mới</Typo>
                </Button>
            </HStack>

            {
                display === 'list' && <NotDeliveryList/>
            }
            {
                display === 'create' && <ShippingPlanSelectMerchant/>
            }
        </Box>
    );
};

export default HomeScreen;
