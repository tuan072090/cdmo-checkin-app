import React, {useEffect, useState} from 'react';
import {Box, HStack, Input, Spinner} from 'native-base';
import {getAllMerchants} from '@/share/services';
import {Typo} from '@/components/atoms/typo';
import {Alert, FlatList, ScrollView} from 'react-native';
import PressBox from '@/components/atoms/press-box';
import {useAppDispatch, useAppSelector} from '@/redux/store';
import {UpdateMerchants} from '@/redux/reducers/merchants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors} from '@/share/config/colors';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '@/share/config/routers';

const CreateShippingPlan: React.FC = () => {
    const navigation = useNavigation()
    const {merchants} = useAppSelector(state => state.merchants);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (merchants && merchants.length === 0) {
            _fetchAllMerchant();
        }
    }, []);

    const _fetchAllMerchant = async () => {
        try {
            setLoading(true);
            const res = await getAllMerchants();
            dispatch(UpdateMerchants(res));
            setLoading(false);
        } catch (err) {
            // @ts-ignore
            Alert.alert(err.message);
        }
    };

    const _navToCreateShippingPlan = (id:string|number) => {
        // @ts-ignore
        navigation.navigate(ScreenName.CREATE_SHIPPING_PLAN_SCREEN, {merchantId: id})
    };

    // @ts-ignore
    const _renderItem = ({item}) => {
        return (
            <PressBox onPress={() => _navToCreateShippingPlan(item.id)}
                      px={5} py={3}
                      flexDir="row" justifyContent="space-between" alignItems="center"
                      backgroundColor="white"
                      borderBottomWidth={1}
                      borderBottomColor="gray.200">
                <Box>
                    <Typo type="subtitle14">{item.attributes.name}</Typo>
                    <Typo type="caption">{item.attributes.address}</Typo>
                </Box>
                <FeatherIcon name="arrow-right" size={20} color="#9e9e9e"/>
            </PressBox>
        );
    };

    return (
        <Box w="100%">
            <HStack px={5} mb={5} alignItems="center">
                <Input placeholder="chọn cửa hàng" size="xl" w="80%"/>
                {
                    !loading && <PressBox onPress={_fetchAllMerchant} p={3}>
                        <FeatherIcon name="refresh-ccw" size={25} color={Colors.primary['500']}/>
                    </PressBox>
                }
            </HStack>
            {
                loading && <Spinner mt={5} color="primary.500"/>
            }
            <FlatList
                data={merchants}
                renderItem={_renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent={(<Box w="100%" h={48}/>)}
            />
        </Box>
    );
};

export default CreateShippingPlan;
