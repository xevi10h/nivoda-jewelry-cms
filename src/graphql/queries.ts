import { gql } from '@apollo/client';

// Fragment for common Jewellery fields
export const JEWELLERY_FRAGMENT = gql`
	fragment JewelleryFields on Jewellery {
		id
		sku
		nivodaStockId
		catalogSource
		description
		comments
		type
		status
		hasAccentStones
		hasMelee
		hasSideStones
		createdAt
		updatedAt
		numberOfStones {
			id
			value
		}
		mountStyle {
			id
			value
		}
		settingType {
			id
			value
		}
		bandStyle {
			id
			value
		}
	}
`;

// Fragment for Ring fields
export const RING_FRAGMENT = gql`
	fragment RingFields on JewelleryRing {
		id
		ringType
		category
		comments
		description
		ringWidth
		naturalVariantPrice
		labgrownVariantPrice
		video
		images
		fullySetImages
		stoneMapImage
		createdAt
		updatedAt
		primaryStyle {
			id
			name
		}
		styles {
			id
			name
			type
		}
		color {
			id
			value
		}
		metalType {
			id
			value
		}
		metalQuality {
			id
			value
		}
		stoneShape {
			id
			value
		}
	}
`;

// Fragment for Mount fields
export const MOUNT_FRAGMENT = gql`
	fragment MountFields on JewelleryMount {
		id
		metalWeight
		metalType
		metalKarat
		accentMetalType
		accentMetalKarat
		metalWidth
		metalDepth
		comments
		description
		createdAt
		updatedAt
	}
`;

// Fragment for Stone fields
export const STONE_FRAGMENT = gql`
	fragment StoneFields on JewelleryStone {
		id
		productType
		stonePosition
		pieces
		carats
		color
		clarity
		shape
		cut
		isLabgrown
		length
		width
		depth
		comments
		description
		createdAt
		updatedAt
	}
`;

// Get all jewellery with pagination
export const GET_ALL_JEWELLERY = gql`
	${JEWELLERY_FRAGMENT}
	${RING_FRAGMENT}
	${MOUNT_FRAGMENT}
	${STONE_FRAGMENT}
	query GetAllJewellery($ids: [ID!], $limit: Int, $offset: Int) {
		getAllJewellery(ids: $ids, limit: $limit, offset: $offset) {
			items {
				...JewelleryFields
				ring {
					...RingFields
				}
				mounts {
					...MountFields
				}
				stones {
					...StoneFields
				}
			}
			totalCount
		}
	}
`;

// Get filtered rings with filters
export const GET_FILTERED_RINGS = gql`
	${JEWELLERY_FRAGMENT}
	${RING_FRAGMENT}
	${MOUNT_FRAGMENT}
	${STONE_FRAGMENT}
	query GetFilteredRings(
		$filters: RingFilter
		$preselectedFilters: RingFilter
		$sort: SortOption
		$limit: Int
		$offset: Int
	) {
		getFilteredRings(
			filters: $filters
			preselectedFilters: $preselectedFilters
			sort: $sort
			limit: $limit
			offset: $offset
		) {
			items {
				...JewelleryFields
				ring {
					...RingFields
				}
				mounts {
					...MountFields
				}
				stones {
					...StoneFields
				}
			}
			totalCount
			filters {
				styles {
					id
					value
					count
				}
				primaryStyles {
					id
					value
					count
				}
				stoneShapes {
					id
					value
					count
				}
				metalTypes {
					id
					value
					count
				}
				colors {
					id
					value
					count
				}
				metalQualities {
					id
					value
					count
				}
				catalogSources {
					value
					count
				}
				settingTypes {
					id
					value
					count
				}
				bandStyles {
					id
					value
					count
				}
				numberOfStones {
					id
					value
					count
				}
			}
			exchange_rates {
				name
				to_USD
			}
		}
	}
`;

// Get one jewellery item
export const GET_ONE_JEWELLERY = gql`
	${JEWELLERY_FRAGMENT}
	${RING_FRAGMENT}
	${MOUNT_FRAGMENT}
	${STONE_FRAGMENT}
	query GetOneJewellery($id: ID, $sku: String) {
		oneJewellery(id: $id, sku: $sku) {
			...JewelleryFields
			ring {
				...RingFields
			}
			mounts {
				...MountFields
			}
			stones {
				...StoneFields
			}
			files {
				id
				fileName
				fileUrl
				type
				fileProvidedBy
				createdAt
				updatedAt
			}
		}
	}
`;

// Get all ring filter options
export const GET_ALL_RING_FILTER_OPTIONS = gql`
	query GetAllRingFilterOptions {
		getAllRingFilterOptions {
			styles {
				id
				value
				count
			}
			primaryStyles {
				id
				value
				count
			}
			stoneShapes {
				id
				value
				count
			}
			metalTypes {
				id
				value
				count
			}
			colors {
				id
				value
				count
			}
			metalQualities {
				id
				value
				count
			}
			catalogSources {
				value
				count
			}
			settingTypes {
				id
				value
				count
			}
			bandStyles {
				id
				value
				count
			}
			numberOfStones {
				id
				value
				count
			}
		}
	}
`;

// Get stock ID combinations
export const GET_STOCK_ID_COMBINATIONS = gql`
	query GetStockIdCombinations($nivodaStockId: ID!) {
		stockIdCombinations(nivodaStockId: $nivodaStockId) {
			stoneShape {
				id
				value
				metalType {
					id
					value
					color {
						id
						value
						metalQuality {
							id
							value
						}
					}
				}
			}
		}
	}
`;
