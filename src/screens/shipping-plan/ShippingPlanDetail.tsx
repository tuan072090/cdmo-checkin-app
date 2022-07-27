import { Typo } from "@/components/atoms/typo";
import { getShippingPlanById } from "@/share/services/shipping-plan";
import { FormatDayInWeek } from "@/share/utils/formater";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Platform, StyleSheet } from "react-native";
import { ISHippingPlanDetail } from "./ShippingType";
import { Image as ImageNative } from "native-base";
import ScreenHeader from "@/components/organisms/screen-header";
import { ScreenName } from "@/share/config/routers";
import OrderPhoto from "./component/OrderPhoto";
import OrderDetail from "./component/OrderDetail";
import MerchantDetail from "./component/MerchantDetail";

const deviceWidth = Dimensions.get("window").width;

const ShippingPlanDetailScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { params } = route;

  const [plan, setPlan] = useState<ISHippingPlanDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getShippingPlanDetail();
  }, []);

  const getShippingPlanDetail = async () => {
    try {
      setLoading(true);
      const data: any = await getShippingPlanById(params.id);
      setPlan(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);

      Alert.alert("Lấy thông tin thất bại vui lòng thử lại");
      setLoading(false);
    }
  };

  const _navigationUpdateOrder = () => {
    // @ts-ignore
    navigation.navigate(ScreenName.UPDATE_SHIPPING_PLAN_DETAIL_SCREEN, {
      id: params.id,
    });
  };
  return (
    <Center w="100%">
      <ScrollView width={"100%"} pb={5} h="auto">
        <Box w="100%" background={"#FFFFFF"}>
          <ScreenHeader
            hasBackButton={true}
            title={`Đơn hàng #${
              plan?.attributes.order_code ? plan?.attributes.order_code : ""
            }`}
          ></ScreenHeader>
          {plan && (
            <Box padding={3}>
              <MerchantDetail plan={plan} />
              <OrderDetail plan={plan} />
              <OrderPhoto plan={plan} />
            </Box>
          )}

          <Box w={"100%"} p={3}>
            <Button
              mt={15}
              size={"lg"}
              onPress={_navigationUpdateOrder}
              borderRadius={12}
              backgroundColor={"#00875E"}
              disabled={loading}
            >
              Cập nhật đơn
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </Center>
  );
};

export default ShippingPlanDetailScreen;
