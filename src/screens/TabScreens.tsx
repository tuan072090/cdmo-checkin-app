import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './home';

import {StyleSheet, Text} from 'react-native';
import {ScreenName} from '@/share/config/routers';
import {
    NotificationIcon,
} from '@/components/atoms/icons/BottomNavIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Typo} from '@/components/atoms/typo';
import PressBox from '../components/atoms/press-box';
import ShippingPlanScreen from './shipping-plan';
import {Colors} from '@/share/config/colors';
import AccountScreen from '@/screens/account';

const Tab = createBottomTabNavigator();

export const TabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                unmountOnBlur: false,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 15,
                    marginHorizontal: 12,
                    paddingBottom: 0,
                    paddingHorizontal: 12,
                    height: 60,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
        >
            <Tab.Screen
                name={ScreenName.HOME_SCREEN}
                component={HomeScreen}
                options={{
                    tabBarButton: props => {
                        const isSelected = props.accessibilityState ? props.accessibilityState.selected : false
                        return (
                            // @ts-ignore
                            <PressBox {...props} style={styles.tab}>
                                <FeatherIcon name="home"
                                             size={isSelected ? 22 : 20}
                                             color={isSelected ? Colors.primary['500'] : Colors.muted['500']}
                                />

                                <Typo
                                    numberOfLines={1}
                                    pl={1}
                                    color={isSelected ? Colors.primary['500'] : Colors.muted['500']}
                                    type={isSelected ? "subtitle14" : "caption"}>
                                    Trang chủ
                                </Typo>
                            </PressBox>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={ScreenName.SHIPPING_PLAN_SCREEN}
                component={ShippingPlanScreen}
                options={{
                    tabBarButton: props => {
                        const isSelected = props.accessibilityState ? props.accessibilityState.selected : false
                        return (
                            // @ts-ignore
                            <PressBox {...props} style={styles.tab}>
                                <FeatherIcon name="archive"
                                             size={isSelected ? 22 : 20}
                                             color={isSelected ? Colors.primary['500'] : Colors.muted['500']}
                                />

                                <Typo
                                    numberOfLines={1}
                                    pl={1}
                                    color={isSelected ? Colors.primary['500'] : Colors.muted['500']}
                                    type={isSelected ? "subtitle14" : "caption"}>
                                    Đơn hàng
                                </Typo>
                            </PressBox>
                        );
                    },
                }}
            />
            <Tab.Screen
                name={ScreenName.ACCOUNT_SCREEN}
                component={AccountScreen}
                options={{
                    tabBarButton: props => {
                        const isSelected = props.accessibilityState ? props.accessibilityState.selected : false
                        return (
                            // @ts-ignore
                            <PressBox {...props} style={styles.tab}>
                                <FeatherIcon name="user"
                                             size={isSelected ? 22 : 20}
                                             color={isSelected ? Colors.primary['500'] : Colors.muted['500']}
                                />

                                <Typo
                                    numberOfLines={1}
                                    pl={1}
                                    color={isSelected ? Colors.primary['500'] : Colors.muted['500']}
                                    type={isSelected ? "subtitle14" : "caption"}>
                                    Tài khoản
                                </Typo>
                            </PressBox>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};
export default TabScreens;

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
