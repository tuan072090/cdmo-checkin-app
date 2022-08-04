export const ScreenName = {
  MAIN_SCREEN: "Main",
  HOME_SCREEN: "Home",
  LOGIN_SCREEN: "Login",
  SHIPPING_PLAN_SCREEN: "ShippingPlan",
  SHIPPING_PLAN_DETAIL_SCREEN: "ShippingPlanDetail",
  CREATE_SHIPPING_PLAN_SCREEN: "CreateShippingPlan",
  UPDATE_SHIPPING_PLAN_SCREEN: "UpdateShippingPlan",
  ACCOUNT_SCREEN: "Account",
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
    [ScreenName.UPDATE_SHIPPING_PLAN_SCREEN]: {
      path: `updateShippingPlan/:id`,
      parse: {
        id: String,
      },
    },
    [ScreenName.CREATE_SHIPPING_PLAN_SCREEN]: {
      path: `createShippingPlan`
    },
    [ScreenName.ACCOUNT_SCREEN]: {
      path: `account`
    }
  },
};
