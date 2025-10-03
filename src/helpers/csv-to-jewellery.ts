import {
  JewelleryTypeEnum,
  JewelleryMetalTypeEnum,
  JewelleryMetalKaratEnum,
  JewellerySettingEnum,
  CatalogSourceEnum,
  JewelleryStonePosition,
  JewelleryRingType,
} from '@/graphql/enums';
import { CreateJewelleryInput } from '@/graphql/inputs';

// Map CSV columns to GraphQL input format
export function csvRowToJewelleryInput(row: any): CreateJewelleryInput | null {
  try {
    // Parse metal information from "Option 1 Value" (e.g., "14KT White Gold")
    const parameters = row['Option 1 Value'] || '';
    const parametersArray = parameters.split(' ');
    const metalQuality = parametersArray[0] || '';
    const color = parametersArray.length > 2 ? parametersArray[1] : 'White';

    // Map to enum values
    const metalKarat = mapMetalQuality(metalQuality);
    const metalType = mapColor(color);
    const shape = row['Option 2 Value'] || '';

    // Parse stone information
    const numberOfSideStones = parseInt(row['Number of Side Stones']) || 0;
    const sideStonesCarats = parseFloat(row['Total Cttw of Side Stones']) || 0;
    const hasAccentStones = row['Accent Stones'] === 'Yes';

    // Parse stone color and clarity
    const naturalStoneDetails = parseStoneDetails(row['Natural Stone Colour/ Clarity']);
    const labgrownStoneDetails = parseStoneDetails(row['Labgrown Stone Colour/ Clarity']);

    // Parse prices (convert from dollars to cents)
    const naturalVariantPrice = parseFloat(row['Natural Variant Price']) * 100 || 0;
    const labgrownVariantPrice = parseFloat(row['Labgrown Variant Price']) * 100 || 0;

    const input: CreateJewelleryInput = {
      jewellery: {
        nivodaStockId: row['Nivoda Stock ID'] || '',
        sku: row['Nivoda Unique SKU'] || '',
        catalogSource: CatalogSourceEnum.NIVODA,
        description: row['Product Name'] || '',
        comments: row['Product Description'] || '',
        type: JewelleryTypeEnum.RING,
        status: 'In Stock',
        hasAccentStones,
      },
      engagement_ring: {
        ringType: row['Ring Type'] === 'Engagement Rings'
          ? JewelleryRingType.ENGAGEMENT_RINGS
          : JewelleryRingType.ENGAGEMENT_RINGS,
        setting: JewellerySettingEnum.FINISHED,
        sizeType: 'US_CA',
        metalKarat,
        metalType,
        style: row['Shopify Ring Style'] || '',
        color,
        metalQuality,
        stoneShape: shape,
      },
      mounts: [{
        metalWeight: parseFloat(row['Metal Weight']) || 0,
        metalType,
        metalKarat,
      }],
      stones: [],
      catalogSource: CatalogSourceEnum.NIVODA,
    };

    // Add natural stone if present
    if (naturalStoneDetails && numberOfSideStones > 0 && sideStonesCarats > 0) {
      input.stones = input.stones || [];
      input.stones.push({
        productType: 'MELEE',
        stonePosition: JewelleryStonePosition.SIDE,
        pieces: numberOfSideStones,
        carats: sideStonesCarats,
        color: naturalStoneDetails.color,
        clarity: naturalStoneDetails.clarity,
        isLabgrown: false,
        shape,
      });
    }

    // Add labgrown stone if present
    if (labgrownStoneDetails && numberOfSideStones > 0 && sideStonesCarats > 0) {
      input.stones = input.stones || [];
      input.stones.push({
        productType: 'MELEE',
        stonePosition: JewelleryStonePosition.SIDE,
        pieces: numberOfSideStones,
        carats: sideStonesCarats,
        color: labgrownStoneDetails.color,
        clarity: labgrownStoneDetails.clarity,
        isLabgrown: true,
        shape,
      });
    }

    return input;
  } catch (error) {
    console.error('Error parsing CSV row:', error);
    return null;
  }
}

function mapMetalQuality(quality: string): JewelleryMetalKaratEnum {
  const map: Record<string, JewelleryMetalKaratEnum> = {
    '9KT': JewelleryMetalKaratEnum.KT_9KT,
    '10KT': JewelleryMetalKaratEnum.KT_10KT,
    '12KT': JewelleryMetalKaratEnum.KT_12KT,
    '14KT': JewelleryMetalKaratEnum.KT_14KT,
    '18KT': JewelleryMetalKaratEnum.KT_18KT,
    '22KT': JewelleryMetalKaratEnum.KT_22KT,
    '950': JewelleryMetalKaratEnum.KT_950P,
    '925': JewelleryMetalKaratEnum.KT_925S,
  };
  return map[quality] || JewelleryMetalKaratEnum.KT_14KT;
}

function mapColor(color: string): JewelleryMetalTypeEnum {
  const map: Record<string, JewelleryMetalTypeEnum> = {
    'Yellow': JewelleryMetalTypeEnum.YELLOW_GOLD,
    'White': JewelleryMetalTypeEnum.WHITE_GOLD,
    'Rose': JewelleryMetalTypeEnum.ROSE_GOLD,
    'Platinum': JewelleryMetalTypeEnum.PLATINUM,
  };
  return map[color] || JewelleryMetalTypeEnum.WHITE_GOLD;
}

interface StoneDetails {
  color: string;
  clarity: string;
}

function parseStoneDetails(colourClarityString: string): StoneDetails | null {
  if (!colourClarityString || colourClarityString.trim() === '') {
    return null;
  }
  const [color, clarity] = colourClarityString
    .trim()
    .split('/')
    .map((s) => s.trim());
  return { color, clarity };
}

// Process multiple rows
export function processCsvRows(rows: any[]): CreateJewelleryInput[] {
  return rows
    .map(row => csvRowToJewelleryInput(row))
    .filter((input): input is CreateJewelleryInput => input !== null);
}
