import { Typo } from "@/components/atoms/typo";
import ScreenHeader from "@/components/organisms/screen-header";
import { getShippingPlanById } from "@/share/services/shipping-plan";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Input,
  KeyboardAvoidingView,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { ISHippingPlanDetail } from "./ShippingType";

const UpdateSHippingPlanScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { params } = route;
  const [orderType, setOrderType] = useState<
    "Giao đơn" | "Giao bổ sung" | "Thu hồi"
  >("Giao đơn");
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
  const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <Center w={"100%"}>
        <ScreenHeader
          hasBackButton={true}
          title={`Cập nhật đơn hàng #${
            plan?.attributes.order_code ? plan?.attributes.order_code : ""
          }`}
        ></ScreenHeader>
        <VStack space="2.5" mt={5} w={"100%"} p={3}>
          <Stack>
            <Box>
              <Typo type="subtitle14" mb={2}>
                Phương thức thanh toán:
              </Typo>
              <Checkbox value={"order_type"} isChecked={true}>
                Tiền mặt
              </Checkbox>
              <Checkbox value={"order_type"} isChecked={false}>
                Chuyển khoản
              </Checkbox>
            </Box>
            <Box>
              <Typo type="subtitle14" mb={2}>
                Loại đơn:
              </Typo>
              <Checkbox
                value={"Giao đơn"}
                // onChange={(text:string) => {
                //     setOrderType(text)
                // }}
                isChecked={orderType === "Giao đơn" ? true : false}
              >
                Đơn giao
              </Checkbox>
              <Checkbox
                value={"Giao bổ sung"}
                isChecked={orderType === "Giao bổ sung" ? true : false}
              >
                Đơn Bô sung
              </Checkbox>
              <Checkbox
                value={"Thu hồi"}
                isChecked={orderType === "Thu hồi" ? true : false}
              >
                Thu hồi
              </Checkbox>
            </Box>
            <Box>
              <Typo type="subtitle14" mb={2}>
                Số tiền:
              </Typo>
              <Input
                autoCapitalize="none"
                size="xl"
                // value={userName}
                onChangeText={(text: string) => {
                  // setUserName(text);
                }}
                placeholder="Nhập tên tài khoản"
              />
            </Box>
          </Stack>
          <Stack>
            <Box>
              <Typo type="subtitle14" mb={2}>
                Mật khẩu:
              </Typo>
              <Input
                autoCapitalize="none"
                size="xl"
                type="password"
                // value={password}
                onChangeText={(text: string) => {
                  // setPassword(text);
                }}
                placeholder="Nhập mật khẩu"
              />
            </Box>
          </Stack>
          <Stack>
            <Box>
              <Typo type="subtitle14" mb={2}>
                Hình ảnh:
              </Typo>
              <Input
                autoCapitalize="none"
                size="xl"
                type="password"
                // value={password}
                onChangeText={(text: string) => {
                  // setPassword(text);
                }}
                placeholder="Nhập mật khẩu"
              />
            </Box>
          </Stack>
          <Stack>
            <Button
              mt={15}
              size={"lg"}
              //   onPress={_handleLogin}
              borderRadius={12}
              backgroundColor={"#00875E"}
              disabled={loading}
            >
              {loading ? (
                <Spinner color="white" accessibilityLabel="Loading" />
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </Stack>
        </VStack>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default UpdateSHippingPlanScreen;
