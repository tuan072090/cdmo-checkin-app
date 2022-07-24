import {
    NavigationContainer,
    NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './home/index';
import LoginScreen from './login/index';
import React, {useRef} from 'react';
import TabScreens from './TabScreens';
import {Deeplink, ScreenName} from '@/share/config/routers';
import FloatMessage from '../components/molecules/float-message';
import ShippingPlanScreen from './shipping-plan';
import ShippingPlanDetailScreen from './shipping-plan/ShippingPlanDetail';
import {Text} from 'native-base';

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
    const routeNameRef = useRef('');
    // @ts-ignore
    const navigationRef = useRef<NavigationContainerRef | null>(null);
    const onReadyNav = function () {
        if (!navigationRef || !navigationRef.current) {
            return false;
        } else {
            return (routeNameRef.current =
                navigationRef.current.getCurrentRoute().name);
        }
    };
    const linking = {
        prefixes: [],
        Deeplink,
    };
    return (
        <>
            <FloatMessage/>
            <NavigationContainer
                ref={navigationRef}
                onReady={onReadyNav}
                linking={linking}
                fallback={<Text>Loading...</Text>}
            >
                <Stack.Navigator
                    screenOptions={{
                        headerTintColor: '#086981',
                        headerBackTitle: 'Trở về',
                    }}
                >
                    {/* Tab screens */}
                    <Stack.Screen
                        name={ScreenName.MAIN_SCREEN}
                        component={TabScreens}
                        options={{headerShown: false}}
                    />
                    {/* End Tab screens */}
                    <Stack.Screen
                        name={ScreenName.HOME_SCREEN}
                        component={HomeScreen}
                        options={{title: 'Home', headerShown: true}}
                    />
                    <Stack.Screen
                        name={ScreenName.LOGIN_SCREEN}
                        component={LoginScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={ScreenName.SHIPPING_PLAN_SCREEN}
                        component={ShippingPlanScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={ScreenName.SHIPPING_PLAN_DETAIL_SCREEN}
                        component={ShippingPlanDetailScreen}
                        // options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};
