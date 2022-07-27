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

const MerchantDetail = ({ plan }: any) => {
  return (
    <>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo
          type="body16"
          width="100%"
          flexShrink={1}
          textAlign="left"
          fontWeight={"bold"}
        >
          Chi tiết Cửa hàng
        </Typo>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo type="body14" width="100%" flexShrink={1} textAlign="left">
          Tên quán
        </Typo>
        <Typo type="body14" width="100%" flexShrink={1} textAlign="right">
          {plan.attributes.merchant.data.attributes.name
            ? plan.attributes.merchant.data.attributes.name
            : ""}
        </Typo>
      </Box>

      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo type="body14" width="100%" flexShrink={1} textAlign="left">
          Tên liên hệ
        </Typo>
        <Typo type="body14" width="100%" flexShrink={1} textAlign="right">
          {plan.attributes.merchant.data.attributes.contact_name
            ? plan.attributes.merchant.data.attributes.contact_name
            : ""}
        </Typo>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo type="body14" width="100%" flexShrink={1} textAlign="left">
          SDT
        </Typo>
        <Typo type="body14" width="100%" flexShrink={1} textAlign="right">
          {plan.attributes.merchant.data.attributes.contact_phone
            ? plan.attributes.merchant.data.attributes.contact_phone
            : ""}
        </Typo>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo type="body14" width="100%" flexShrink={1} textAlign="left">
          SDT
        </Typo>
        <Typo type="body14" width="100%" flexShrink={1} textAlign="right">
          {plan.attributes.merchant.data.attributes.contact_phone
            ? plan.attributes.merchant.data.attributes.contact_phone
            : ""}
        </Typo>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo type="body14" width="100%" flexShrink={1} textAlign="left">
          Địa chỉ
        </Typo>
        <Typo type="body14" width="100%" flexShrink={1} textAlign="right">
          {plan.attributes.merchant.data.attributes.address
            ? plan.attributes.merchant.data.attributes.address
            : ""}
        </Typo>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo type="body14" width="100%" flexShrink={1} textAlign="left">
          Ghi chú quán
        </Typo>
        <Typo type="body14" width="100%" flexShrink={1} textAlign="right">
          {plan.attributes.merchant.data.attributes.note
            ? plan.attributes.merchant.data.attributes.note
            : "Không có ghi chú"}
        </Typo>
      </Box>
    </>
  );
};

const OrderDetail = ({ plan }: any) => {
  return (
    <>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo
          type="body16"
          width="100%"
          flexShrink={1}
          textAlign="left"
          fontWeight={"bold"}
        >
          Chi tiết đơn hàng
        </Typo>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo
          type="subtitle14"
          width="100%"
          flexShrink={1}
          textAlign="left"
          fontWeight={"bold"}
        >
          Mã đơn hàng
        </Typo>
        <Typo
          type="subtitle14"
          width="100%"
          flexShrink={1}
          textAlign="right"
          fontWeight={"bold"}
        >
          #{plan.attributes.order_code}
        </Typo>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo type="body14" width="100%" flexShrink={1} textAlign="left">
          Thời gian đặt hàng
        </Typo>
        <Typo type="body14" width="100%" flexShrink={1} textAlign="right">
          {FormatDayInWeek(moment(plan.attributes.createdAt).format("dddd"))}{" "}
          {moment(plan.attributes.createdAt).format("hh:mm - MM-DD-YYYY")}
        </Typo>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo type="body14" width="100%" flexShrink={1} textAlign="left">
          Trạng thái đơn
        </Typo>
        <Typo
          type="body14"
          width="100%"
          flexShrink={1}
          color={
            plan.attributes.status === "delivered"
              ? "#006843"
              : plan.attributes.status === "canceled"
              ? "#DC3545"
              : ""
          }
          textAlign="right"
        >
          {plan.attributes.status === "delivered"
            ? "Đã giao hàng"
            : plan.attributes.status === "no-delivered"
            ? "chưa giao hàng"
            : plan.attributes.status === "canceled"
            ? "Đã hủy đơn hàng"
            : ""}
        </Typo>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo type="body14" width="100%" flexShrink={1} textAlign="left">
          Tổng thanh toán
        </Typo>
        <Typo
          type="body14"
          width="100%"
          color={"#DC3545"}
          flexShrink={1}
          textAlign="right"
        >
          {plan.attributes.total ? plan.attributes.total : ""}
        </Typo>
      </Box>
    </>
  );
};

const OrderPhoto = ({ plan }: any) => {
  return (
    <>
      <Box
        width={"100%"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Typo
          type="body16"
          width="100%"
          flexShrink={1}
          textAlign="left"
          fontWeight={"bold"}
        >
          Hình ảnh
        </Typo>
      </Box>
      <Box width={"100%"} p={3}>
        {plan &&
          plan.attributes.photos.data.map((item: any, index: any) => {
            return (
              <Box
                display={"flex"}
                key={index}
                w={"100%"}
                alignContent="center"
                justifyContent={"center"}
                alignItems="center"
              >
                <ImageNative
                  width={"100%"}
                  resizeMode="cover"
                  mb={3}
                  height={"120px"}
                  source={{
                    uri: item.attributes.url,
                  }}
                  alt={item.attributes.name}
                />
              </Box>
            );
          })}
      </Box>
    </>
  );
};
