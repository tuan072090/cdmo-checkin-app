import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
 
import React, { useRef } from "react";
import TabScreens from "./TabScreens";
import { Deeplink, ScreenName } from "@/share/config/routers";
 import { Box, Spinner } from "native-base";
import { useAppSelector } from "@/redux/store";
import CameraScreen from "@/screens/camera";
import FloatMessage from "@/components/molecules/float-message";
import LoginScreen from "./login";
import HomeScreen from "./home";
import ShippingPlanScreen from "./shipping-plan";
import ShippingPlanDetailScreen from "./shipping-plan/ShippingPlanDetail";
import UpdateSHippingPlanScreen from "./shipping-plan/UpdateShippingPlan";
 
const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  const navigationRef = useRef<NavigationContainerRef<any> | null>(null);
  const { accessToken } = useAppSelector((state) => state.auth);

  const onReadyNav = function () {
    //  use for tracking
  };

  const linking = {
    prefixes: [],
    Deeplink,
  };

  return (
    <>
      <FloatMessage />
      <NavigationContainer
        ref={navigationRef}
        onReady={onReadyNav}
        linking={linking}
        fallback={
          <Box flex={1} alignItems="center" justifyContent="center">
            <Spinner color="muted.500" />
          </Box>
        }
      >
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "#086981",
            headerBackTitle: "Trở về",
          }}
        >
          {!accessToken ? (
            <Stack.Screen
              name={ScreenName.LOGIN_SCREEN}
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name={ScreenName.MAIN_SCREEN}
                component={TabScreens}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={ScreenName.HOME_SCREEN}
                component={HomeScreen}
                options={{ title: "Home", headerShown: true }}
              />
              <Stack.Screen
                name={ScreenName.SHIPPING_PLAN_SCREEN}
                component={ShippingPlanScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={ScreenName.SHIPPING_PLAN_DETAIL_SCREEN}
                component={ShippingPlanDetailScreen}
                options={{ title: "Shipping plan" }}
              />
              <Stack.Screen
                name={ScreenName.UPDATE_SHIPPING_PLAN_DETAIL_SCREEN}
                component={UpdateSHippingPlanScreen}
                options={{ title: "Shipping plan", headerShown: false }}
              />
              {/* <Stack.Screen
                name={ScreenName.CAMERA_SCREEN}
                component={CameraScreen}
                options={{ title: "Camera", headerShown: false }}
              /> */}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
