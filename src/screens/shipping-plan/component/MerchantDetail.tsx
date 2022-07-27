import { Typo } from '@/components/atoms/typo';
import { Box } from 'native-base';
import React from 'react'


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
  
export default MerchantDetail