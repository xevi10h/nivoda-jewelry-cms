import {
  JewelleryTypeEnum,
  JewelleryMetalTypeEnum,
  JewelleryMetalKaratEnum,
  JewellerySettingEnum,
  JewelleryRingType,
  CatalogSourceEnum,
  RingStyleTypeEnum,
} from './enums';

// Core Jewellery Types
export interface Jewellery {
  id: string;
  isMigratedFromIntegrations: boolean;
  isFinished: boolean;
  adminId?: string;
  agta?: string;
  availableQty?: number;
  comments?: string;
  createdAt: string;
  customerBudget?: number;
  customerCompanyId?: string;
  customerId?: string;
  customerPayload?: string;
  description?: string;
  catalogSource?: CatalogSourceEnum;
  gender?: 'FEMALE' | 'MALE';
  hazardous: boolean;
  heavy: boolean;
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
  nivodaQuotedMetalPrice?: number;
  supplierFinalMetalPrice?: number;
  supplierQuotedMetalPrice?: number;
  supplierFinalPrice?: number;
  supplierQuotedPrice?: number;
  supplierStockId?: string;
  thPrId?: string;
  type: JewelleryTypeEnum;
  updatedAt: string;
  hasAccentStones?: boolean;
  hasMelee?: boolean;
  hasSideStones?: boolean;
  ring?: JewelleryRing;
  bracelet?: JewelleryBracelet;
  earring?: JewelleryEarring;
  necklace?: JewelleryNecklace;
  pendant?: JewelleryPendant;
  wedding_band?: JewelleryWeddingBand;
  mounts?: JewelleryMount[];
  stones?: JewelleryStone[];
  files?: JewelleryFile[];
  services?: JewelleryService[];
  numberOfStones?: JewelleryCategory;
  mountStyle?: JewelleryCategory;
  settingType?: JewelleryCategory;
  bandStyle?: JewelleryCategory;
}

export interface JewelleryCategory {
  id: string;
  value: string;
}

export interface JewelleryRing {
  id: string;
  category?: string;
  ringType?: JewelleryRingType;
  comments?: string;
  description?: string;
  fingerSize?: string;
  finish?: string;
  insideEngravingFont?: string;
  insideEngravingText?: string;
  metalKarat?: JewelleryMetalKaratEnum;
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
  naturalVariantPrice?: number;
  labgrownVariantPrice?: number;
  naturalVariantPriceComplete?: JewelleryCompletePrice;
  labgrownVariantPriceComplete?: JewelleryCompletePrice;
  updatedAt: string;
  createdAt: string;
  styles?: StyleOption[];
  primaryStyle?: PrimaryStyleOption;
  color?: ColorOption;
  metalType?: MetalTypeOption;
  metalQuality?: MetalQualityOption;
  stoneShape?: StoneShapeOption;
  images?: any;
  fullySetImages?: any;
  stoneMapImage?: string;
  video?: string;
  ringWidth?: number;
  ringSizeOptions?: RingSizeOption[];
  setWith?: SetStoneSetting[];
  canBeSetWith?: StoneSetting[];
  settingOptions?: RingStoneOption[];
}

export interface JewelleryCompletePrice {
  basePrice: number;
  markup: number;
  return: number;
  mpf: number;
  tariff: number;
  vat: number;
  credit: number;
  totalPrice: number;
}

export interface StyleOption {
  id: string;
  name: string;
  type: RingStyleTypeEnum;
}

export interface PrimaryStyleOption {
  id: string;
  name: string;
}

export interface ColorOption {
  id: string;
  value: string;
}

export interface StoneShapeOption {
  id: string;
  value: string;
}

export interface MetalTypeOption {
  id: string;
  value: string;
}

export interface MetalQualityOption {
  id: string;
  value: string;
}

export interface RingSizeOption {
  id: string;
  size?: number;
  price?: number;
}

export interface SetStoneSetting {
  id: string;
  sku?: string;
  quantity?: number;
  description?: string;
}

export interface StoneSetting {
  id: string;
  quantity?: number;
  shape?: string;
  size?: string;
  settingType?: string;
}

export interface RingStoneOption {
  id: string;
  locationNumber?: number;
  stoneCount?: number;
  settingType?: string;
  description?: string;
  sizeMm?: number;
  dimension1?: number;
  dimension2?: number;
  dimension3?: number;
  groupName?: string;
  shape?: string;
  shapeCode?: number;
}

export interface JewelleryBracelet {
  id: string;
  chainFunction?: string;
  claspType?: string;
  comments?: string;
  description?: string;
  isHollow: boolean;
  length?: number;
  metalKarat: JewelleryMetalKaratEnum;
  metalType: JewelleryMetalTypeEnum;
  accentMetalKarat?: JewelleryMetalKaratEnum;
  accentMetalType?: JewelleryMetalTypeEnum;
  setting: JewellerySettingEnum;
  width?: number;
  createdAt: string;
  updatedAt: string;
}

export interface JewelleryEarring {
  id: string;
  comments?: string;
  description?: string;
  isASingleEarring: boolean;
  metalKarat: JewelleryMetalKaratEnum;
  metalType: JewelleryMetalTypeEnum;
  accentMetalKarat?: JewelleryMetalKaratEnum;
  accentMetalType?: JewelleryMetalTypeEnum;
  post: string;
  prongStyle?: string;
  setting: JewellerySettingEnum;
  subcategory?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JewelleryNecklace {
  id: string;
  chainFunction?: string;
  claspType?: string;
  comments?: string;
  description?: string;
  isHollow: boolean;
  length?: number;
  metalKarat: JewelleryMetalKaratEnum;
  metalType: JewelleryMetalTypeEnum;
  accentMetalKarat?: JewelleryMetalKaratEnum;
  accentMetalType?: JewelleryMetalTypeEnum;
  setting: JewellerySettingEnum;
  width?: number;
  createdAt: string;
  updatedAt: string;
}

export interface JewelleryPendant {
  id: string;
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
  prongCount?: string;
  prongStyle?: string;
  rhodium?: string;
  setting: JewellerySettingEnum;
  createdAt: string;
  updatedAt: string;
}

export interface JewelleryWeddingBand {
  id: string;
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
  outsideEngravingFont?: string;
  outsideEngravingText?: string;
  profile?: string;
  prongCount?: string;
  prongStyle?: string;
  rhodium?: string;
  setting: JewellerySettingEnum;
  settingMethod?: string;
  sizeType: string;
  createdAt: string;
  updatedAt: string;
}

export interface JewelleryMount {
  id: string;
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
  metalWeight: number;
  metalWidth?: number;
  orderItemId?: string;
  widthTolerance?: number;
  createdAt: string;
  updatedAt: string;
}

export interface JewelleryStone {
  id: string;
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
  orderItemId?: string;
  pieces?: number;
  productType?: string;
  shape?: string;
  stonePosition?: string;
  toMmRange?: number;
  width?: number;
  createdAt: string;
  updatedAt: string;
}

export interface JewelleryFile {
  id: string;
  fileName?: string;
  fileProvidedBy: string;
  fileUploadedById?: string;
  fileUrl: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface JewelleryService {
  id: number;
  comments?: string;
  description?: string;
  nivodaQuotedPrice?: number;
  supplierFinalPrice?: number;
  supplierQuotedPrice?: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

// Paginated Response
export interface PaginatedJewellery {
  items: Jewellery[];
  totalCount: number;
}

// Filtered Rings Response
export interface FilteredRings {
  filters: RingFilters;
  items: Jewellery[];
  totalCount: number;
  exchange_rates: ExchangeRate[];
}

export interface ExchangeRate {
  name: string;
  to_USD: number;
}

export interface RingFilters {
  styles: RingFilterOption[];
  primaryStyles: RingFilterOption[];
  styleTags: RingFilterOption[];
  stoneShapes: RingFilterOption[];
  metalTypes: RingFilterOption[];
  colors: RingFilterOption[];
  metalQualities: RingFilterOption[];
  catalogSources: RingFilterOptionWithoutId[];
  nivodaStockIds: RingFilterOptionWithoutId[];
  numberOfStones: RingFilterOption[];
  mountStyles: RingFilterOption[];
  profiles: RingFilterOption[];
  componentCounts: RingFilterOption[];
  headStructures: RingFilterOption[];
  shankShapes: RingFilterOption[];
  closures: RingFilterOption[];
  bailTypes: RingFilterOption[];
  settingTypes: RingFilterOption[];
  shankProfiles: RingFilterOption[];
  numberOfSettings: RingFilterOption[];
  finish: RingFilterOption[];
  textures: RingFilterOption[];
  bandWidths: RingFilterOption[];
  bandStyles: RingFilterOption[];
  thickness: RingFilterOption[];
  linkTypes: RingFilterOption[];
  adjustability: RingFilterOption[];
  orientation: RingFilterOption[];
  symmetry: RingFilterOption[];
  customizableSurface: RingFilterOption[];
  hasAccentStones: RingFilterOptionWithoutId[];
  hasSideStones: RingFilterOptionWithoutId[];
  hasMelee: RingFilterOptionWithoutId[];
}

export interface RingFilterOption {
  id: string;
  value: string;
  count: number;
}

export interface RingFilterOptionWithoutId {
  value: string;
  count: number;
}
