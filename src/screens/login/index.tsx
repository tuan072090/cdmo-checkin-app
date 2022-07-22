import {
  Box,
  Button,
  Center,
  Input,
  Stack,
  StatusBar,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import StaticImages from "../../share/static/imgs";
import { Image as ImageNative } from "native-base";
import { LoginService } from "../../share/services/auth";
import { useAppDispatch } from "../../redux/store";
import { UpdateAccessToken, UpdateUser } from "../../redux/reducers/auth";
import { UpdateMessage } from "../../redux/reducers/message";
import { Typo } from "@/components/atoms/typo";
import { Alert } from "react-native";

const LoginScreen = () => {
  const appDispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const _handleLogin = async () => {
    try {
      setLoading(true);
      const data: any = await LoginService(userName, password);
      const { jwt, user } = data;
      appDispatch(UpdateAccessToken(jwt));
      appDispatch(UpdateUser(user));
      appDispatch(UpdateUser(user));
      appDispatch(UpdateMessage("Đăng nhập thành công!"));
      setLoading(true);
    } catch (err) {
      Alert.alert("Sai tên tài khoản hoặc mật khẩu! vui lòng đăng nhập lại!");
      setLoading(false);
    }
  };
  
  return (
    <Center w="100%">
      <Box w="100%" h={"100%"} backgroundColor={"#E6F3EF"}>
        <Box
          display={"flex"}
          h="30%"
          w={"100%"}
          alignContent="center"
          justifyContent={"center"}
          alignItems="center"
        >
          <ImageNative
            width={200}
            mb={8}
            source={StaticImages.logo}
            alt="logo"
          />
        </Box>
        <Box bgColor={"#fff"} borderTopRadius={"70px"} h={"100%"}>
          <Box mt={"70px"} m="3">
            <Box>
              <Typo type="body14" fontWeight={"bold"} fontSize={"xl"}>
                Chào mừng đến với
              </Typo>
              <Typo type="body16" fontWeight={"bold"} fontSize={"2xl"}>
                Chợ đầu mối online
              </Typo>
            </Box>
          </Box>
          <VStack space="2.5" m={3}>
            <Stack>
              <Box>
                <Text>Tài khoản:</Text>
                <Input
                  borderRadius="12px"
                  value={userName}
                  onChangeText={(text: string) => {
                    setUserName(text);
                  }}
                  placeholder="Nhập tên tài khoản"
                  w="100%"
                />
              </Box>
            </Stack>
            <Stack>
              <Box>
                <Text>Mật khẩu:</Text>
                <Input
                  type="password"
                  value={password}
                  borderRadius="12px"
                  onChangeText={(text: string) => {
                    setPassword(text);
                  }}
                  placeholder="Nhập mật khẩu"
                  w="100%"
                />
              </Box>
            </Stack>
            <Stack>
              <Button
                size={"lg"}
                onPress={_handleLogin}
                borderRadius="12px"
                backgroundColor={"#00875E"}
              >
                Đăng nhập
              </Button>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Center>
  );
};

export default LoginScreen;
