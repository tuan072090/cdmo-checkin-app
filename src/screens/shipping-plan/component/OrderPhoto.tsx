import { Typo } from "@/components/atoms/typo";
import { Box } from "native-base";
import { Image as ImageNative } from "native-base";

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
  export default OrderPhoto