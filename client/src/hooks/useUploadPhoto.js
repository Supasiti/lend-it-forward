import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { UPLOAD_PHOTO } from '../gql/photo';

export const useUploadPhoto = () => {
  const [error, setError] = useState('');
  const [res, setRes] = useState(null);
  const [execMutation, { data, loading }] = useMutation(UPLOAD_PHOTO);

  // on successful upload
  // return { success, imageUrl, _id }
  useEffect(() => {
    if (data?.uploadPhoto) {
      setRes(data.uploadPhoto);
    }
  }, [data]);

  // for easy execution
  // expect : {photo, _id, model}
  const uploadPhoto = async (input) => {
    const variables = { upload: { ...input } };
    try {
      await execMutation({ variables });
    } catch (e) {
      setError(e.message);
    }
  };

  return { uploadPhoto, res, error, setError, loading };
};
