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
  Radio,
  ScrollView,
  Spinner,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { ISHippingPlanDetail } from "./ShippingType";

const UpdateShippingPlanScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { params } = route;
  const [orderType, setOrderType] = useState<
    "Giao đơn" | "Giao bổ sung" | "Thu hồi"
  >("Giao đơn");
  const [paymentType, setPaymentType] = useState<"COD" | "TRANSFER">("COD");
  const [plan, setPlan] = useState<ISHippingPlanDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("");
  const [note, setNote] = useState<string>("");

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
      <ScreenHeader
        hasBackButton={true}
        title={`Cập nhật đơn hàng #${
          plan?.attributes.order_code ? plan?.attributes.order_code : ""
        }`}
      ></ScreenHeader>
      <Center w={"100%"}>
        <ScrollView width={"100%"} p={3} pb={5} h="auto">
          <VStack space="2.5" mt={5} w={"100%"} p={3}>
            <Stack>
              <Box>
                <Typo type="subtitle14" mb={2}>
                  Loại đơn:
                </Typo>
                <Radio.Group
                  name="myRadioGroup"
                  accessibilityLabel="favorite number"
                  value={orderType}
                  onChange={(nextValue: any) => {
                    setOrderType(nextValue);
                  }}
                >
                  <Radio value="Giao đơn" my={1}>
                    Giao đơn
                  </Radio>
                  <Radio value="Giao bổ sung" my={1}>
                    Giao bổ sung
                  </Radio>
                  <Radio value="Thu hồi" my={1}>
                    Thu hồi
                  </Radio>
                </Radio.Group>
              </Box>
              <Box>
                <Typo type="subtitle14" mb={2}>
                  Phương thức thanh toán:
                </Typo>
                <Radio.Group
                  name="paymentType"
                  accessibilityLabel="favorite number"
                  value={paymentType}
                  onChange={(nextValue: any) => {
                    setPaymentType(nextValue);
                  }}
                >
                  <Radio value="COD" my={1}>
                    Tiền mặt
                  </Radio>
                  <Radio value="TRANSFER" my={1}>
                    Chuyển khoản
                  </Radio>
                </Radio.Group>
              </Box>
            </Stack>
            <Stack>
              {paymentType === "COD" && (
                <Box>
                  <Typo type="subtitle14" mb={2}>
                    Số tiền:
                  </Typo>
                  <Input
                    type="text"
                    autoCapitalize="none"
                    size="xl"
                    value={price}
                    onChangeText={(text: string) => {
                      setPrice(text);
                    }}
                    placeholder="Nhập tên tài khoản"
                  />
                </Box>
              )}
              {/* <Box>
                <Typo type="subtitle14" mb={2}>
                  Ghi chú
                </Typo>
                <Input
                  autoCapitalize="none"
                  size="xl"
                  type="text"
                  value={note}
                  onChangeText={(text: string) => {
                    setNote(text);
                  }}
                  placeholder="Nhập ghi chú"
                />
              </Box> */}
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
                  "Cập nhật"
                )}
              </Button>
            </Stack>
          </VStack>
        </ScrollView>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default UpdateShippingPlanScreen;
