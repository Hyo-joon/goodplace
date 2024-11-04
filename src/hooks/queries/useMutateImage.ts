import {useMutation} from '@tanstack/react-query';

import {uploadImages} from '../../api';
import {UseMutationCustomOptions} from '../../types/common';

function useMutateImages(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: uploadImages,
    ...mutationOptions,
  });
}

export default useMutateImages;
