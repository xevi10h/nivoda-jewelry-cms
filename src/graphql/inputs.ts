import {
  JewelleryTypeEnum,
  JewelleryMetalTypeEnum,
  JewelleryMetalKaratEnum,
  JewellerySettingEnum,
  CatalogSourceEnum,
  JewelleryStonePosition,
} from './enums';

// Input types for creating/updating jewellery

export interface CreateJewelleryInput {
  jewellery: JewelleryInput;
  engagement_ring?: JewelleryEngagementRingInput;
  wedding_band?: JewelleryWeddingBandInput;
  bracelet?: JewelleryBraceletInput;
  earring?: JewelleryEarringInput;
  necklace?: JewelleryNecklaceInput;
  pendant?: JewelleryPendantInput;
  mounts?: JewelleryMountInput[];
  stones?: JewelleryStoneInput[];
  files?: JewelleryFileInput[];
  services?: JewelleryServiceInput[];
  catalogSource?: CatalogSourceEnum;
}

export interface UpdateJewelleryInput {
  jewellery: JewelleryInput;
  engagement_ring?: JewelleryEngagementRingInput;
  wedding_band?: JewelleryWeddingBandInput;
  bracelet?: JewelleryBraceletInput;
  earring?: JewelleryEarringInput;
  necklace?: JewelleryNecklaceInput;
  pendant?: JewelleryPendantInput;
  mounts?: JewelleryMountInput[];
  stones?: JewelleryStoneInput[];
  files?: JewelleryFileInput[];
  services?: JewelleryServiceInput[];
}

export interface JewelleryInput {
  id?: string;
  isMigratedFromIntegrations?: boolean;
  isFinished?: boolean;
  adminId?: string;
  agta?: string;
  availableQty?: number;
  comments?: string;
  customerBudget?: number;
  catalogSource?: CatalogSourceEnum;
  customerCompanyId?: string;
  customerPayload?: string;
  customerRequestMethod?: string;
  customerId?: string;
  description?: string;
  gender?: 'FEMALE' | 'MALE';
  hazardous?: boolean;
  heavy?: boolean;
  jewelleryOrderItemId?: string;
  locationId?: string;
  media?: string;
  merchandisingArea?: string;
  nivodaQuotedPrice?: number;
  nivodaStockId?: string;
  qcRequirements?: string;
  sku?: string;
  skuSupplier?: string;
  status: string;
  supplierCompanyId?: string;
  supplierFinalPrice?: number;
  supplierQuotedPrice?: number;
  supplierStockId?: string;
  thPrId?: string;
  type: JewelleryTypeEnum;
}

export interface JewelleryEngagementRingInput {
  id?: string;
  category?: string;
  comments?: string;
  description?: string;
  fingerSize?: string;
  finish?: string;
  insideEngravingFont?: string;
  insideEngravingText?: string;
  metalKarat: JewelleryMetalKaratEnum;
  metalType: JewelleryMetalTypeEnum;
  style?: string;
  color?: string;
  metalQuality?: string;
  stoneShape?: string;
  accentMetalKarat?: JewelleryMetalKaratEnum;
  accentMetalType?: JewelleryMetalTypeEnum;
  nivodaQuotedLaborPrice?: number;
  nivodaQuotedMetalPrice?: number;
  outsideEngravingFont?: string;
  outsideEngravingText?: string;
  profile?: string;
  prongCount?: string;
  prongStyle?: string;
  rhodium?: string;
  setting: JewellerySettingEnum;
  settingMethod?: string;
  sizeType: string;
  supplierFinalLaborPrice?: number;
  supplierFinalMetalPrice?: number;
  supplierQuotedLaborPrice?: number;
  supplierQuotedMetalPrice?: number;
}

export interface JewelleryBraceletInput {
  id?: string;
  chainFunction?: string;
  claspType?: string;
  comments?: string;
  description?: string;
  isHollow?: boolean;
  length?: number;
  metalKarat: JewelleryMetalKaratEnum;
  metalType: JewelleryMetalTypeEnum;
  accentMetalKarat?: JewelleryMetalKaratEnum;
  accentMetalType?: JewelleryMetalTypeEnum;
  setting: JewellerySettingEnum;
  nivodaQuotedLaborPrice?: number;
  nivodaQuotedMetalPrice?: number;
  supplierFinalLaborPrice?: number;
  supplierFinalMetalPrice?: number;
  supplierQuotedLaborPrice?: number;
  supplierQuotedMetalPrice?: number;
  width?: number;
}

export interface JewelleryEarringInput {
  id?: string;
  comments?: string;
  description?: string;
  isASingleEarring: boolean;
  metalKarat: JewelleryMetalKaratEnum;
  metalType: JewelleryMetalTypeEnum;
  accentMetalKarat?: JewelleryMetalKaratEnum;
  accentMetalType?: JewelleryMetalTypeEnum;
  nivodaQuotedLaborPrice?: number;
  nivodaQuotedMetalPrice?: number;
  post: string;
  prongStyle?: string;
  setting: JewellerySettingEnum;
  subcategory?: string;
  supplierFinalLaborPrice?: number;
  supplierFinalMetalPrice?: number;
  supplierQuotedLaborPrice?: number;
  supplierQuotedMetalPrice?: number;
}

export interface JewelleryNecklaceInput {
  id?: string;
  chainFunction?: string;
  claspType?: string;
  comments?: string;
  description?: string;
  isHollow?: boolean;
  length?: number;
  metalKarat: JewelleryMetalKaratEnum;
  metalType: JewelleryMetalTypeEnum;
  accentMetalKarat?: JewelleryMetalKaratEnum;
  accentMetalType?: JewelleryMetalTypeEnum;
  nivodaQuotedLaborPrice?: number;
  nivodaQuotedMetalPrice?: number;
  setting: JewellerySettingEnum;
  supplierFinalLaborPrice?: number;
  supplierFinalMetalPrice?: number;
  supplierQuotedLaborPrice?: number;
  supplierQuotedMetalPrice?: number;
  width?: number;
}

export interface JewelleryPendantInput {
  id?: string;
  category?: string;
  comments?: string;
  description?: string;
  engravingFont?: string;
  engravingText?: string;
  isChain: boolean;
  metalKarat: JewelleryMetalKaratEnum;
  metalType: JewelleryMetalTypeEnum;
  accentMetalKarat?: JewelleryMetalKaratEnum;
  accentMetalType?: JewelleryMetalTypeEnum;
  nivodaQuotedLaborPrice?: number;
  nivodaQuotedMetalPrice?: number;
  prongCount?: string;
  prongStyle?: string;
  rhodium?: string;
  setting: JewellerySettingEnum;
  supplierFinalLaborPrice?: number;
  supplierFinalMetalPrice?: number;
  supplierQuotedLaborPrice?: number;
  supplierQuotedMetalPrice?: number;
}

export interface JewelleryWeddingBandInput {
  id?: string;
  category?: string;
  comments?: string;
  description?: string;
  fingerSize?: string;
  finish?: string;
  insideEngravingFont?: string;
  insideEngravingText?: string;
  metalKarat: JewelleryMetalKaratEnum;
  metalType: JewelleryMetalTypeEnum;
  accentMetalKarat?: JewelleryMetalKaratEnum;
  accentMetalType?: JewelleryMetalTypeEnum;
  nivodaQuotedLaborPrice?: number;
  nivodaQuotedMetalPrice?: number;
  outsideEngravingFont?: string;
  outsideEngravingText?: string;
  profile?: string;
  prongCount?: string;
  prongStyle?: string;
  rhodium?: string;
  setting: JewellerySettingEnum;
  settingMethod?: string;
  sizeType: string;
  supplierFinalLaborPrice?: number;
  supplierFinalMetalPrice?: number;
  supplierQuotedLaborPrice?: number;
  supplierQuotedMetalPrice?: number;
}

export interface JewelleryMountInput {
  id?: string;
  certNumber?: string;
  comments?: string;
  depthTolerance?: number;
  description?: string;
  engravingFont?: string;
  engravingText?: string;
  metalColor?: string;
  metalDepth?: number;
  metalSize?: string;
  metalType: JewelleryMetalTypeEnum;
  metalKarat: JewelleryMetalKaratEnum;
  accentMetalKarat?: JewelleryMetalKaratEnum;
  accentMetalType?: JewelleryMetalTypeEnum;
  metalWeight?: number;
  metalWidth?: number;
  nivodaQuotedLaborPrice?: number;
  nivodaQuotedMetalPrice?: number;
  orderItemId?: string;
  supplierFinalLaborPrice?: number;
  supplierFinalMetalPrice?: number;
  supplierQuotedLaborPrice?: number;
  supplierQuotedMetalPrice?: number;
  widthTolerance?: number;
}

export interface JewelleryStoneInput {
  id?: string;
  carats?: number;
  certNumber?: string;
  clarity?: string;
  color?: string;
  comments?: string;
  cut?: string;
  depth?: number;
  description?: string;
  fromMmRange?: number;
  gemType?: string;
  isLabgrown?: boolean;
  length?: number;
  nivodaQuotedLaborPrice?: number;
  nivodaQuotedMetalPrice?: number;
  nivodaQuotedStonePrice?: number;
  nivodaQuotedStonePricePerCarat?: number;
  orderItemId?: string;
  pieces?: number;
  productType?: string;
  shape?: string;
  stonePosition?: JewelleryStonePosition;
  supplierFinalLaborPrice?: number;
  supplierFinalMetalPrice?: number;
  supplierFinalStonePrice?: number;
  supplierFinalStonePricePerCarat?: number;
  supplierQuotedLaborPrice?: number;
  supplierQuotedMetalPrice?: number;
  supplierQuotedStonePrice?: number;
  supplierQuotedStonePricePerCarat?: number;
  toMmRange?: number;
  width?: number;
}

export interface JewelleryFileInput {
  id?: string;
  fileName: string;
  fileProvidedBy: string;
  fileUploadedById?: string;
  fileUrl: string;
  type: string;
}

export interface JewelleryServiceInput {
  id?: string;
  comments?: string;
  description?: string;
  nivodaQuotedPrice?: number;
  supplierFinalPrice?: number;
  supplierQuotedPrice?: number;
  type: string;
}
