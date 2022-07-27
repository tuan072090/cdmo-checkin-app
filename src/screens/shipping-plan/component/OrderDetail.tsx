import { Typo } from '@/components/atoms/typo';
import { FormatDayInWeek } from '@/share/utils/formater';
import moment from 'moment';
import { Box } from 'native-base';
import React from 'react'

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
  
export default OrderDetail