export const ScreenName = {
  MAIN_SCREEN: "Main",
  HOME_SCREEN: "Home",
  LOGIN_SCREEN: "Login",
  SHIPPING_PLAN_SCREEN: "ShippingPlan",
  SHIPPING_PLAN_DETAIL_SCREEN: "ShippingPlanDetail",
  UPDATE_SHIPPING_PLAN_DETAIL_SCREEN: "UpdateShippingPlanDetail",
  ACCOUNT_SCREEN: "Account",
  CAMERA_SCREEN: "Camera",
};

export const Deeplink = {
  screens: {
    Main: {
      screens: {
        [ScreenName.HOME_SCREEN]: "home",
      },
    },
    [ScreenName.SHIPPING_PLAN_DETAIL_SCREEN]: {
      path: `shippingPlan/:id`,
      parse: {
        id: String,
      },
    },
    [ScreenName.UPDATE_SHIPPING_PLAN_DETAIL_SCREEN]: {
      path: `UpdateShippingPlanDetail/:id`,
      parse: {
        id: String,
      },
    },
    [ScreenName.ACCOUNT_SCREEN]: {
      path: `account`,
    },
    [ScreenName.CAMERA_SCREEN]: {
      path: `camera`,
    },
  },
};
