export interface ISHippingPlanDetail {
  id: number;
  attributes: {
    status: string;
    payment: string;
    total: number;
    sort: number;
    order_code: string;
    createdAt: string;
    updatedAt: string;
    shipper: ISHipper;
    photos: IPhoto;
    merchant: IMerchant;
    orderType: IOrderType
  };
}

export interface IPhoto {
  data: {
    id: 2;
    attributes: {
      name: string;
      alternativeText?: any;
      caption: any;
      width: number;
      height: number;
      formats: {
        small: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: null;
          size: number;
          width: number;
          height: number;
        };
        thumb: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path?: any;
          size: number;
          width: number;
          height: number;
        };
        thumbnail: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path?: any;
          size: number;
          width: number;
          height: number;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl?: any;
      provider: string;
      provider_metadata?: any;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export interface ISHipper {
  data: {
    id: number;
    attributes: {
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface IMerchant {
  data: {
    id: number;
    attributes: {
      cate: string;
      stt: string;
      pic: string;
      status: string;
      contact_name: string;
      contact_phone: string;
      address: string;
      ward: string;
      district: string;
      note: string;
      how: string;
      delivery_before: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export type IOrderType = "deliver" | "add" | "reject"
export type IOrderPaymentMethod = "COD" | "TRANSFER"
