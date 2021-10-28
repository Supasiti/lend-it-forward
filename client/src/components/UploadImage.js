// import { useUploadPhoto } from '../hooks/useUploadPhoto';
import Dropzone from './Dropzone';

// render
const UploadImage = ({ id, model }) => {
  // const { uploadPhoto } = useUploadPhoto();

  console.log(id);
  console.log(model);

  // const onInput = ({ target }) => {
  //   const {
  //     validity,
  //     files: [photo],
  //   } = target;

  //   const photoData = {
  //     photo,
  //     model,
  //     _id: id,
  //   };
  //   console.log(photoData);
  //   console.log(validity);
  //   // if (validity.valid) uploadPhoto(photoData);
  // };

  const handleFilesAdded = (files) => {
    console.log(files);
  };

  return (
    <>
      <Dropzone accept="image/jpeg image/png" onFilesAdded={handleFilesAdded} />
    </>
  );
};

export default UploadImage;
