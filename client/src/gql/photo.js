import gql from 'graphql-tag';

export const UPLOAD_PHOTO = gql`
  mutation ($upload: UploadPhotoInput!) {
    uploadPhoto(upload: $upload) {
      success
      imageUrl
      _id
    }
  }
`;
