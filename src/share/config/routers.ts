export const ScreenName = {
  MAIN_SCREEN: "Main",
  HOME_SCREEN: "Home",
  LOGIN_SCREEN: "Login",
  SHIPPING_PLAN_SCREEN: "ShippingPlan",
  SHIPPING_PLAN_DETAIL_SCREEN: "ShippingPlanDetail",
};

export const Deeplink = {
  screens: {
    Main: {
      screens: {
        [ScreenName.HOME_SCREEN]: "home",
      },
    },
    [ScreenName.SHIPPING_PLAN_DETAIL_SCREEN]: {
      path: `ShippingPlanDetail/:id`,
      parse: {
        id: String,
      },
    },
  },
};
