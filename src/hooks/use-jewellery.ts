import { useQuery, useMutation, type ApolloError } from '@apollo/client/react';
import {
  GET_ALL_JEWELLERY,
  GET_FILTERED_RINGS,
  GET_ONE_JEWELLERY,
  GET_ALL_RING_FILTER_OPTIONS,
} from '../graphql/queries';
import {
  CREATE_JEWELLERY,
  UPDATE_JEWELLERY,
  DELETE_JEWELLERY,
} from '../graphql/mutations';
import {
  Jewellery,
  PaginatedJewellery,
  FilteredRings,
  RingFilters,
} from '../graphql/types';
import { toast } from './use-toast';

// Hook to get all jewellery with pagination
export function useGetAllJewellery(
  ids?: string[],
  limit: number = 50,
  offset: number = 0
) {
  return useQuery<{ getAllJewellery: PaginatedJewellery }>(GET_ALL_JEWELLERY, {
    variables: { ids, limit, offset },
    fetchPolicy: 'cache-and-network',
  });
}

// Hook to get filtered rings
export function useGetFilteredRings(
  filters?: any,
  preselectedFilters?: any,
  sort?: any,
  limit: number = 50,
  offset: number = 0
) {
  return useQuery<{ getFilteredRings: FilteredRings }>(GET_FILTERED_RINGS, {
    variables: { filters, preselectedFilters, sort, limit, offset },
    fetchPolicy: 'cache-and-network',
  });
}

// Hook to get one jewellery item
export function useGetOneJewellery(id?: string, sku?: string) {
  return useQuery<{ oneJewellery: Jewellery }>(GET_ONE_JEWELLERY, {
    variables: { id, sku },
    skip: !id && !sku,
    fetchPolicy: 'cache-and-network',
  });
}

// Hook to get all ring filter options
export function useGetAllRingFilterOptions() {
  return useQuery<{ getAllRingFilterOptions: RingFilters }>(
    GET_ALL_RING_FILTER_OPTIONS,
    {
      fetchPolicy: 'cache-and-network',
    }
  );
}

// Hook to create jewellery
export function useCreateJewellery() {
  const [createJewellery, { loading, error }] = useMutation(CREATE_JEWELLERY, {
    refetchQueries: [GET_ALL_JEWELLERY, GET_FILTERED_RINGS],
    onCompleted: (data) => {
      toast({
        title: 'Success',
        description: 'Jewellery item created successfully',
      });
    },
    onError: (error: ApolloError) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create jewellery item',
        variant: 'destructive',
      });
    },
  });

  return {
    createJewellery: (data: any) => createJewellery({ variables: { data } }),
    loading,
    error,
  };
}

// Hook to update jewellery
export function useUpdateJewellery() {
  const [updateJewellery, { loading, error }] = useMutation(UPDATE_JEWELLERY, {
    refetchQueries: [GET_ALL_JEWELLERY, GET_FILTERED_RINGS],
    onCompleted: (data) => {
      toast({
        title: 'Success',
        description: 'Jewellery item updated successfully',
      });
    },
    onError: (error: ApolloError) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update jewellery item',
        variant: 'destructive',
      });
    },
  });

  return {
    updateJewellery: (data: any) => updateJewellery({ variables: { data } }),
    loading,
    error,
  };
}

// Hook to delete jewellery
export function useDeleteJewellery() {
  const [deleteJewellery, { loading, error }] = useMutation(DELETE_JEWELLERY, {
    refetchQueries: [GET_ALL_JEWELLERY, GET_FILTERED_RINGS],
    onCompleted: () => {
      toast({
        title: 'Success',
        description: 'Jewellery item deleted successfully',
      });
    },
    onError: (error: ApolloError) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete jewellery item',
        variant: 'destructive',
      });
    },
  });

  return {
    deleteJewellery: (id: string) => deleteJewellery({ variables: { id } }),
    loading,
    error,
  };
}
