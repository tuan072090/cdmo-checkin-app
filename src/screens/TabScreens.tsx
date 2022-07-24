import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './home';

import {StyleSheet, Text} from 'react-native';
import {ScreenName} from '@/share/config/routers';
import {
    HomeIcon,
    NotificationIcon,
} from '@/components/atoms/icons/BottomNavIcons';
import {Typo} from '@/components/atoms/typo';
import PressBox from '../components/atoms/press-box';
import ShippingPlanScreen from './shipping-plan';

const Tab = createBottomTabNavigator();

export const TabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                unmountOnBlur: true,
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
                        //  @ts-ignore
                        if (props.accessibilityState.selected) {
                            return (
                                // @ts-ignore
                                <PressBox {...props} style={styles.tabActive}>
                                    <HomeIcon active={true} size={19}/>

                                    <Typo
                                        numberOfLines={1}
                                        pl={1}
                                        color="primary.500"
                                        type="subtitle14">
                                        Trang chủ
                                    </Typo>
                                </PressBox>
                            );
                        }
                        return (
                            //  @ts-ignore
                            <PressBox {...props} style={styles.tab}>
                                <HomeIcon active={true} size={19}/>
                                <Typo
                                    numberOfLines={1}
                                    pl={1}
                                    // color="primary.500"
                                    type="caption">
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
                        //  @ts-ignore
                        if (props.accessibilityState.selected) {
                            return (
                                // @ts-ignore
                                <PressBox {...props} style={styles.tabActive}>
                                    <HomeIcon active={true} size={19}/>
                                    <Typo
                                        numberOfLines={1}
                                        pl={1}
                                        color="primary.500"
                                        type="caption">
                                        Đơn hàng
                                    </Typo>
                                </PressBox>
                            );
                        }
                        return (
                            //  @ts-ignore
                            <PressBox {...props} style={styles.tab}>
                                <NotificationIcon active={true} size={19}/>
                                <Typo
                                    numberOfLines={1}
                                    pl={1}
                                    // color="primary.500"
                                    type="caption">
                                    Đơn hàng
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
    tabActive: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
});
