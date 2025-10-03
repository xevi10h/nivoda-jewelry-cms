import { gql } from '@apollo/client';
import { JEWELLERY_FRAGMENT, RING_FRAGMENT, MOUNT_FRAGMENT, STONE_FRAGMENT } from './queries';

// Create Jewellery
export const CREATE_JEWELLERY = gql`
  ${JEWELLERY_FRAGMENT}
  ${RING_FRAGMENT}
  ${MOUNT_FRAGMENT}
  ${STONE_FRAGMENT}
  mutation CreateJewellery($data: CreateJewelleryInput!) {
    createJewellery(data: $data) {
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
  }
`;

// Update Jewellery
export const UPDATE_JEWELLERY = gql`
  ${JEWELLERY_FRAGMENT}
  ${RING_FRAGMENT}
  ${MOUNT_FRAGMENT}
  ${STONE_FRAGMENT}
  mutation UpdateJewellery($data: UpdateJewelleryInput!) {
    updateJewellery(data: $data) {
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
  }
`;

// Delete Jewellery
export const DELETE_JEWELLERY = gql`
  mutation DeleteJewellery($id: ID!) {
    deleteJewellery(id: $id)
  }
`;
