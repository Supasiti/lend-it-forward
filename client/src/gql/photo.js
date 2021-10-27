import gql from 'graphql-tag';

export const UPLOAD_PHOTO = gql`
  mutation ($photo: Upload!) {
    uploadPhoto(photo: $photo) {
      message
    }
  }
`;
